// Lightweight storage-sync helper.
// If `window.FIREBASE_CONFIG` is set to a Firebase config object this will
// initialize Firebase (compat SDK) and provide `initRemoteSync`, `syncSetItem`,
// and `syncGetItem` globally.

window.remoteEnabled = false;
window._remoteInitialized = false;
window._storageListeners = window._storageListeners || {};
window._lastLocalStorageState = {};
window._firebaseListenerActive = {};

async function initRemoteSync() {
    if (window._remoteInitialized) return;
    window._remoteInitialized = true;

    try {
        const cfg = window.FIREBASE_CONFIG || null;
        if (!cfg) {
            console.log('Remote sync disabled (no FIREBASE_CONFIG)');
            window.remoteEnabled = false;
            setupPolling();
            return;
        }

        if (!window.firebase) {
            console.log('Firebase SDK not loaded; remote sync unavailable.');
            window.remoteEnabled = false;
            setupPolling();
            return;
        }

        // Initialize firebase app
        try {
            // Check if app already initialized
            window.firebaseApp = window.firebaseApp || firebase.initializeApp(cfg);
            window.firebaseDb = window.firebaseDb || firebase.database();
            window.remoteEnabled = true;
            console.log('✓ Remote sync enabled via Firebase Realtime Database');
        } catch (e) {
            console.error('Failed to init Firebase:', e);
            window.remoteEnabled = false;
            setupPolling();
            return;
        }

        // Pull central state into localStorage for these keys if present
        const keys = ['validUsers', 'userPoints', 'userProfile', 'userStats', 'allBets', 'betsOpen', 'lastEndTime'];
        for (const key of keys) {
            try {
                const snap = await firebase.database().ref('/app/' + key).once('value');
                const val = snap.val();
                if (val !== null && val !== undefined) {
                    localStorage.setItem(key, val);
                    console.log('Initial sync:', key, '=', val);
                }
            } catch (e) {
                console.warn('Failed to sync key', key, e);
            }
        }

        // Set up Firebase listeners for real-time updates
        setupFirebaseListeners(keys);
        setupPolling();

    } catch (err) {
        console.error('initRemoteSync error', err);
        window.remoteEnabled = false;
        setupPolling();
    }
}

// Set up Firebase real-time listeners for each key
function setupFirebaseListeners(keys) {
    if (!window.remoteEnabled || !window.firebaseDb) {
        console.warn('setupFirebaseListeners: Firebase not ready');
        return;
    }

    keys.forEach(key => {
        if (window._firebaseListenerActive[key]) return; // Already listening
        
        try {
            window.firebaseDb.ref('/app/' + key).on('value', (snap) => {
                const val = snap.val();
                if (val !== null && val !== undefined) {
                    const oldVal = localStorage.getItem(key);
                    localStorage.setItem(key, val);
                    
                    // Notify all registered listeners if value changed
                    if (oldVal !== val) {
                        console.log(`[SYNC] ${key} changed: ${oldVal} → ${val}`);
                        notifyStorageListeners(key, val, oldVal);
                    }
                }
            }, (err) => {
                console.error('Firebase listener error for', key, err);
            });
            
            window._firebaseListenerActive[key] = true;
        } catch (e) {
            console.warn('Failed to set up listener for key', key, e);
        }
    });
}

// Polling fallback for when Firebase is not available or for cross-tab sync
function setupPolling() {
    // Poll every 500ms for localStorage changes (cross-tab sync)
    setInterval(() => {
        const keys = ['validUsers', 'userPoints', 'userProfile', 'userStats', 'allBets', 'betsOpen', 'lastEndTime'];
        keys.forEach(key => {
            const currentVal = localStorage.getItem(key);
            const lastVal = window._lastLocalStorageState[key];
            
            if (currentVal !== lastVal) {
                window._lastLocalStorageState[key] = currentVal;
                console.log(`[POLL] ${key} changed via localStorage`);
                notifyStorageListeners(key, currentVal, lastVal);
            }
        });
    }, 500); // Check every 500ms for changes
}

// Register a listener for storage changes
window.onStorageChange = function(key, callback) {
    if (!window._storageListeners[key]) {
        window._storageListeners[key] = [];
    }
    window._storageListeners[key].push(callback);
    console.log(`Registered listener for '${key}'`);
};

// Notify all listeners of a storage change
function notifyStorageListeners(key, newVal, oldVal) {
    if (window._storageListeners[key] && window._storageListeners[key].length > 0) {
        console.log(`Notifying ${window._storageListeners[key].length} listeners for '${key}'`);
        window._storageListeners[key].forEach(callback => {
            try {
                callback(newVal, oldVal);
            } catch (e) {
                console.error('Storage listener error:', e);
            }
        });
    }
}

async function remoteWrite(key, value) {
    if (!window.remoteEnabled || !window.firebaseDb) {
        console.warn('❌ remoteWrite: Firebase not ready for', key);
        return false;
    }
    try {
        console.log(`📝 [WRITE] Firebase: ${key} = ${value}`);
        await window.firebaseDb.ref('/app/' + key).set(value);
        console.log(`✅ Successfully wrote to Firebase: ${key}`);
        return true;
    } catch (e) {
        console.error('❌ remoteWrite error for', key, ':', e);
        return false;
    }
}

async function remoteRead(key) {
    if (!window.remoteEnabled || !window.firebaseDb) {
        console.warn('remoteRead: Firebase not ready for', key);
        return null;
    }
    try {
        const snap = await window.firebaseDb.ref('/app/' + key).once('value');
        return snap.val();
    } catch (e) {
        console.error('remoteRead error', key, e);
        return null;
    }
}

// Public helpers used by the app
window.syncSetItem = function(key, value) {
    try {
        localStorage.setItem(key, value);
        console.log(`📦 [LOCAL] Set ${key} = ${value}`);
    } catch (e) {
        console.warn('localStorage.setItem failed', e);
    }
    if (window.remoteEnabled && window.firebaseDb) {
        console.log(`🔄 [SYNC→FIREBASE] Syncing ${key}...`);
        remoteWrite(key, value)
            .then((success) => {
                if (success) console.log(`✅ Firebase sync complete for ${key}`);
                else console.warn(`⚠️ Firebase sync failed for ${key}`);
            })
            .catch((err) => {
                console.error('Failed to sync', key, 'to Firebase:', err);
            });
    } else {
        console.log(`⚠️ Firebase not ready, skipping remote write for ${key}`);
    }
};

window.syncGetItem = function(key) {
    const val = localStorage.getItem(key);
    return val;
};

// Auto-run: attempt init (will no-op if FIREBASE_CONFIG is null)
// Pages should still call initRemoteSync() early to ensure pull completes before UI load.
setTimeout(() => {
    if (window.FIREBASE_CONFIG) {
        initRemoteSync().then(() => {
            console.log('✓ initRemoteSync completed');
            // Dispatch event so pages know sync is ready
            window.dispatchEvent(new Event('REMOTE_SYNC_READY'));
        }).catch((err) => {
            console.error('initRemoteSync failed:', err);
        });
    }
}, 50);
