// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoader();
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeStatCounters();
    initializeContactForm();
    initializeBackToTop();
    initializeParallaxEffect();
    initializeScrollIndicator();
    initializeResponsiveFeatures();
    initializePerformanceOptimizations();
    initializeSEOOptimizations();
    initializeTestimonials();
});

// Loading Screen
function initializeLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time with a more realistic approach
    const minLoadTime = 1500; // Minimum loading time
    const startTime = Date.now();
    
    // Check if all critical resources are loaded
    const checkResourcesLoaded = () => {
        const elapsedTime = Date.now() - startTime;
        const isMinTimePassed = elapsedTime >= minLoadTime;
        const areImagesLoaded = document.readyState === 'complete';
        
        if (isMinTimePassed && areImagesLoaded) {
            hideLoader();
        } else {
            setTimeout(checkResourcesLoaded, 100);
        }
    };
    
    const hideLoader = () => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        // Add animation classes to elements that should appear after loading
        const heroElements = document.querySelectorAll('.hero-name, .hero-description, .hero-cta');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };
    
    checkResourcesLoaded();
}

// Enhanced Navigation with better mobile support
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Hamburger menu toggle with improved accessibility
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when mobile menu is open
        if (!isActive) {
            body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'Close navigation menu');
        } else {
            body.style.overflow = 'visible';
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'visible';
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'visible';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Enhanced navbar scroll effect with throttling
    let lastScrollY = 0;
    let scrollTimeout;
    
    const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar on scroll down, show on scroll up (mobile)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        }, 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Active section highlighting with improved performance
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    const updateActiveSection = () => {
        const scrollPosition = window.scrollY + 200;
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        // Update active nav link
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            }
        });
    };
    
    // Use Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
    
    // Smooth scroll for navigation links with improved animation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                // Use modern smooth scrolling with fallback
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback for older browsers
                    const startPosition = window.pageYOffset;
                    const distance = offsetTop - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    const step = (timestamp) => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        // Easing function
                        const ease = percentage < 0.5 
                            ? 4 * percentage * percentage * percentage 
                            : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
                        
                        window.scrollTo(0, startPosition + distance * ease);
                        
                        if (progress < duration) {
                            requestAnimationFrame(step);
                        }
                    };
                    
                    requestAnimationFrame(step);
                }
            }
        });
    });
}

// Enhanced Typing Effect with better performance
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const roles = [
        'iOS Developer',
        'SwiftUI Specialist', 
        'Mobile App Creator',
        'Apple Ecosystem Expert',
        'Cross-Platform Developer',
        'Jetpack Compose Developer',
        'Web Developer',
        'iPhone App Developer',
        'iOS UI/UX Designer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let animationFrame;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100 + Math.random() * 50; // Add slight randomness
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        // Use setTimeout instead of setInterval for better performance
        setTimeout(() => {
            if (document.visibilityState === 'visible') {
                typeEffect();
            }
        }, typingSpeed);
    }
    
    // Start typing effect only when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeEffect();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(typingText);
}

// Enhanced Scroll Animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('fade-in');
                
                // Special handling for different elements
                if (element.classList.contains('stat-card')) {
                    animateStatCounter(element);
                }
                
                // Add staggered animations for groups
                if (element.classList.contains('skill-card') || element.classList.contains('project-card')) {
                    const siblings = Array.from(element.parentElement.children);
                    const index = siblings.indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Unobserve to prevent re-triggering
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-card, .project-card, .skill-card, .stat-card, .contact-form, .social-links, .method-card'
    );
    animatedElements.forEach(el => observer.observe(el));
}

// Stat Counters
function initializeStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        counter.setAttribute('data-animated', 'false');
    });
}

