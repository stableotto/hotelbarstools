// Navigation functionality for Hotel Bar Stools website

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  function initMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          mobileMenuButton.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('open');
          document.body.classList.remove('menu-open');
        }
      });
    }
  }
  
  // Sticky header functionality
  function initStickyHeader() {
    const header = document.querySelector('[data-header]');
    
    if (header) {
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
      });
    }
  }
  
  // Smooth scroll for navigation links
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Initialize all navigation functionality
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  
  console.log('Navigation initialized');
}); 