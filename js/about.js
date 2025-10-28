// About page functionality

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.querySelector('form');

// Mobile menu toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Initialize the page
function initAboutPage() {
    setupContactForm();
}

// Set up contact form functionality
function setupContactForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Add form submission handler if the form exists
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                submitButton.innerHTML = 'Send Message';
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initAboutPage);