// Utility functions
const Utils = {
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Throttle function for performance
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Debounce function for performance
    debounce: (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }
};

// DOM Ready Check
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize all functionality
        initializeParallaxAI();
        console.log('🎨 Parallax AI Landing Page Loaded Successfully');
        console.log('✨ All interactive features initialized');
    } catch (error) {
        console.error('Error initializing Parallax AI:', error);
    }
});

// Main initialization function
function initializeParallaxAI() {
    // Scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Enhanced scroll animation with stagger
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.grid-3 .animate-on-scroll, .grid-4 .animate-on-scroll').forEach(el => {
        staggerObserver.observe(el);
    });

    // FAQ Accordion with Accessibility
    document.querySelectorAll('.faq-question').forEach(question => {
        // Set initial ARIA attributes
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const faqIcon = question.querySelector('.faq-icon');
        
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        
        question.addEventListener('click', () => {
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherQuestion = item.querySelector('.faq-question');
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    if (otherIcon) {
                        const iconElement = otherIcon.querySelector('i');
                        if (iconElement) {
                            iconElement.className = 'fas fa-plus';
                        }
                    }
                }
            });
            
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                if (faqIcon) {
                    const iconElement = faqIcon.querySelector('i');
                    if (iconElement) {
                        iconElement.className = 'fas fa-minus';
                    }
                }
            } else {
                faqItem.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                if (faqIcon) {
                    const iconElement = faqIcon.querySelector('i');
                    if (iconElement) {
                        iconElement.className = 'fas fa-plus';
                    }
                }
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add pulse glow animation to primary CTAs
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.style.animation = 'pulse-glow 2s ease-in-out infinite';
    });

    // Parallax effect on hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Model card hover effect with dynamic glow
    let hoverTimeout;

    document.querySelectorAll('.model-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Clear any existing timeout
            clearTimeout(hoverTimeout);
            
            // Add a small delay to prevent flickering
            hoverTimeout = setTimeout(() => {
                const color = getComputedStyle(this).getPropertyValue('--model-color');
                this.style.boxShadow = `0 0 30px ${color}40`;
            }, 50);
        });
        
        card.addEventListener('mouseleave', function() {
            // Clear the timeout
            clearTimeout(hoverTimeout);
            this.style.boxShadow = '';
        });
    });

    // Stagger animation for grid items
    const grids = document.querySelectorAll('.grid-3, .grid-4');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.animate-on-scroll');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 50}ms`;
        });
    });

    // Add floating animation to hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.animation = 'float 6s ease-in-out infinite';
    }

    // Pricing card hover enhancements with performance optimization
    let pricingHoverTimeout;

    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Clear any existing timeout
            clearTimeout(pricingHoverTimeout);
            
            // Add a small delay to prevent flickering
            pricingHoverTimeout = setTimeout(() => {
                if (!this.classList.contains('featured')) {
                    this.style.transform = 'translateY(-8px)';
                }
            }, 50);
        });
        
        card.addEventListener('mouseleave', function() {
            // Clear the timeout
            clearTimeout(pricingHoverTimeout);
            if (!this.classList.contains('featured')) {
                this.style.transform = '';
            }
        });
    });

    // Testimonial rating animation
    document.querySelectorAll('.testimonial-rating').forEach(rating => {
        rating.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.className = 'fas fa-star';
            star.style.animation = `fade-in-up 300ms ease-out ${i * 50}ms both`;
            star.style.color = '#F59E0B';
            rating.appendChild(star);
        }
    });

    // Add gradient text animation
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% auto';
    });

    // Counter animation for stats
    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + (target < 100 ? '' : '+');
            }
        };

        updateCounter();
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    if (!isNaN(number)) {
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-row');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add ripple effect to buttons with better performance
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        // Create ripple container if it doesn't exist
        let rippleContainer = button.querySelector('.ripple-container');
        if (!rippleContainer) {
            rippleContainer = document.createElement('span');
            rippleContainer.className = 'ripple-container';
            rippleContainer.style.position = 'absolute';
            rippleContainer.style.top = '0';
            rippleContainer.style.left = '0';
            rippleContainer.style.width = '100%';
            rippleContainer.style.height = '100%';
            rippleContainer.style.overflow = 'hidden';
            rippleContainer.style.pointerEvents = 'none';
            rippleContainer.style.borderRadius = 'inherit';
            button.style.position = 'relative';
            button.appendChild(rippleContainer);
        }
        
        button.addEventListener('click', function(e) {
            if (e.target !== this) return; // Only trigger on the button itself, not children
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 600ms ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '1';

            rippleContainer.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add CSS for ripple animation if not already present
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .ripple-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
                border-radius: inherit;
            }
        `;
        document.head.appendChild(style);
    }

    // Add intersection observer for feature cards with stagger
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
        featureObserver.observe(card);
    });

    // Lazy load images (if any are added)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Add performance optimization: Reduce animations on low-power devices
    if (navigator.userAgent.includes('Mobile')) {
        document.body.style.setProperty('--animation-duration', '200ms');
    }

    // Prefers reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // Add active state to nav links based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.style.color = 'var(--medium-gray)';
                    });
                    navLink.style.color = 'var(--primary-indigo)';
                }
            }
        });
    });

    // Add smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
}