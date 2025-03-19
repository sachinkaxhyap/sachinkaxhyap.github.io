// Mobile Navigation
function showMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
}

function hideMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scrolling
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.querySelector('.fa-bars');
    
    // Check if menu is open and click is outside the menu and not on the hamburger
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        e.target !== hamburger) {
        hideMenu();
    }
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth < 768) {
                hideMenu();
            }
        }
    });
});

// Track active section while scrolling
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Animation on Scroll
window.addEventListener('scroll', revealElements);

function revealElements() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 150) {
            section.classList.add('active');
        }
    });
}

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        // For demo purposes, we'll just log it and show a success message
        console.log('Form submitted with values:', formValues);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        
        this.innerHTML = '';
        this.appendChild(successMessage);
    });
}

// Add active class to sections on page load
document.addEventListener('DOMContentLoaded', function() {
    revealElements();
    
    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('fade-in');
    });
    
    document.querySelectorAll('.card, .brand-item, .upcoming-item, .brand-logo').forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize gallery filter
    initGalleryFilter();
});

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const items = document.querySelectorAll('.testimonial-item');
    
    if (!slider || !dots.length || !items.length) return;
    
    // Set up dots click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Update active dot
            document.querySelector('.dot.active').classList.remove('active');
            dot.classList.add('active');
            
            // Scroll to the corresponding testimonial
            const testimonial = items[index];
            slider.scrollTo({
                left: testimonial.offsetLeft - slider.offsetLeft,
                behavior: 'smooth'
            });
        });
    });
    
    // Auto-scroll testimonials
    let currentIndex = 0;
    
    function autoScroll() {
        currentIndex = (currentIndex + 1) % items.length;
        
        // Update active dot
        document.querySelector('.dot.active').classList.remove('active');
        dots[currentIndex].classList.add('active');
        
        // Scroll to the next testimonial
        const testimonial = items[currentIndex];
        slider.scrollTo({
            left: testimonial.offsetLeft - slider.offsetLeft,
            behavior: 'smooth'
        });
    }
    
    // Set interval for auto-scrolling (every 5 seconds)
    const scrollInterval = setInterval(autoScroll, 5000);
    
    // Pause auto-scrolling when hovering over the slider
    slider.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });
    
    // Resume auto-scrolling when mouse leaves the slider
    slider.addEventListener('mouseleave', () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, 5000);
    });
}

// Gallery Filter
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length || !galleryItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Gallery lightbox
    const galleryZoomBtns = document.querySelectorAll('.gallery-zoom');
    
    galleryZoomBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const imgSrc = btn.getAttribute('href');
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            // Create lightbox content
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${imgSrc}" alt="Gallery Image">
                </div>
            `;
            
            // Add lightbox to body
            document.body.appendChild(lightbox);
            
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
            
            // Close lightbox on click
            lightbox.addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
        });
    });
}

// Dark Mode Toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    // Toggle dark theme class
    body.classList.toggle('dark-theme');
    
    // Update icon
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Development Gallery Filter
function initDevGalleryFilter() {
    const filterBtns = document.querySelectorAll('.dev-gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.dev-gallery-item');
    
    if (!filterBtns.length || !galleryItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            document.querySelector('.dev-gallery-filter .filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Video Modal Functionality
function initVideoModals() {
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const closeModals = document.querySelectorAll('.close-modal');
    
    if (!videoTriggers.length) return;
    
    // Open modal when clicking on a video trigger
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            const modalId = trigger.getAttribute('href');
            const modal = document.querySelector(modalId);
            
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal when clicking on the close button
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.video-modal');
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
            
            // Pause video if playing
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                const iframeSrc = iframe.src;
                iframe.src = iframeSrc; // Reload iframe to stop video
            }
        });
    });
    
    // Close modal when clicking outside the content
    document.querySelectorAll('.video-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = ''; // Re-enable scrolling
                
                // Pause video if playing
                const iframe = modal.querySelector('iframe');
                if (iframe) {
                    const iframeSrc = iframe.src;
                    iframe.src = iframeSrc; // Reload iframe to stop video
                }
            }
        });
    });
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').classList.remove('fa-moon');
        document.getElementById('theme-icon').classList.add('fa-sun');
    }
    
    // Initialize all components
    revealElements();
    initTestimonialSlider();
    initGalleryFilter();
    initDevGalleryFilter(); // Initialize development gallery filter
    initVideoModals(); // Initialize video modals
}); 