function animateStatCounter(statCard) {
    const counter = statCard.querySelector('.stat-number');
    if (counter.getAttribute('data-animated') === 'true') return;
    
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    counter.setAttribute('data-animated', 'true');
    updateCounter();
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Form validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styles
        field.classList.remove('error');
        
        // Validation rules
        if (field.required && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            // Allow various phone number formats
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid mobile number');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearErrors(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
        // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });

        if (!isValid) return;
        
        // Show loading state with iOS-style animation
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.95)';
        
        // Submit to Formspree
        try {
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success animation
                submitBtn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    submitBtn.style.transform = 'scale(1)';
                }, 150);
                
                showNotification('Message sent successfully! I\'ll get back to you soon. 🚀', 'success');
                form.reset();
                
                // Clear all labels
                inputs.forEach(input => {
                    const label = input.nextElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        label.style.top = '1rem';
                        label.style.fontSize = '1rem';
                        label.style.color = '#94a3b8';
                    }
                });
            } else {
                const data = await response.json();
                if (data.errors) {
                    showNotification(data.errors.map(error => error.message).join(', '), 'error');
                } else {
                    showNotification('Sorry, there was an error sending your message. Please try again. 😔', 'error');
                }
                
                // Error animation
                submitBtn.style.transform = 'translateX(-5px)';
                setTimeout(() => {
                    submitBtn.style.transform = 'translateX(5px)';
                    setTimeout(() => {
                        submitBtn.style.transform = 'translateX(0)';
                    }, 100);
                }, 100);
            }
            
        } catch (error) {
            // Error animation
            submitBtn.style.transform = 'translateX(-5px)';
            setTimeout(() => {
                submitBtn.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    submitBtn.style.transform = 'translateX(0)';
                }, 100);
            }, 100);
            
            showNotification('Sorry, there was an error sending your message. Please try again. 😔', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.style.transform = 'scale(1)';
        }
    });
    
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: '#ffffff',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax Effect
function initializeParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator after scrolling down
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Project Links (you can customize these)
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for project links
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // You can customize these URLs or add modal functionality
            const projectCard = link.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            
            // For now, just show an alert (replace with actual project URLs)
            alert(`This would open ${projectTitle}. Please add your actual project URLs.`);
        });
    });
});

// Theme Toggle (Optional - Dark/Light mode)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Performance Optimization
function initializePerformanceOptimizations() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'styles.css',
        // Add other critical resources
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// Social Media Links
function initializeSocialLinks() {
    const socialLinks = {
        github: 'https://github.com/sachinkaxhyap', // Replace with actual URL
        linkedin: 'https://linkedin.com/in/sachinkaxhyap', // Replace with actual URL
        email: 'mailto:hello@sachinkaxhyap.me'
    };
    
    // Update social links
    Object.keys(socialLinks).forEach(platform => {
        const link = document.querySelector(`.social-link.${platform}`);
        if (link) {
            link.href = socialLinks[platform];
        }
    });
}

// Initialize social links
document.addEventListener('DOMContentLoaded', initializeSocialLinks);

// Responsive Features
function initializeResponsiveFeatures() {
    // Enhanced touch support for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve touch feedback for interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .project-card, .skill-card, .social-link');
        interactiveElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    }
    
    // Viewport height fix for mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });
    
    // Enhanced hamburger menu for mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Add keyboard navigation support
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
        
        // Trap focus in mobile menu when open
        const trapFocus = (e) => {
            if (!navMenu.classList.contains('active')) return;
            
            const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
            
            if (e.key === 'Escape') {
                hamburger.click();
                hamburger.focus();
            }
        };
        
        document.addEventListener('keydown', trapFocus);
    }
    
    // Responsive image loading
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Responsive font size adjustment
    const adjustFontSize = () => {
        const baseSize = Math.min(window.innerWidth / 100, 16);
        document.documentElement.style.fontSize = `${Math.max(baseSize, 14)}px`;
    };
    
    adjustFontSize();
    window.addEventListener('resize', utils.debounce(adjustFontSize, 250));
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Prefetch important pages/resources
    const prefetchLinks = [
        // Add any important resources to prefetch
    ];
    
    prefetchLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Optimize animations based on user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = (e) => {
        if (e.matches) {
            document.body.classList.add('reduce-motion');
            // Disable heavy animations
            const animatedElements = document.querySelectorAll('.code-window, .skill-card, .project-card');
            animatedElements.forEach(el => {
                el.style.animation = 'none';
            });
        } else {
            document.body.classList.remove('reduce-motion');
        }
    };
    
    handleMotionPreference(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);
    
    // Intersection Observer for performance monitoring
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load section-specific JavaScript or assets
                const sectionId = entry.target.id;
                
                switch (sectionId) {
                    case 'projects':
                        // Load project-specific features
                        break;
                    case 'skills':
                        // Load skill animations
                        break;
                    case 'contact':
                        // Initialize contact form enhancements
                        break;
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe main sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => performanceObserver.observe(section));
    
    // Memory cleanup for animations
    const cleanupAnimations = () => {
        const finishedAnimations = document.querySelectorAll('[style*="animation"]');
        finishedAnimations.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.animationPlayState === 'paused' || 
                computedStyle.animationIterationCount === '0') {
                el.style.animation = '';
            }
        });
    };
    
    // Run cleanup periodically
    setInterval(cleanupAnimations, 30000);
    
    // Network-aware loading
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const slowConnection = connection.effectiveType === 'slow-2g' || 
                              connection.effectiveType === '2g' || 
                              connection.saveData;
        
        if (slowConnection) {
            document.body.classList.add('slow-connection');
            // Reduce animations and effects for slow connections
            const heavyAnimations = document.querySelectorAll('.parallax, .float-animation');
            heavyAnimations.forEach(el => el.style.animation = 'none');
        }
    }
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Additional utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
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
    
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Apply performance optimizations to scroll events
window.addEventListener('scroll', utils.throttle(() => {
    // Throttled scroll events here
}, 16)); // ~60fps 

