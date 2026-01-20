/**
 * 4Service Landing Page - Main JavaScript
 * Handles hamburger menu, smooth scrolling, and scroll effects
 */

(function () {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    /**
     * Toggle mobile navigation menu
     */
    function toggleMenu() {
        const isOpen = nav.classList.contains('active');

        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', !isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
    }

    /**
     * Close mobile navigation menu
     */
    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');

        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'فتح القائمة');
    }

    /**
     * Smooth scroll to section
     * @param {string} targetId - The ID of the target section
     */
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Handle navigation link click
     * @param {Event} event - Click event
     */
    function handleNavClick(event) {
        const href = event.currentTarget.getAttribute('href');

        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            event.preventDefault();
            closeMenu();

            // Small delay to allow menu to close before scrolling
            setTimeout(() => {
                scrollToSection(href);
            }, 100);
        }
    }

    /**
     * Handle scroll events for header shadow effect
     */
    function handleScroll() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /**
     * Handle keyboard events for accessibility
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleKeydown(event) {
        // Close menu on Escape key
        if (event.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
            hamburger.focus();
        }
    }

    /**
     * Initialize scroll animations with Intersection Observer
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if (animatedElements.length === 0) return;

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Show all elements immediately if reduced motion is preferred
            animatedElements.forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Initialize event listeners
     */
    function init() {
        // Hamburger menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        // Navigation links smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Keyboard accessibility
        document.addEventListener('keydown', handleKeydown);

        // Initial scroll check
        handleScroll();

        // Initialize scroll animations
        initScrollAnimations();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
