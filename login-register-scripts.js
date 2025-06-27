document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = 'en'; // Default language

    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
        updateLanguage();
    });

    function updateLanguage() {
        const elementsWithLanguage = document.querySelectorAll('[data-en][data-hi]');
        
        elementsWithLanguage.forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLanguage}`);
        });
    }

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tab buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // User type switching functionality
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const authForms = document.querySelectorAll('.auth-form');

    function setupUserTypeSelector(container) {
        const userTypeBtns = container.querySelectorAll('.user-type-btn');
        const authForms = container.querySelectorAll('.auth-form');
        
        userTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const userType = this.getAttribute('data-user-type');
                
                // Remove active class from all user type buttons and forms
                userTypeBtns.forEach(btn => btn.classList.remove('active'));
                authForms.forEach(form => form.classList.remove('active'));
                
                // Add active class to clicked user type button and corresponding form
                this.classList.add('active');
                container.querySelector(`#${userType}-${container.id}-form`).classList.add('active');
            });
        });
    }

    // Setup user type selectors for both login and register tabs
    setupUserTypeSelector(document.getElementById('login'));
    setupUserTypeSelector(document.getElementById('register'));

    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Switch between login and register forms
    const switchToRegisterLinks = document.querySelectorAll('.switch-to-register');
    const switchToLoginLinks = document.querySelectorAll('.switch-to-login');
    
    switchToRegisterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Switch to register tab
            document.querySelector('.tab-btn[data-tab="login"]').classList.remove('active');
            document.querySelector('.tab-btn[data-tab="register"]').classList.add('active');
            document.getElementById('login').classList.remove('active');
            document.getElementById('register').classList.add('active');
        });
    });
    
    switchToLoginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Switch to login tab
            document.querySelector('.tab-btn[data-tab="register"]').classList.remove('active');
            document.querySelector('.tab-btn[data-tab="login"]').classList.add('active');
            document.getElementById('register').classList.remove('active');
            document.getElementById('login').classList.add('active');
        });
    });

    // Form validation and submission
    setupFormValidation('worker-login-form', validateWorkerLogin, handleWorkerLogin);
    setupFormValidation('customer-login-form', validateCustomerLogin, handleCustomerLogin);
    setupFormValidation('worker-register-form', validateWorkerRegister, handleWorkerRegister);
    setupFormValidation('customer-register-form', validateCustomerRegister, handleCustomerRegister);

    function setupFormValidation(formId, validateFn, submitHandlerFn) {
        const form = document.getElementById(formId);
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                const errors = validateFn(form);
                
                if (errors.length === 0) {
                    // If validation passes, handle submission
                    submitHandlerFn(form);
                } else {
                    // Display first error
                    showMessage(form.querySelector('.form-message'), errors[0], 'error');
                }
            });
        }
    }

    // Validation functions
    function validateWorkerLogin(form) {
        const errors = [];
        const phone = form.querySelector('#worker-login-phone').value;
        const password = form.querySelector('#worker-login-password').value;
        
        if (!phone) {
            errors.push('Please enter your mobile number');
        } else if (!isValidPhone(phone)) {
            errors.push('Please enter a valid 10-digit mobile number');
        }
        
        if (!password) {
            errors.push('Please enter your password');
        }
        
        return errors;
    }
    
    function validateCustomerLogin(form) {
        const errors = [];
        const email = form.querySelector('#customer-login-email').value;
        const password = form.querySelector('#customer-login-password').value;
        
        if (!email) {
            errors.push('Please enter your email address');
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!password) {
            errors.push('Please enter your password');
        }
        
        return errors;
    }
    
    function validateWorkerRegister(form) {
        const errors = [];
        const name = form.querySelector('#worker-register-name').value;
        const phone = form.querySelector('#worker-register-phone').value;
        const password = form.querySelector('#worker-register-password').value;
        const confirmPassword = form.querySelector('#worker-register-confirm-password').value;
        const termsChecked = form.querySelector('#worker-terms').checked;
        const skillsChecked = Array.from(form.querySelectorAll('.skill-checkboxes input[type="checkbox"]:checked')).length;
        
        if (!name) {
            errors.push('Please enter your full name');
        }
        
        if (!phone) {
            errors.push('Please enter your mobile number');
        } else if (!isValidPhone(phone)) {
            errors.push('Please enter a valid 10-digit mobile number');
        }
        
        if (skillsChecked === 0) {
            errors.push('Please select at least one skill');
        }
        
        if (!password) {
            errors.push('Please create a password');
        } else if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }
        
        if (!termsChecked) {
            errors.push('Please agree to the Terms & Conditions');
        }
        
        return errors;
    }
    
    function validateCustomerRegister(form) {
        const errors = [];
        const name = form.querySelector('#customer-register-name').value;
        const email = form.querySelector('#customer-register-email').value;
        const phone = form.querySelector('#customer-register-phone').value;
        const password = form.querySelector('#customer-register-password').value;
        const confirmPassword = form.querySelector('#customer-register-confirm-password').value;
        const termsChecked = form.querySelector('#customer-terms').checked;
        
        if (!name) {
            errors.push('Please enter your full name');
        }
        
        if (!email) {
            errors.push('Please enter your email address');
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!phone) {
            errors.push('Please enter your mobile number');
        } else if (!isValidPhone(phone)) {
            errors.push('Please enter a valid 10-digit mobile number');
        }
        
        if (!password) {
            errors.push('Please create a password');
        } else if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }
        
        if (!termsChecked) {
            errors.push('Please agree to the Terms & Conditions');
        }
        
        return errors;
    }

    // Form submission handlers
    function handleWorkerLogin(form) {
        showLoading();
        
        // Simulate API call with timeout
        setTimeout(() => {
            const phone = form.querySelector('#worker-login-phone').value;
            
            // For demo purposes, we'll check if the phone number ends with "1234"
            if (phone.endsWith('1234')) {
                showMessage(form.querySelector('.form-message'), 'Login successful! Redirecting...', 'success');
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'worker-dashboard.html';
                }, 2000);
            } else {
                showMessage(form.querySelector('.form-message'), 'Invalid mobile number or password', 'error');
            }
            
            hideLoading();
        }, 1500);
    }
    
    function handleCustomerLogin(form) {
        showLoading();
        
        // Simulate API call with timeout
        setTimeout(() => {
            const email = form.querySelector('#customer-login-email').value;
            
            // For demo purposes, we'll check if the email contains "demo"
            if (email.includes('demo')) {
                showMessage(form.querySelector('.form-message'), 'Login successful! Redirecting...', 'success');
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'customer-dashboard.html';
                }, 2000);
            } else {
                showMessage(form.querySelector('.form-message'), 'Invalid email or password', 'error');
            }
            
            hideLoading();
        }, 1500);
    }
    
    function handleWorkerRegister(form) {
        showLoading();
        
        // Simulate API call with timeout
        setTimeout(() => {
            const phone = form.querySelector('#worker-register-phone').value;
            
            // For demo purposes, we'll check if the phone number is already "registered"
            if (phone.endsWith('9999')) {
                showMessage(form.querySelector('.form-message'), 'This mobile number is already registered', 'error');
            } else {
                // Get selected skills
                const selectedSkills = Array.from(form.querySelectorAll('.skill-checkboxes input[type="checkbox"]:checked'))
                    .map(checkbox => checkbox.value);
                
                console.log('Worker registration:', {
                    name: form.querySelector('#worker-register-name').value,
                    phone: phone,
                    skills: selectedSkills
                });
                
                showMessage(form.querySelector('.form-message'), 'Registration successful! You can now login.', 'success');
                
                // Reset form
                form.reset();
                
                // Switch to login tab after 2 seconds
                setTimeout(() => {
                    document.querySelector('.tab-btn[data-tab="register"]').classList.remove('active');
                    document.querySelector('.tab-btn[data-tab="login"]').classList.add('active');
                    document.getElementById('register').classList.remove('active');
                    document.getElementById('login').classList.add('active');
                }, 2000);
            }
            
            hideLoading();
        }, 1500);
    }
    
    function handleCustomerRegister(form) {
        showLoading();
        
        // Simulate API call with timeout
        setTimeout(() => {
            const email = form.querySelector('#customer-register-email').value;
            
            // For demo purposes, we'll check if the email is already "registered"
            if (email.includes('registered')) {
                showMessage(form.querySelector('.form-message'), 'This email is already registered', 'error');
            } else {
                console.log('Customer registration:', {
                    name: form.querySelector('#customer-register-name').value,
                    email: email,
                    phone: form.querySelector('#customer-register-phone').value
                });
                
                showMessage(form.querySelector('.form-message'), 'Registration successful! You can now login.', 'success');
                
                // Reset form
                form.reset();
                
                // Switch to login tab after 2 seconds
                setTimeout(() => {
                    document.querySelector('.tab-btn[data-tab="register"]').classList.remove('active');
                    document.querySelector('.tab-btn[data-tab="login"]').classList.add('active');
                    document.getElementById('register').classList.remove('active');
                    document.getElementById('login').classList.add('active');
                }, 2000);
            }
            
            hideLoading();
        }, 1500);
    }

    // Helper functions
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function isValidPhone(phone) {
        const regex = /^\d{10}$/;
        return regex.test(phone);
    }
    
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'form-message ' + type;
    }
    
    function showLoading() {
        document.getElementById('loading-overlay').classList.add('active');
    }
    
    function hideLoading() {
        document.getElementById('loading-overlay').classList.remove('active');
    }
});