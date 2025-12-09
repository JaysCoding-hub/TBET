// Lightweight storage-sync helper.
// If `window.FIREBASE_CONFIG` is set to a Firebase config object this will
// initialize Firebase (compat SDK) and provide `initRemoteSync`, `syncSetItem`,
// and `syncGetItem` globally.

window.remoteEnabled = false;
window._remoteInitialized = false;

async function initRemoteSync() {
    if (window._remoteInitialized) return;
    window._remoteInitialized = true;

    try {
        const cfg = window.FIREBASE_CONFIG || null;
        if (!cfg) {
            console.log('Remote sync disabled (no FIREBASE_CONFIG)');
            window.remoteEnabled = false;
            return;
        }

        if (!window.firebase) {
            console.log('Firebase SDK not loaded; remote sync unavailable.');
            window.remoteEnabled = false;
            return;
        }

        // Initialize firebase app
        try {
            window.firebaseApp = firebase.initializeApp(cfg);
            window.firebaseDb = firebase.database();
            window.remoteEnabled = true;
            console.log('Remote sync enabled');
        } catch (e) {
            console.error('Failed to init Firebase:', e);
            window.remoteEnabled = false;
            return;
        }

        // Pull central state into localStorage for these keys if present
        const keys = ['validUsers', 'userPoints', 'allBets', 'betsOpen', 'lastEndTime'];
        for (const key of keys) {
            try {
                const snap = await firebase.database().ref('/app/' + key).once('value');
                const val = snap.val();
                if (val !== null && val !== undefined) {
                    // store as-is (strings expected for our usage)
                    localStorage.setItem(key, val);
                }
            } catch (e) {
                console.warn('Failed to sync key', key, e);
            }
        }

    } catch (err) {
        console.error('initRemoteSync error', err);
        window.remoteEnabled = false;
    }
}

async function remoteWrite(key, value) {
    if (!window.remoteEnabled || !window.firebaseDb) return;
    try {
        await window.firebaseDb.ref('/app/' + key).set(value);
    } catch (e) {
        console.error('remoteWrite error', e);
    }
}

async function remoteRead(key) {
    if (!window.remoteEnabled || !window.firebaseDb) return null;
    try {
        const snap = await window.firebaseDb.ref('/app/' + key).once('value');
        return snap.val();
    } catch (e) {
        console.error('remoteRead error', e);
        return null;
    }
}

// Public helpers used by the app
window.syncSetItem = function(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('localStorage.setItem failed', e);
    }
    if (window.remoteEnabled) {
        remoteWrite(key, value).catch(() => {});
    }
};

window.syncGetItem = function(key) {
    return localStorage.getItem(key);
};

// Auto-run: attempt init (will no-op if FIREBASE_CONFIG is null)
// Pages should still call initRemoteSync() early to ensure pull completes before UI load.
setTimeout(() => {
    if (window.FIREBASE_CONFIG) initRemoteSync();
}, 50);
