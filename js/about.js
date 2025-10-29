
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.querySelector('form');


mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
function initAboutPage() {
    setupContactForm();
}
function setupContactForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.querySelector('button[type="submit"]');
    
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields');
                return;
            }
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitButton.disabled = true;
            
        
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
document.addEventListener('DOMContentLoaded', initAboutPage);