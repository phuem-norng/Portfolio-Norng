// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navList.classList.contains('active') && 
                !e.target.closest('.nav') && 
                !e.target.closest('.hamburger')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .skill-progress, .skill-level');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && 
                                 rect.bottom >= 0;
            
            if (isInViewport) {
                if (el.classList.contains('fade-in')) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                } else if (el.classList.contains('skill-progress')) {
                    const width = el.getAttribute('data-width');
                    if (width && !el.classList.contains('animated')) {
                        el.style.width = width + '%';
                        el.classList.add('animated');
                    }
                } else if (el.classList.contains('skill-level')) {
                    const level = el.getAttribute('data-level');
                    if (level && !el.classList.contains('animated')) {
                        el.style.width = level + '%';
                        el.classList.add('animated');
                    }
                }
            }
        });
    };
    
    // Set initial state for fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});