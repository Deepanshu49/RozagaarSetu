document.addEventListener('DOMContentLoaded', function() {
  // Language Toggle
  const languageToggle = document.getElementById('language-toggle');
  const allTranslatableElements = document.querySelectorAll('[data-en][data-hi]');
  let currentLanguage = 'en'; // Default language is English

  // Tab Navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // User Type Selection
  const userTypeBtns = document.querySelectorAll('.user-type-btn');
  const authForms = {
      'login': {
          'worker': document.getElementById('worker-login-form'),
          'customer': document.getElementById('customer-login-form')
      },
      'register': {
          'worker': document.getElementById('worker-register-form'),
          'customer': document.getElementById('customer-register-form')
      }
  };

  // Password Toggle
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');

  // Form Switching Links
  const switchToRegisterLinks = document.querySelectorAll('.switch-to-register');
  const switchToLoginLinks = document.querySelectorAll('.switch-to-login');

  // Form Submission
  const allForms = document.querySelectorAll('.auth-form');

  // Language Toggle Functionality
  languageToggle.addEventListener('click', function() {
      currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
      
      allTranslatableElements.forEach(element => {
          const translatedText = element.getAttribute(data-${currentLanguage});
          if (translatedText) {
              if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
                  element.setAttribute('placeholder', translatedText);
              } else {
                  element.textContent = translatedText;
              }
          }
      });

      // Update the language button text
      const buttonText = languageToggle.querySelector('span');
      buttonText.textContent = buttonText.getAttribute(data-${currentLanguage});
  });

  // Tab Navigation Functionality
  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const tabName = this.getAttribute('data-tab');
          
          // Deactivate all tabs and contents
          tabBtns.forEach(item => item.classList.remove('active'));
          tabContents.forEach(item => item.classList.remove('active'));
          
          // Activate the selected tab and content
          this.classList.add('active');
          document.getElementById(tabName).classList.add('active');
          
          // Reset active user type to first button in newly activated tab
          const activeTabUserTypeBtns = document.querySelector(#${tabName} .user-type-selector).querySelectorAll('.user-type-btn');
          activeTabUserTypeBtns.forEach((btn, index) => {
              if (index === 0) {
                  btn.classList.add('active');
              } else {
                  btn.classList.remove('active');
              }
          });
          
          // Show the correct form based on default user type (first button)
          const defaultUserType = activeTabUserTypeBtns[0].getAttribute('data-user-type');
          updateActiveForm(tabName, defaultUserType);
      });
  });

  // User Type Selection Functionality
  userTypeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const userType = this.getAttribute('data-user-type');
          const tabSection = this.closest('.tab-content');
          const tabName = tabSection.id;
          
          // Deactivate all user type buttons in this tab
          tabSection.querySelectorAll('.user-type-btn').forEach(item => {
              item.classList.remove('active');
          });
          
          // Activate the selected button
          this.classList.add('active');
          
          // Show the correct form
          updateActiveForm(tabName, userType);
      });
  });

  // Function to update active form
  function updateActiveForm(tabName, userType) {
      // Hide all forms in this tab
      const forms = document.querySelectorAll(#${tabName} .auth-form);
      forms.forEach(form => form.classList.remove('active'));
      
      // Show the correct form
      authForms[tabName][userType].classList.add('active');
  }

  // Password Visibility Toggle
  togglePasswordButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          const passwordInput = this.previousElementSibling;
          const type = passwordInput.getAttribute('type');
          
          if (type === 'password') {
              passwordInput.setAttribute('type', 'text');
              this.classList.remove('fa-eye');
              this.classList.add('fa-eye-slash');
          } else {
              passwordInput.setAttribute('type', 'password');
              this.classList.remove('fa-eye-slash');
              this.classList.add('fa-eye');
          }
      });
  });

  // Form Switching Functionality
  switchToRegisterLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Find and click the register tab button
          document.querySelector('[data-tab="register"]').click();
      });
  });

  switchToLoginLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Find and click the login tab button
          document.querySelector('[data-tab="login"]').click();
      });
  });

  // Form Validation and Submission
  allForms.forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Clear previous error messages
          form.querySelectorAll('.error-message').forEach(msg => {
              msg.classList.remove('active');
          });
          
          let isValid = true;
          
          // Validate all required fields
          const requiredInputs = form.querySelectorAll('input[required]');
          requiredInputs.forEach(input => {
              if (!input.value.trim()) {
                  isValid = false;
                  
                  // Create or activate error message
                  let errorMessage = input.parentElement.nextElementSibling;
                  if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                      errorMessage = document.createElement('div');
                      errorMessage.className = 'error-message';
                      input.parentElement.parentNode.insertBefore(errorMessage, input.parentElement.nextSibling);
                  }
                  
                  errorMessage.textContent = 'This field is required';
                  errorMessage.classList.add('active');
              }
          });
          
          // Validate password confirmation if applicable
          const passwordInput = form.querySelector('input[type="password"]');
          const confirmPasswordInput = form.querySelector('input[id$="confirm-password"]');
          
          if (passwordInput && confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
              isValid = false;
              
              // Create or activate error message
              let errorMessage = confirmPasswordInput.parentElement.nextElementSibling;
              if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                  errorMessage = document.createElement('div');
                  errorMessage.className = 'error-message';
                  confirmPasswordInput.parentElement.parentNode.insertBefore(errorMessage, confirmPasswordInput.parentElement.nextSibling);
              }
              
              errorMessage.textContent = 'Passwords do not match';
              errorMessage.classList.add('active');
          }
          
          // Validate phone number format
          const phoneInput = form.querySelector('input[type="tel"]');
          if (phoneInput && phoneInput.value) {
              // Simple validation for a 10-digit phone number
              const phoneRegex = /^\d{10}$/;
              if (!phoneRegex.test(phoneInput.value)) {
                  isValid = false;
                  
                  // Create or activate error message
                  let errorMessage = phoneInput.parentElement.nextElementSibling;
                  if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                      errorMessage = document.createElement('div');
                      errorMessage.className = 'error-message';
                      phoneInput.parentElement.parentNode.insertBefore(errorMessage, phoneInput.parentElement.nextSibling);
                  }
                  
                  errorMessage.textContent = 'Please enter a valid 10-digit phone number';
                  errorMessage.classList.add('active');
              }
          }
          
          // Validate email format if applicable
          const emailInput = form.querySelector('input[type="email"]');
          if (emailInput && emailInput.value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(emailInput.value)) {
                  isValid = false;
                  
                  // Create or activate error message
                  let errorMessage = emailInput.parentElement.nextElementSibling;
                  if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                      errorMessage = document.createElement('div');
                      errorMessage.className = 'error-message';
                      emailInput.parentElement.parentNode.insertBefore(errorMessage, emailInput.parentElement.nextSibling);
                  }
                  
                  errorMessage.textContent = 'Please enter a valid email address';
                  errorMessage.classList.add('active');
              }
          }
          
          // Validate worker skills if applicable (at least one skill must be selected)
          const skillsSection = form.querySelector('.skill-checkboxes');
          if (skillsSection) {
              const selectedSkills = skillsSection.querySelectorAll('input[type="checkbox"]:checked');
              if (selectedSkills.length === 0) {
                  isValid = false;
                  
                  // Create or activate error message
                  let errorMessage = skillsSection.nextElementSibling;
                  if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                      errorMessage = document.createElement('div');
                      errorMessage.className = 'error-message';
                      skillsSection.parentNode.insertBefore(errorMessage, skillsSection.nextSibling);
                  }
                  
                  errorMessage.textContent = 'Please select at least one skill';
                  errorMessage.classList.add('active');
              }
          }
          
          // Check if form is valid for submission
          if (isValid) {
              // Create a success message element
              const successMessage = document.createElement('div');
              successMessage.className = 'success-message active';
              
              if (form.id.includes('login')) {
                  successMessage.textContent = currentLanguage === 'en' ? 
                      'Login successful! Redirecting to dashboard...' : 
                      'लॉगिन सफल! डैशबोर्ड पर पुनर्निर्देशित किया जा रहा है...';
              } else {
                  successMessage.textContent = currentLanguage === 'en' ? 
                      'Registration successful! Redirecting to login...' : 
                      'पंजीकरण सफल! लॉगिन पर पुनर्निर्देशित किया जा रहा है...';
              }
              
              // Remove any existing success message
              const existingSuccessMessage = form.querySelector('.success-message');
              if (existingSuccessMessage) {
                  existingSuccessMessage.remove();
              }
              
              // Add the success message after the submit button
              const submitButton = form.querySelector('.primary-btn');
              submitButton.parentNode.insertBefore(successMessage, submitButton.nextSibling);
              
              // Simulate form submission (in a real app, this would be an API call)
              setTimeout(() => {
                  if (form.id.includes('login')) {
                      // Redirect to appropriate dashboard (you would customize this in a real app)
                      window.location.href = form.id.includes('worker') ? 'worker-dashboard.html' : 'customer-dashboard.html';
                  } else {
                      // For registration, switch to login tab after a delay
                      document.querySelector('[data-tab="login"]').click();
                  }
              }, 2000);
          }
      });
  });

  // Initialize default active tab
  document.querySelector('.tab-btn.active').click();
});