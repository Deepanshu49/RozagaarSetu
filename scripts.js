document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = 'en'; // Default language

    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
        updateLanguage();
    });

    function updateLanguage() {
        // Update all elements with data-en and data-hi attributes
        document.querySelectorAll('[data-en][data-hi]').forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLanguage}`);
        });

        // Update language toggle button text
        const toggleSpan = languageToggle.querySelector('span');
        toggleSpan.textContent = toggleSpan.getAttribute(`data-${currentLanguage}`);
    }

    // Modal Functionality
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeBtns = document.querySelectorAll('.close-modal');

    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    signupBtn.addEventListener('click', function() {
        signupModal.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabContainer = this.closest('.tab-container');
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Hide all tab contents
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab content
            const activeContent = tabContainer.querySelector(`#${tabId}`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    // Cross-modal links
    document.getElementById('worker-signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
        // Activate worker tab
        document.querySelector('#signup-modal .tab-btn[data-tab="worker-signup"]').click();
    });

    document.getElementById('customer-signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
        // Activate customer tab
        document.querySelector('#signup-modal .tab-btn[data-tab="customer-signup"]').click();
    });

    // Form Submission Handlers
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real application, you would send this data to your backend
            console.log('Form submitted:', formObject);
            
            // For demonstration, show success message
            alert('Form submitted successfully! In a real application, this would be sent to the backend.');
            
            // Close modal
            this.closest('.modal').style.display = 'none';
        });
    });

    // Geolocation functionality
    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log('User location:', userLocation);
                    // In a real app, you'd use this to find nearby workers
                    
                    // Store location in sessionStorage for other pages
                    sessionStorage.setItem('userLocation', JSON.stringify(userLocation));
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    // Get user location when relevant buttons are clicked
    const hireButton = document.querySelector('.hero-buttons .primary-btn');
    if (hireButton) {
        hireButton.addEventListener('click', function() {
            getCurrentLocation();
            window.location.href = 'find-workers.html';
        });
    }

    const findWorkButton = document.querySelector('.hero-buttons .secondary-btn');
    if (findWorkButton) {
        findWorkButton.addEventListener('click', function() {
            getCurrentLocation();
            window.location.href = 'find-jobs.html';
        });
    }
});

let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

window.addEventListener('scroll',() => {
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill4.style.left = value * -1.5 + 'px';
    hill1.style.top = value * 1 + 'px';
       
});