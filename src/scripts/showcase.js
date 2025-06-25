// Showcase gallery functionality
// Following rules: proper error handling, DRY principles, performance optimization

class ShowcaseGallery {
  constructor() {
    this.gallery = null;
    this.lightbox = null;
    this.currentImageIndex = 0;
    this.images = [];
    this.activeFilter = 'all';
    
    // Initialize when DOM is ready
    this.init();
  }

  // Main initialization function - clear naming and error handling
  init() {
    try {
      this.gallery = document.querySelector('[data-gallery]');
      this.lightbox = document.querySelector('[data-lightbox-modal]');
      
      if (!this.gallery) {
        console.warn('Showcase gallery not found on this page');
        return;
      }

      this.setupImageData();
      this.bindEventListeners();
      this.setupAccessibility();
      
      console.log('Showcase gallery initialized successfully');
    } catch (error) {
      console.error('Error initializing showcase gallery:', error);
    }
  }

  // Extract image data for reusability (DRY principle)
  setupImageData() {
    try {
      const imageElements = this.gallery.querySelectorAll('[data-lightbox-trigger]');
      this.images = Array.from(imageElements).map((element, index) => {
        const img = element.querySelector('.gallery-image');
        return {
          id: element.dataset.imageId || index,
          src: img.dataset.src || img.src,
          alt: img.alt,
          title: element.querySelector('.image-title')?.textContent || '',
          category: element.querySelector('.image-category')?.textContent || '',
          element: element
        };
      });
    } catch (error) {
      console.error('Error setting up image data:', error);
      this.images = [];
    }
  }

  // Bind all event listeners with proper error handling
  bindEventListeners() {
    try {
      // Filter buttons
      this.setupFilterButtons();
      
      // Gallery item clicks
      this.setupGalleryClicks();
      
      // Lightbox functionality
      this.setupLightbox();
      
      // Keyboard navigation
      this.setupKeyboardNavigation();
      
    } catch (error) {
      console.error('Error binding event listeners:', error);
    }
  }