// SEO and Accessibility Optimizations
function initializeSEOOptimizations() {
    // Enhanced structured data for better SEO
    const addStructuredData = () => {
        const structuredData = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Person",
                    "@id": "https://sachinkaxhyap.me/#person",
                    "name": "Sachin Kaxhyap",
                    "alternateName": "Sachin Kashyap",
                    "url": "https://sachinkaxhyap.me",
                    "sameAs": [
                        "https://github.com/sachinkaxhyap",
                        "https://linkedin.com/in/sachinkaxhyap",
                        "https://instagram.com/sachin_kaxhyap"
                    ]
                },
                {
                    "@type": "WebSite",
                    "@id": "https://sachinkaxhyap.me/#website",
                    "url": "https://sachinkaxhyap.me",
                    "name": "Sachin Kaxhyap - iOS Developer",
                    "description": "Expert iOS Developer and Software Engineer specializing in SwiftUI, Android development, and web technologies"
                }
            ]
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    };
    
    addStructuredData();
    
    // Dynamic meta tag updates for SPA-like behavior
    const updateMetaTags = (section) => {
        const titles = {
            home: 'Sachin Kaxhyap - Expert iOS Developer | Mobile & Web Development',
            about: 'About Sachin Kaxhyap - Professional iOS & Android Developer',
            projects: 'iOS & Android App Projects by Sachin Kaxhyap',
            skills: 'Technical Skills - iOS, Android & Web Development',
            testimonials: 'Client Reviews - Sachin Kaxhyap Developer Services',
            contact: 'Contact Sachin Kaxhyap - Hire iOS Developer'
        };
        
        if (titles[section]) {
            document.title = titles[section];
        }
    };
    
    // Update meta tags on section change
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateMetaTags(entry.target.id);
            }
        });
    }, { threshold: 0.7 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add breadcrumb schema
    const addBreadcrumbSchema = () => {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://sachinkaxhyap.me"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About",
                    "item": "https://sachinkaxhyap.me#about"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Projects",
                    "item": "https://sachinkaxhyap.me#projects"
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Skills",
                    "item": "https://sachinkaxhyap.me#skills"
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "name": "Contact",
                    "item": "https://sachinkaxhyap.me#contact"
                }
            ]
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbData);
        document.head.appendChild(script);
    };
    
    addBreadcrumbSchema();
    
    // Accessibility improvements
    const enhanceAccessibility = () => {
        // Add skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only skip-link';
        skipLink.style.cssText = `
            position: absolute;
            left: -9999px;
            top: 0;
            z-index: 10000;
            padding: 8px 16px;
            background: var(--primary-color);
            color: white;
            text-decoration: none;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.left = '10px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.left = '-9999px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add ARIA labels to interactive elements
        const interactiveElements = document.querySelectorAll('button, a, input, textarea');
        interactiveElements.forEach(el => {
            if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
                const text = el.textContent || el.value || el.placeholder;
                if (text) {
                    el.setAttribute('aria-label', text.trim());
                }
            }
        });
    };
    
    enhanceAccessibility();
}

// Testimonials functionality
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length === 0) return;
    
    // Animate testimonials on scroll
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        testimonialObserver.observe(card);
    });
    
    // Add hover effects for testimonials
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Core Web Vitals monitoring
function initializeCoreWebVitals() {
    // Measure and report Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift (CLS)
        new PerformanceObserver((entryList) => {
            let cls = 0;
            entryList.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
            console.log('CLS:', cls);
        }).observe({ entryTypes: ['layout-shift'] });
    }
}

// Initialize Core Web Vitals monitoring
initializeCoreWebVitals();