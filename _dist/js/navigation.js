// Navigation toggle functionality with accessibility support
(function() {
  'use strict';
  
  // Mobile menu functionality
  function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavigation = document.getElementById('mobile-navigation');
    const mobileBackdrop = document.getElementById('mobile-navigation-backdrop');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!mobileMenuToggle || !mobileNavigation) return;

    const backgroundSelectors = [
      'a[href="#main-content"]',
      '#colNav',
      '#main-content'
    ];
    let hiddenBackgroundElements = [];

    function getFocusableElements(container) {
      return Array.from(container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(function(el) {
        return !el.closest('[hidden]') && el.getClientRects().length > 0;
      });
    }

    function hideBackgroundContent() {
      backgroundSelectors.forEach(function(selector) {
        const element = document.querySelector(selector);
        if (!element || element === mobileNavigation || mobileNavigation.contains(element)) return;

        element.setAttribute('data-mobile-menu-aria-hidden', element.getAttribute('aria-hidden') || '');
        element.setAttribute('aria-hidden', 'true');
        element.setAttribute('inert', '');
        hiddenBackgroundElements.push(element);
      });
    }

    function showBackgroundContent() {
      hiddenBackgroundElements.forEach(function(element) {
        const previousAriaHidden = element.getAttribute('data-mobile-menu-aria-hidden');
        element.removeAttribute('data-mobile-menu-aria-hidden');
        if (previousAriaHidden) {
          element.setAttribute('aria-hidden', previousAriaHidden);
        } else {
          element.removeAttribute('aria-hidden');
        }
        element.removeAttribute('inert');
      });
      hiddenBackgroundElements = [];
    }

    function trapFocusInMobileMenu(e) {
      if (e.key !== 'Tab' || mobileMenuToggle.getAttribute('aria-expanded') !== 'true') return;

      const focusableElements = getFocusableElements(mobileNavigation);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    
    function openMobileMenu() {
      mobileNavigation.classList.remove('-translate-x-full');
      mobileNavigation.setAttribute('aria-hidden', 'false');
      mobileNavigation.removeAttribute('inert');
      hideBackgroundContent();
      if (mobileBackdrop) {
        mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        mobileBackdrop.classList.add('opacity-100');
      }
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      const initialFocusTarget = mobileMenuClose || mobileNavigation.querySelector('nav a');
      if (initialFocusTarget) {
        setTimeout(function() {
          initialFocusTarget.focus();
        }, 100);
      }
    }
    
    function closeMobileMenu() {
      mobileNavigation.classList.add('-translate-x-full');
      mobileNavigation.setAttribute('aria-hidden', 'true');
      mobileNavigation.setAttribute('inert', '');
      showBackgroundContent();
      if (mobileBackdrop) {
        mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
        mobileBackdrop.classList.remove('opacity-100');
      }
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
      mobileMenuToggle.focus();
    }
    
    // Toggle mobile menu on button click
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Close mobile menu when clicking close button
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', function() {
        closeMobileMenu();
      });
    }
    
    // Close mobile menu when clicking backdrop
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', function() {
        closeMobileMenu();
      });
    }
    
    // Close mobile menu on Escape key and trap focus while open
    document.addEventListener('keydown', function(e) {
      if (mobileMenuToggle.getAttribute('aria-expanded') !== 'true') return;

      if (e.key === 'Escape') {
        closeMobileMenu();
        return;
      }

      trapFocusInMobileMenu(e);
    });
    
    // Close mobile menu when clicking a link (navigation)
    // Use event delegation to handle dynamically added links
    mobileNavigation.addEventListener('click', function(e) {
      const link = e.target.closest('nav a');
      if (link) {
        // Small delay to allow navigation to start
        setTimeout(closeMobileMenu, 100);
      }
    });
    
    // Handle window resize - close mobile menu if screen becomes large
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024 && mobileMenuToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
      }
    });
  }
  
  // Helper function to position subnavigation
  function positionSubnav(subnav, level1Link) {
    if (!subnav || !level1Link) return;
    
    // Get the position of the level 1 link
    const linkRect = level1Link.getBoundingClientRect();
    
    // Calculate position: 200px to the right of the link, aligned to top
    const left = linkRect.left + 220;
    const top = linkRect.top;
    
    // Apply fixed positioning
    subnav.style.position = 'fixed';
    subnav.style.left = left + 'px';
    subnav.style.top = top + 'px';
    subnav.style.transform = 'translateX(0)';
  }
  
  // Helper function to close all subnavigations except the specified one
  function closeAllSubnavs(exceptIndex) {
    const allSubnavs = document.querySelectorAll('ul[role="menu"]');
    allSubnavs.forEach(function(subnav) {
      const subnavId = subnav.id;
      const level1Index = subnavId.replace('subnav-', '');
      if (level1Index !== exceptIndex && !subnav.classList.contains('hidden')) {
        closeSubnav(level1Index);
      }
    });
  }
  
  // Helper function to open a subnavigation
  function openSubnav(level1Index) {
    const subnavId = 'subnav-' + level1Index;
    const subnav = document.getElementById(subnavId);
    const toggleButton = document.querySelector('[data-subnav-toggle="' + level1Index + '"]');
    const level1Link = document.querySelector('[data-level1-link="' + level1Index + '"]');
    
    if (!subnav) return;
    
    // Close all other subnavigations first
    closeAllSubnavs(level1Index);
    
    // Position the subnavigation
    if (level1Link) {
      positionSubnav(subnav, level1Link);
    }
    
    // Update subnav visibility
    subnav.classList.remove('hidden');
    subnav.classList.add('block');
    
    // Update toggle button state
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', 'true');
      const icon = toggleButton.querySelector('.subnav-icon');
      if (icon) icon.textContent = '◂';
    }
    
    // Update level 1 link state
    if (level1Link) {
      level1Link.setAttribute('aria-expanded', 'true');
    }
  }
  
  // Helper function to close a subnavigation
  function closeSubnav(level1Index) {
    const subnavId = 'subnav-' + level1Index;
    const subnav = document.getElementById(subnavId);
    const toggleButton = document.querySelector('[data-subnav-toggle="' + level1Index + '"]');
    const level1Link = document.querySelector('[data-level1-link="' + level1Index + '"]');
    
    if (!subnav) return;
    
    // Update subnav visibility
    subnav.classList.remove('block');
    subnav.classList.add('hidden');
    
    // Update toggle button state
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', 'false');
      const icon = toggleButton.querySelector('.subnav-icon');
      if (icon) icon.textContent = '‣';
    }
    
    // Update level 1 link state
    if (level1Link) {
      level1Link.setAttribute('aria-expanded', 'false');
    }
  }
  
  function initNavigation() {
    const toggleButtons = document.querySelectorAll('[data-subnav-toggle]');
    
    // Handle clicks on level 1 links that have subnavigation
    const level1Links = document.querySelectorAll('[data-level1-link]');
    level1Links.forEach(function(link) {
      const level1Index = link.getAttribute('data-level1-link');
      const subnavId = 'subnav-' + level1Index;
      const subnav = document.getElementById(subnavId);
      
      if (!subnav) return;
      
      // Set initial state based on aria-expanded
      const isExpanded = link.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        openSubnav(level1Index);
        // Reposition on window resize
        window.addEventListener('resize', function() {
          if (subnav && !subnav.classList.contains('hidden')) {
            positionSubnav(subnav, link);
          }
        });
      }
      
      // Open subnavigation when clicking on level 1 link
      link.addEventListener('click', function(e) {
        const currentExpanded = link.getAttribute('aria-expanded') === 'true';
        const href = link.getAttribute('href');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isCurrentPage = href === currentPath || link.classList.contains('font-bold');
        
        // If subnavigation is not open, open it
        if (!currentExpanded) {
          // If clicking on current page, prevent navigation and just open subnav
          if (isCurrentPage) {
            e.preventDefault();
            e.stopPropagation();
            openSubnav(level1Index);
            // Focus first link in subnavigation for accessibility
            const firstLink = subnav.querySelector('a');
            if (firstLink) {
              setTimeout(function() {
                firstLink.focus();
              }, 100);
            }
          } else {
            // For other pages, open subnav but allow navigation
            // The subnavigation state will be managed server-side on the new page
            openSubnav(level1Index);
          }
        } else if (isCurrentPage) {
          // If subnav is already open and we're on current page, prevent navigation
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
    
    toggleButtons.forEach(function(button) {
      const subnavId = button.getAttribute('aria-controls');
      const subnav = document.getElementById(subnavId);
      const level1Index = button.getAttribute('data-subnav-toggle');
      
      if (!subnav) return;
      
      // Set initial state based on aria-expanded
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const icon = button.querySelector('.subnav-icon');
      const level1Link = document.querySelector('[data-level1-link="' + level1Index + '"]');
      if (icon) {
        if (isExpanded) {
          subnav.classList.remove('hidden');
          subnav.classList.add('block');
          if (level1Link) {
            positionSubnav(subnav, level1Link);
          }
          icon.textContent = '◂';
        } else {
          icon.textContent = '‣';
        }
      }
      
      // Toggle functionality
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const expanded = button.getAttribute('aria-expanded') === 'true';
        const newExpanded = !expanded;
        
        if (newExpanded) {
          openSubnav(level1Index);
          // Focus first link in subnavigation for accessibility
          const firstLink = subnav.querySelector('a');
          if (firstLink) {
            setTimeout(function() {
              firstLink.focus();
            }, 100);
          }
        } else {
          closeSubnav(level1Index);
        }
      });
      
      // Keyboard accessibility - Enter and Space activate button
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
        // Escape closes the subnavigation
        if (e.key === 'Escape') {
          const expanded = button.getAttribute('aria-expanded') === 'true';
          if (expanded) {
            closeSubnav(level1Index);
            button.focus();
          }
        }
      });
    });
    
    // Close subnavigation when clicking outside
    document.addEventListener('click', function(e) {
      const clickedToggle = e.target.closest('[data-subnav-toggle]');
      const clickedSubnav = e.target.closest('ul[role="menu"]');
      const clickedLevel1Link = e.target.closest('[data-level1-link]');
      const clickedSubnavLink = e.target.closest('ul[role="menu"] a');
      
      // If clicking on toggle, link, or inside subnavigation, don't close
      if (clickedToggle || clickedLevel1Link || clickedSubnavLink) {
        return;
      }
      
      // If clicking inside a subnavigation (but not on a link), don't close
      if (clickedSubnav) {
        return;
      }
      
      // Close all open subnavigations
      const allSubnavs = document.querySelectorAll('ul[role="menu"]:not(.hidden)');
      allSubnavs.forEach(function(subnav) {
        const subnavId = subnav.id;
        const level1Index = subnavId.replace('subnav-', '');
        closeSubnav(level1Index);
      });
    });
    
    // Keyboard navigation within subnavigation
    const subnavs = document.querySelectorAll('ul[role="menu"]');
    subnavs.forEach(function(subnav) {
      const links = subnav.querySelectorAll('a');
      links.forEach(function(link, index) {
        link.addEventListener('keydown', function(e) {
          // Arrow keys for navigation
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % links.length;
            links[nextIndex].focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + links.length) % links.length;
            links[prevIndex].focus();
          } else if (e.key === 'Home') {
            e.preventDefault();
            links[0].focus();
          } else if (e.key === 'End') {
            e.preventDefault();
            links[links.length - 1].focus();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            const toggleButton = document.querySelector('[aria-controls="' + subnav.id + '"]');
            if (toggleButton) {
              toggleButton.focus();
            }
          }
        });
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initMobileMenu();
      initNavigation();
    });
  } else {
    initMobileMenu();
    initNavigation();
  }
  
  // Reposition all visible subnavigations on scroll and resize
  window.addEventListener('scroll', function() {
    const visibleSubnavs = document.querySelectorAll('ul[role="menu"]:not(.hidden)');
    visibleSubnavs.forEach(function(subnav) {
      const subnavId = subnav.id;
      const level1Index = subnavId.replace('subnav-', '');
      const level1Link = document.querySelector('[data-level1-link="' + level1Index + '"]');
      if (level1Link) {
        positionSubnav(subnav, level1Link);
      }
    });
  });
  
  window.addEventListener('resize', function() {
    const visibleSubnavs = document.querySelectorAll('ul[role="menu"]:not(.hidden)');
    visibleSubnavs.forEach(function(subnav) {
      const subnavId = subnav.id;
      const level1Index = subnavId.replace('subnav-', '');
      const level1Link = document.querySelector('[data-level1-link="' + level1Index + '"]');
      if (level1Link) {
        positionSubnav(subnav, level1Link);
      }
    });
  });
})();