  // Filter functionality with performance optimization
  setupFilterButtons() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          
          const filter = button.dataset.filter;
          this.filterImages(filter);
          this.updateActiveFilter(button, filterButtons);
          
        } catch (error) {
          console.error('Error filtering images:', error);
        }
      });
    });
  }

  // Filter images with smooth animation
  filterImages(filter) {
    try {
      this.activeFilter = filter;
      const galleryItems = this.gallery.querySelectorAll('.gallery-item');
      
      galleryItems.forEach(item => {
        const category = item.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
          item.classList.remove('hidden');
          item.style.display = '';
        } else {
          item.classList.add('hidden');
          // Use display: none for performance
          setTimeout(() => {
            if (item.classList.contains('hidden')) {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    } catch (error) {
      console.error('Error filtering images:', error);
    }
  }

  // Update active filter button state
  updateActiveFilter(activeButton, allButtons) {
    try {
      allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-pressed', 'true');
    } catch (error) {
      console.error('Error updating filter state:', error);
    }
  }

  // Gallery click handlers
  setupGalleryClicks() {
    const galleryButtons = this.gallery.querySelectorAll('[data-lightbox-trigger]');
    
    galleryButtons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          this.openLightbox(index);
        } catch (error) {
          console.error('Error opening lightbox:', error);
        }
      });
    });
  }

  // Lightbox functionality with proper cleanup
  setupLightbox() {
    if (!this.lightbox) return;

    try {
      // Close buttons
      const closeButtons = this.lightbox.querySelectorAll('[data-lightbox-close]');
      closeButtons.forEach(button => {
        button.addEventListener('click', () => this.closeLightbox());
      });

      // Prevent modal content clicks from closing
      const lightboxContent = this.lightbox.querySelector('.lightbox-content');
      if (lightboxContent) {
        lightboxContent.addEventListener('click', (e) => e.stopPropagation());
      }

    } catch (error) {
      console.error('Error setting up lightbox:', error);
    }
  }

  // Keyboard navigation for accessibility
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      try {
        if (!this.lightbox.classList.contains('open')) return;

        switch (e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.previousImage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextImage();
            break;
        }
      } catch (error) {
        console.error('Error handling keyboard navigation:', error);
      }
    });
  }

  // Open lightbox with proper validation
  openLightbox(imageIndex) {
    try {
      if (!this.images[imageIndex] || !this.lightbox) return;

      this.currentImageIndex = imageIndex;
      const image = this.images[imageIndex];

      // Update lightbox content
      this.updateLightboxContent(image);
      
      // Show lightbox
      this.lightbox.classList.add('open');
      this.lightbox.setAttribute('aria-hidden', 'false');
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus management for accessibility
      const closeButton = this.lightbox.querySelector('[data-lightbox-close]');
      if (closeButton) {
        closeButton.focus();
      }

    } catch (error) {
      console.error('Error opening lightbox:', error);
    }
  }

  // Update lightbox content safely
  updateLightboxContent(image) {
    try {
      const lightboxImage = this.lightbox.querySelector('[data-lightbox-image]');
      const lightboxTitle = this.lightbox.querySelector('[data-lightbox-title]');
      const lightboxCategory = this.lightbox.querySelector('[data-lightbox-category]');

      if (lightboxImage) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
      }
      
      if (lightboxTitle) {
        lightboxTitle.textContent = image.title;
      }
      
      if (lightboxCategory) {
        lightboxCategory.textContent = image.category;
      }

    } catch (error) {
      console.error('Error updating lightbox content:', error);
    }
  }

  // Close lightbox with proper cleanup
  closeLightbox() {
    try {
      if (!this.lightbox) return;

      this.lightbox.classList.remove('open');
      this.lightbox.setAttribute('aria-hidden', 'true');
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Return focus to the gallery item that opened the lightbox
      const currentImage = this.images[this.currentImageIndex];
      if (currentImage && currentImage.element) {
        currentImage.element.focus();
      }

    } catch (error) {
      console.error('Error closing lightbox:', error);
    }
  }

  // Navigate to previous image
  previousImage() {
    try {
      const visibleImages = this.getVisibleImages();
      const currentVisibleIndex = visibleImages.findIndex(img => 
        img.id === this.images[this.currentImageIndex].id
      );
      
      if (currentVisibleIndex > 0) {
        const prevImage = visibleImages[currentVisibleIndex - 1];
        const globalIndex = this.images.findIndex(img => img.id === prevImage.id);
        this.currentImageIndex = globalIndex;
        this.updateLightboxContent(prevImage);
      }
    } catch (error) {
      console.error('Error navigating to previous image:', error);
    }
  }

  // Navigate to next image
  nextImage() {
    try {
      const visibleImages = this.getVisibleImages();
      const currentVisibleIndex = visibleImages.findIndex(img => 
        img.id === this.images[this.currentImageIndex].id
      );
      
      if (currentVisibleIndex < visibleImages.length - 1) {
        const nextImage = visibleImages[currentVisibleIndex + 1];
        const globalIndex = this.images.findIndex(img => img.id === nextImage.id);
        this.currentImageIndex = globalIndex;
        this.updateLightboxContent(nextImage);
      }
    } catch (error) {
      console.error('Error navigating to next image:', error);
    }
  }

  // Get visible images based on current filter (utility function)
  getVisibleImages() {
    try {
      if (this.activeFilter === 'all') {
        return this.images;
      }
      return this.images.filter(img => 
        img.category.toLowerCase() === this.activeFilter
      );
    } catch (error) {
      console.error('Error getting visible images:', error);
      return this.images;
    }
  }

  // Setup accessibility features
  setupAccessibility() {
    try {
      // Ensure proper ARIA labels
      const galleryButtons = this.gallery.querySelectorAll('[data-lightbox-trigger]');
      galleryButtons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
          const title = button.querySelector('.image-title')?.textContent || 'Gallery image';
          button.setAttribute('aria-label', `View ${title} in lightbox`);
        }
      });

      // Add live region for filter announcements
      this.createLiveRegion();

    } catch (error) {
      console.error('Error setting up accessibility:', error);
    }
  }

  // Create live region for screen reader announcements
  createLiveRegion() {
    try {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'gallery-announcements';
      document.body.appendChild(liveRegion);
      this.liveRegion = liveRegion;
    } catch (error) {
      console.error('Error creating live region:', error);
    }
  }

  // Announce changes to screen readers
  announceToScreenReader(message) {
    try {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    } catch (error) {
      console.error('Error announcing to screen reader:', error);
    }
  }

  // Cleanup method to prevent memory leaks
  destroy() {
    try {
      // Remove event listeners
      document.removeEventListener('keydown', this.handleKeydown);
      
      // Clear references
      this.gallery = null;
      this.lightbox = null;
      this.images = [];
      
      // Remove live region
      if (this.liveRegion && this.liveRegion.parentNode) {
        this.liveRegion.parentNode.removeChild(this.liveRegion);
      }

    } catch (error) {
      console.error('Error destroying showcase gallery:', error);
    }
  }
}

// Initialize when DOM is ready - proper initialization pattern
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Only initialize if we're on a page with the showcase
    if (document.querySelector('[data-gallery]')) {
      window.showcaseGallery = new ShowcaseGallery();
    }
  } catch (error) {
    console.error('Error initializing showcase:', error);
  }
});

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
  try {
    if (window.showcaseGallery) {
      window.showcaseGallery.destroy();
    }
  } catch (error) {
    console.error('Error cleaning up showcase:', error);
  }
}); 