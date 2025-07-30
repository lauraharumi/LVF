// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.borderBottom = '1px solid rgba(26, 54, 93, 0.15)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.borderBottom = '1px solid rgba(26, 54, 93, 0.1)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Modal functionality
    const modal = document.getElementById('waitlistModal');
    const modalTriggers = [
        document.getElementById('joinWaitlist'),
        document.getElementById('heroJoinWaitlist'),
        document.getElementById('finalCTA')
    ];
    const closeModal = document.getElementById('closeModal');
    const waitlistForm = document.getElementById('waitlistForm');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus first form field
                setTimeout(() => {
                    const firstInput = modal.querySelector('select');
                    if (firstInput) firstInput.focus();
                }, 100);
            });
        }
    });
    
    // Close modal
    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        waitlistForm.reset();
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    // Form submission
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(waitlistForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = waitlistForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // In a real application, you would send this data to your backend
                console.log('Waitlist submission:', data);
                
                // Show success message
                submitButton.textContent = 'Application Submitted!';
                submitButton.style.background = '#10b981';
                
                // Reset and close modal after delay
                setTimeout(() => {
                    closeModalFunc();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    
                    // Show success notification
                    showNotification('Thank you! We\'ll be in touch soon.');
                }, 2000);
                
            }, 1500);
        });
    }
    
    // Investor login button
    const investorLogin = document.getElementById('investorLogin');
    if (investorLogin) {
        investorLogin.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Investor portal coming soon. Please join our waitlist for early access.');
        });
    }
    
    // Learn more button
    const learnMore = document.getElementById('heroLearnMore');
    if (learnMore) {
        learnMore.addEventListener('click', function(e) {
            e.preventDefault();
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // View positions button
    const viewPositions = document.getElementById('viewPositions');
    if (viewPositions) {
        viewPositions.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Careers page coming soon. Please contact us directly for immediate opportunities.');
        });
    }
    
    // Notification system
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: '#2563eb',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '6px',
            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)',
            zIndex: '3000',
            fontSize: '13px',
            fontWeight: '500',
            maxWidth: '320px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', function() {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // Smooth reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .partnership-content, .cta-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add typing effect to hero title (optional enhancement)
    function addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    let tagEnd = text.indexOf('>', i);
                    heroTitle.innerHTML += text.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Initialize typing effect (uncomment if desired)
    // addTypingEffect();
    
    // Add dynamic gradient animation to hero
    let gradientAngle = 135;
    setInterval(() => {
        const gradientText = document.querySelector('.gradient-text');
        if (gradientText) {
            gradientAngle += 1;
            gradientText.style.background = `linear-gradient(${gradientAngle}deg, #4f46e5, #7c3aed, #ec4899)`;
            gradientText.style.webkitBackgroundClip = 'text';
            gradientText.style.webkitTextFillColor = 'transparent';
            gradientText.style.backgroundClip = 'text';
        }
    }, 100);
    
    // Console message for developers
    console.log('%cLVF - Curated Partnerships. Unrivaled Dedication.', 
               'color: #4f46e5; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in our technology stack? Contact us at careers@lvf.inc', 
               'color: #7c3aed; font-size: 12px;');
});
