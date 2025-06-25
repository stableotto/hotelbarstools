// Lazy loading functionality for images

document.addEventListener('DOMContentLoaded', function() {
  // Check if browser supports IntersectionObserver
  if ('IntersectionObserver' in window) {
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          img.src = img.dataset.src;
          
          // Handle srcset if present
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Remove loading class and add loaded class
          img.classList.remove('lazy-loading');
          img.classList.add('lazy-loaded');
          
          // Remove data attributes
          delete img.dataset.src;
          delete img.dataset.srcset;
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.classList.add('lazy-loading');
      imageObserver.observe(img);
    });
    
    console.log(`Lazy loading initialized for ${lazyImages.length} images`);
  } else {
    // Fallback for browsers without IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
    console.log('Lazy loading fallback applied');
  }
  
  // Progressive enhancement for better UX
  function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      .lazy-loading {
        background-color: #f0f0f0;
        background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      .lazy-loaded {
        animation: fadeIn 0.3s ease-in-out;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  addLoadingAnimation();
}); 