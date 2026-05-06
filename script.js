// Beauty with Fateema - JavaScript Functionality

// WhatsApp Contact Number
const WHATSAPP_NUMBER = '2348084022900';
const WHATSAPP_MESSAGE = 'Hi Fateema! I would like to learn more about your beauty products and business opportunities.';

// Open WhatsApp
function openWhatsApp() {
    const url = `https://wa.me/2348084022900? text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when a link is clicked
const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.add('hidden');
    });
});

// Recruitment Form Modal
function openRecruitmentForm() {
    const modal = document.getElementById('recruitmentModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeRecruitmentForm() {
    const modal = document.getElementById('recruitmentModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close modal when clicking outside
const recruitmentModal = document.getElementById('recruitmentModal');
if (recruitmentModal) {
    recruitmentModal.addEventListener('click', (e) => {
        if (e.target === recruitmentModal) {
            closeRecruitmentForm();
        }
    });
}

// Form Submission
const recruitmentForm = document.getElementById('recruitmentForm');
if (recruitmentForm) {
    recruitmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(recruitmentForm);
        const name = formData.get('name') || document.querySelector('#recruitmentForm input[type="text"]').value;
        const email = document.querySelector('#recruitmentForm input[type="email"]').value;
        const phone = document.querySelector('#recruitmentForm input[type="tel"]').value;
        
        // Log the submission (in production, send to backend/email service)
        console.log('Lead Submission:', { name, email, phone });
        
        // Store in localStorage as backup
        const leads = JSON.parse(localStorage.getItem('oriflame_leads') || '[]');
        leads.push({
            name,
            email,
            phone,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('oriflame_leads', JSON.stringify(leads));
        
        // Show success message
        alert('Thank you! Redirecting to Oriflame registration...');
        
        // Close form and redirect
        closeRecruitmentForm();
        
        // Redirect to Oriflame registration
        window.open('https://ng.oriflame.com/business-opportunity/become-consultant?potentialSponsor=NG-fatybee08', '_blank');
        
        // Reset form
        recruitmentForm.reset();
    });
}

// Keyboard Shortcut - Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeRecruitmentForm();
    }
});

// Smooth Scroll for Anchor Links (fallback for browsers without smooth scroll CSS support)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#/') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Analytics (optional - for tracking)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Replace with actual analytics service (Google Analytics, Mixpanel, etc.)
}

// Track CTA clicks
document.querySelectorAll('[onclick*="openWhatsApp"], [href*="wa.me"], [href*="oriflame.com"]').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA_Click', {
            element: btn.textContent,
            timestamp: new Date().toISOString()
        });
    });
});

// Detect if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimize WhatsApp widget for mobile
if (isMobileDevice()) {
    const whatsappWidget = document.getElementById('whatsappWidget');
    if (whatsappWidget) {
        whatsappWidget.style.bottom = '80px'; // Account for mobile bottom nav
    }
}

// Lazy Load Images (if used in future)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Service Worker Registration (optional - for PWA functionality)
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA features
    // navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration failed:', err));
}

// Console message for developers
console.log('%c🌸 Welcome to Beauty with Fateema! 🌸', 'color: #c084fc; font-size: 20px; font-weight: bold;');
console.log('Contact: 08084022900 (WhatsApp)');
console.log('Business Opportunity: https://ng.oriflame.com/business-opportunity/become-consultant?potentialSponsor=NG-fatybee08');
console.log('Digital Catalogue: https://ng.oriflame.com/products/digital-catalogue-current');
