/**
 * RozgaarSetu - English to Hindi Text Converter
 * This script handles translation between English and Hindi for the website
 */

// Dictionary mapping English phrases to Hindi translations
const translationDictionary = {
    // Navigation
    "Home": "होम",
    "Services": "सेवाएं",
    "About Us": "हमारे बारे में",
    "Contact": "संपर्क करें",
    "Profile": "प्रोफाइल",
    "Worker Profile": "कार्यकर्ता प्रोफाइल",
    "Customer Profile": "ग्राहक प्रोफाइल",
    "Login": "लॉगिन",
    "Sign Up": "रजिस्टर करें",
    
    // Hero Section
    "Connect with Skilled Workers Nearby": "आस-पास के कुशल कार्यकर्ताओं से जुड़ें",
    "Find reliable daily wage workers or get hired for jobs in your area": "अपने क्षेत्र में विश्वसनीय दैनिक वेतन श्रमिकों को खोजें या नौकरियों के लिए नियुक्त हों",
    "Hire a Worker": "कार्यकर्ता नियुक्त करें",
    "Find Work": "काम खोजें",
    
    // How RozgaarSetu Works
    "How RozgaarSetu Works": "रोज़गारसेतु कैसे काम करता है",
    "Register": "पंजीकरण करें",
    "Sign up as a worker or customer": "एक कार्यकर्ता या ग्राहक के रूप में साइन अप करें",
    "Search": "खोज",
    "Find workers or jobs near you": "अपने आस-पास के कार्यकर्ताओं या नौकरियों को खोजें",
    "Connect": "जुड़ें",
    "Communicate and finalize details": "संवाद करें और विवरण को अंतिम रूप दें",
    "Review": "समीक्षा",
    "Rate your experience after completion": "पूरा होने के बाद अपने अनुभव का मूल्यांकन करें",
    
    // Categories
    "Services": "श्रेणी के अनुसार ब्राउज़ करें",
    "Construction": "निर्माण",
    "Maid": "सफाई",
    "Plumbing": "प्लंबिंग",
    "Electrician": "विद्युत",
    "Carpenter": "बढ़ईगीरी",
    "Painting": "पेंटिंग",
    
    // Login Modal
    "Login to RozgaarSetu": "रोज़गारसेतु में लॉगिन करें",
    "Worker": "कार्यकर्ता",
    "Customer": "ग्राहक",
    "Mobile Number": "मोबाइल नंबर",
    "Password": "पासवर्ड",
    "Email Address": "ईमेल पता",
    "Don't have an account?": "खाता नहीं है?",
    
    // Sign Up Modal
    "Sign Up for RozgaarSetu": "रोज़गारसेतु के लिए रजिस्टर करें",
    "Full Name": "पूरा नाम",
    "Skills": "कौशल",
    
    // Footer
    "RozgaarSetu": "रोज़गारसेतु",
    "Connecting workers with opportunities": "कार्यकर्ताओं को अवसरों से जोड़ना",
    "Quick Links": "त्वरित लिंक",
    "Privacy Policy": "गोपनीयता नीति",
    "Terms of Service": "सेवा की शर्तें",
    "Contact Us": "संपर्क करें",
    "Email": "ईमेल",
    "Phone": "फोन",
    "Follow Us": "हमें फॉलो करें",
    "&copy; 2025 RozgaarSetu. All rights reserved.": "&copy; 2025 रोज़गारसेतु. सर्वाधिकार सुरक्षित.",
    
    // Language toggle
    "हिंदी": "English",
    "English": "हिंदी"
};

// Current language state
let currentLanguage = 'en'; // Default language is English

// Function to translate the entire website
function translateWebsite(targetLanguage) {
    // Update current language
    currentLanguage = targetLanguage;
    
    // Save language preference to localStorage
    localStorage.setItem('rozgaarSetuLanguage', targetLanguage);
    
    // Get all elements with 'data-en' and 'data-hi' attributes
    const translatableElements = document.querySelectorAll('[data-en][data-hi]');
    
    translatableElements.forEach(element => {
        if (targetLanguage === 'en') {
            // Set to English
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute('data-en');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
        } else {
            // Set to Hindi
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute('data-hi');
            } else {
                element.textContent = element.getAttribute('data-hi');
            }
        }
    });
    
    // Update language toggle button text
    const languageToggleBtn = document.getElementById('language-toggle');
    if (languageToggleBtn) {
        const langSpan = languageToggleBtn.querySelector('span');
        if (langSpan) {
            langSpan.textContent = targetLanguage === 'en' ? 'हिंदी' : 'English';
        }
    }
    
    // Update the document title
    document.title = targetLanguage === 'en' ? 'RozgaarSetu - Connect with Workers' : 'रोज़गारसेतु - कार्यकर्ताओं से जुड़ें';
}

// Function to translate a single text element
function translateText(text, targetLanguage) {
    if (targetLanguage === 'hi') {
        // Translate from English to Hindi
        return translationDictionary[text] || text;
    } else {
        // Translate from Hindi to English (reverse lookup)
        for (const [englishText, hindiText] of Object.entries(translationDictionary)) {
            if (hindiText === text) {
                return englishText;
            }
        }
        return text; // Return original if no translation found
    }
}

// Initialize language based on saved preference or browser language
document.addEventListener('DOMContentLoaded', () => {
    // Check if language preference exists in localStorage
    const savedLanguage = localStorage.getItem('rozgaarSetuLanguage');
    
    // Check browser language if no saved preference
    const browserLanguage = navigator.language || navigator.userLanguage;
    
    // Set default language (Hindi if browser language starts with 'hi', otherwise English)
    const defaultLanguage = savedLanguage || (browserLanguage.startsWith('hi') ? 'hi' : 'en');
    
    // Apply the language
    translateWebsite(defaultLanguage);
    
    // Set up language toggle button
    const languageToggleBtn = document.getElementById('language-toggle');
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', () => {
            // Toggle between English and Hindi
            const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
            translateWebsite(newLanguage);
        });
    }
});

// Function to dynamically add new text with translation support
function addTranslatableText(element, englishText, hindiText) {
    element.setAttribute('data-en', englishText);
    element.setAttribute('data-hi', hindiText);
    
    // Set the content based on current language
    if (currentLanguage === 'en') {
        element.textContent = englishText;
    } else {
        element.textContent = hindiText;
    }
}

// API translation function (use this when dictionary doesn't have the translation)
async function translateViaAPI(text, targetLanguage) {
    try {
        // This is just a placeholder function 
        // In a real-world scenario, you would connect to a translation API like Google Translate
        console.log(`Translation API called for: "${text}" to ${targetLanguage}`);
        
        // For now, return from our dictionary if available
        if (targetLanguage === 'hi') {
            return translationDictionary[text] || text;
        } else {
            // Reverse lookup for Hindi to English
            for (const [englishText, hindiText] of Object.entries(translationDictionary)) {
                if (hindiText === text) {
                    return englishText;
                }
            }
            return text;
        }
        
        // When implementing actual API:
        // const response = await fetch('https://translation-api-endpoint', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         text: text,
        //         targetLanguage: targetLanguage
        //     })
        // });
        // const data = await response.json();
        // return data.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Return original text on error
    }
}

// Function to update/expand the translation dictionary
function updateTranslationDictionary(newTranslations) {
    Object.assign(translationDictionary, newTranslations);
}