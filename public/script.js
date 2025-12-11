// Neumorphism Login Form JavaScript
class NeumorphismLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.login-btn');
        this.successMessage = document.getElementById('successMessage');
        this.socialButtons = document.querySelectorAll('.neu-social');
        
        // Vordefinierte Benutzerdaten - 10 Personen + 1 Admin
        this.validUsers = [
            { email: 'jay@email.com', password: 'Gv8$kLp2Qz1!', role: 'admin' },
            { email: 'louis@email.com', password: 'Pm4&Nh7uTy9@' },
            { email: 'louis.gek@email.com', password: 'Xc9#qRt6Lp3$' },
            { email: 'nick@email.com', password: 'Hz2!kLm8Qw4%' },
            { email: 'lenni@email.com', password: 'Bn7*Vp5Sk2&=', role: 'admin' },
            { email: 'abbas@email.com', password: 'Qr6@Yt1Nv8#-' },
            { email: 'muhammad@email.com', password: 'Sz3$Kp9Wm4!?' },
            { email: 'ivan@email.com', password: 'Ud5^Lo7Xb2%$' },
            { email: 'firat@email.com', password: 'Tm8&Qw2Er6#@' },
            { email: 'dorian@email.com', password: 'Yp1!Mv4Zn9$%' },
            { email: 'tymur@email.com', password: 'Fk2#Xs7Lp5&*' }
        ];
        // Additional developer/test accounts (passwords will default to local-part + '123' if empty)
        this.validUsers.push(
            { email: 'devin@email.com', password: 'Pm4&Nh7uTy9@'},
            { email: 'ryan@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'rayan@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'alina@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'lars@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'simon@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'abdul@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'batal@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'unc@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'efe@email.com' , password: 'Pm4&Nh7uTy9@'},
            { email: 'luca@email.com' , password: 'Pm4&Nh7uTy9@'}
        );
        // Use simple, fixed visible passwords so admins/users can see them easily.
        // If a password field was left empty above, default to the email local-part + '123'.
        this.validUsers.forEach(u => {
            if (!u.password) {
                const local = (u.email || '').split('@')[0] || 'user';
                u.password = local + '123';
            }
        });

        // Persist explicitly so other pages/devices see the fixed passwords
        try {
            if (window && typeof window.syncSetItem === 'function') {
                window.syncSetItem('validUsers', JSON.stringify(this.validUsers));
            }
            localStorage.setItem('validUsers', JSON.stringify(this.validUsers));
        } catch (e) {
            console.warn('Could not persist validUsers:', e);
        }
        // Initialize user profile data and per-user stats if not present (use userProfile for sync)
        try {
            const existingProfile = (window.syncGetItem && window.syncGetItem('userProfile')) || localStorage.getItem('userProfile');
            const existingStats = (window.syncGetItem && window.syncGetItem('userStats')) || localStorage.getItem('userStats');
            let profile = {};
            let stats = {};
            if (existingProfile) {
                try { profile = JSON.parse(existingProfile) || {}; } catch(e) { profile = {}; }
            }
            if (existingStats) {
                try { stats = JSON.parse(existingStats) || {}; } catch(e) { stats = {}; }
            }

            const now = Date.now();
            this.validUsers.forEach(u => {
                const email = u.email;
                if (!profile[email]) profile[email] = { pic: null }; // placeholder for dataURL
                if (!stats[email]) {
                    stats[email] = {
                        wins: 0,
                        pointsHistory: [],
                        highscore: 0
                    };
                }
            });

            if (window && typeof window.syncSetItem === 'function') {
                window.syncSetItem('userProfile', JSON.stringify(profile));
                window.syncSetItem('userStats', JSON.stringify(stats));
            } else {
                localStorage.setItem('userProfile', JSON.stringify(profile));
                localStorage.setItem('userStats', JSON.stringify(stats));
            }
        } catch (e) {
            console.warn('Could not initialize userProfile/userStats:', e);
        }
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupSocialButtons();
        this.setupNeumorphicEffects();
        this.loadRememberedCredentials();
    }
    
    loadRememberedCredentials() {
        const rememberCheckbox = document.getElementById('remember');
        const savedEmail = localStorage.getItem('rememberEmail');
        const savedPassword = localStorage.getItem('rememberPassword');
        const wasRemembered = localStorage.getItem('wasRemembered') === 'true';
        
        if (wasRemembered && savedEmail && savedPassword) {
            this.emailInput.value = savedEmail;
            this.passwordInput.value = savedPassword;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
        
        // Add soft press effects to inputs
        [this.emailInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', (e) => this.addSoftPress(e));
            input.addEventListener('blur', (e) => this.removeSoftPress(e));
        });
    }
    
    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            
            this.passwordToggle.classList.toggle('show-password', type === 'text');
            
            // Add soft click animation
            this.animateSoftPress(this.passwordToggle);
        });
    }
    
    setupSocialButtons() {
        this.socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.animateSoftPress(button);
                
                // Determine which social platform based on SVG content
                const svgPath = button.querySelector('svg path').getAttribute('d');
                let provider = 'Social';
                if (svgPath.includes('22.56')) provider = 'Google';
                else if (svgPath.includes('github')) provider = 'GitHub';
                else if (svgPath.includes('23.953')) provider = 'Twitter';
                
                this.handleSocialLogin(provider, button);
            });
        });
    }
    
    setupNeumorphicEffects() {
        // Add hover effects to all neumorphic elements
        const neuElements = document.querySelectorAll('.neu-icon, .neu-checkbox, .neu-social');
        neuElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
        
        // Add ambient light effect on mouse move
        document.addEventListener('mousemove', (e) => {
            this.updateAmbientLight(e);
        });
    }
    
    updateAmbientLight(e) {
        const card = document.querySelector('.login-card');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (x - centerX) / centerX;
        const angleY = (y - centerY) / centerY;
        
        const shadowX = angleX * 30;
        const shadowY = angleY * 30;
        
        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 60px #bec3cf,
            ${-shadowX}px ${-shadowY}px 60px #ffffff
        `;
    }
    
    addSoftPress(e) {
        const inputGroup = e.target.closest('.neu-input');
        inputGroup.style.transform = 'scale(0.98)';
    }
    
    removeSoftPress(e) {
        const inputGroup = e.target.closest('.neu-input');
        inputGroup.style.transform = 'scale(1)';
    }
    
    animateSoftPress(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('email', 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email');
            return false;
        }
        
        this.clearError('email');
        return true;
    }
    
    validateCredentials() {
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        
        // Überprüfe ob Benutzer in der Liste existiert
        // Prefer users stored in localStorage (admin may have edited them), fall back to default
        let storedUsers;
        try {
            storedUsers = JSON.parse((window.syncGetItem && window.syncGetItem('validUsers')) || localStorage.getItem('validUsers')) || this.validUsers;
        } catch (e) {
            storedUsers = this.validUsers;
        }
        const user = storedUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            this.showError('password', 'Invalid email or password');
            return false;
        }
        
        this.clearError('password');
        return true;
    }
    
    showError(field, message) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add gentle shake animation
        const input = document.getElementById(field);
        input.style.animation = 'gentleShake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
    
    clearError(field) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 300);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const isEmailValid = this.validateEmail();
        if (!isEmailValid) {
            this.animateSoftPress(this.submitButton);
            return;
        }
        
        const areCredentialsValid = this.validateCredentials();
        if (!areCredentialsValid) {
            this.animateSoftPress(this.submitButton);
            return;
        }
        
        // Handle Remember Me checkbox
        const rememberCheckbox = document.getElementById('remember');
        if (rememberCheckbox && rememberCheckbox.checked) {
            localStorage.setItem('rememberEmail', this.emailInput.value.trim());
            localStorage.setItem('rememberPassword', this.passwordInput.value);
            localStorage.setItem('wasRemembered', 'true');
        } else {
            // Clear stored credentials if unchecked
            localStorage.removeItem('rememberEmail');
            localStorage.removeItem('rememberPassword');
            localStorage.setItem('wasRemembered', 'false');
        }
        
        this.setLoading(true);
        
        try {
            // Simulate soft authentication
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show neumorphic success
            this.showNeumorphicSuccess();
        } catch (error) {
            this.showError('password', 'Login failed. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async handleSocialLogin(provider, button) {
        console.log(`Initiating ${provider} login...`);
        
        // Add loading state to button
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log(`Redirecting to ${provider} authentication...`);
            // window.location.href = `/auth/${provider.toLowerCase()}`;
        } catch (error) {
            console.error(`${provider} authentication failed: ${error.message}`);
        } finally {
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
        }
    }
    
    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
        
        // Disable social buttons during login
        this.socialButtons.forEach(button => {
            button.style.pointerEvents = loading ? 'none' : 'auto';
            button.style.opacity = loading ? '0.6' : '1';
        });
    }
    
    showNeumorphicSuccess() {
        // Save user email and role for dashboard
        const email = this.emailInput.value.trim();
        const user = this.validUsers.find(u => u.email === email && u.password === this.passwordInput.value);
        localStorage.setItem('userEmail', email);
        if (user && user.role === 'admin') {
            localStorage.setItem('userRole', 'admin');
        }
        
        // Soft fade out form
        this.form.style.transform = 'scale(0.95)';
        this.form.style.opacity = '0';
        
        setTimeout(() => {
            this.form.style.display = 'none';
            document.querySelector('.social-login').style.display = 'none';
            document.querySelector('.signup-link').style.display = 'none';
            
            // Show success with soft animation
            this.successMessage.classList.add('show');
            
            // Animate success icon
            const successIcon = this.successMessage.querySelector('.neu-icon');
            successIcon.style.animation = 'successPulse 0.6s ease-out';
            
        }, 300);
        
        // Redirect to dashboard
        setTimeout(() => {
            console.log('Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        }, 2500);
    }
}

// Add custom animations
if (!document.querySelector('#neu-keyframes')) {
    const style = document.createElement('style');
    style.id = 'neu-keyframes';
    style.textContent = `
        @keyframes gentleShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
        }
        
        @keyframes successPulse {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NeumorphismLoginForm();
});