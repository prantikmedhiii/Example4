
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initScrollAnimations();
  
  // Initialize navbar behavior
  initNavbar();
  
  // Initialize sectors tabs
  initSectorTabs();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize stat counters
  initStatCounters();
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Generate sector content for all sectors
  generateSectorContent();
});

// Initialize scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all elements with the animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
  });
}

// Initialize navbar behavior
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileMenuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  
  // Navbar scroll behavior
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Check on initial load
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  }
  
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });
  
  // Close mobile menu when clicking menu items
  document.querySelectorAll('.mobile-menu .menu-item').forEach(item => {
    item.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.remove('active');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const yOffset = -80; // Adjust based on your navbar height
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize sectors tabs
function initSectorTabs() {
  const sectorTabs = document.querySelectorAll('.sector-tab');
  
  sectorTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const sectorId = tab.getAttribute('data-sector');
      
      // Remove active class from all tabs and content
      document.querySelectorAll('.sector-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.sector-content').forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.querySelector(`.sector-content[data-sector="${sectorId}"]`).classList.add('active');
    });
  });
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitButton = document.getElementById('submitButton');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <svg class="icon animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `;
      
      // Simulate form submission with a delay
      setTimeout(function() {
        // Hide form, show success message
        contactForm.reset();
        formSuccess.classList.remove('hidden');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide form fields
        contactForm.querySelectorAll('.form-group, .form-row, button').forEach(el => {
          el.style.display = 'none';
        });
        
        // Reset the form after a delay
        setTimeout(function() {
          formSuccess.classList.add('hidden');
          contactForm.querySelectorAll('.form-group, .form-row, button').forEach(el => {
            el.style.display = '';
          });
        }, 5000);
      }, 1500);
    });
  }
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize stat counters
function initStatCounters() {
  const statElements = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetValue = parseInt(entry.target.getAttribute('data-count'));
          animateCounter(entry.target, targetValue);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  statElements.forEach(stat => {
    observer.observe(stat);
  });
}

// Animate counter from 0 to target value
function animateCounter(element, targetValue) {
  let startValue = 0;
  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  
  // Handle different ranges with appropriate stepping
  let increment = 1;
  if (targetValue > 1000) {
    increment = 100;
  } else if (targetValue > 100) {
    increment = 10;
  }
  
  function updateCounter(currentTime) {
    const elapsedTime = currentTime - startTime;
    
    if (elapsedTime < duration) {
      const progress = elapsedTime / duration;
      const currentValue = Math.floor(progress * targetValue);
      element.textContent = currentValue;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = targetValue;
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Generate sector content for all sectors
function generateSectorContent() {
  const sectorData = [
    {
      id: 2,
      name: "Personal Care",
      description: "Production of skincare, hair care, oral hygiene products, and sanitizers.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 21h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2Z"></path><path d="M12 16a2 2 0 0 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 4v2"></path><path d="M10 4h4"></path>
            </svg>`,
      items: ["Skin care", "Hair care", "Oral hygiene", "Feminine hygiene products", "Baby diapers & wipes", "Soaps & sanitizers"]
    },
    {
      id: 3,
      name: "Home Care",
      description: "Manufacturing of cleaning products, detergents, and household maintenance solutions.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>`,
      items: ["Detergents & cleaning liquids", "Disinfectants & surface cleaners", "Air fresheners", "Dishwashing products", "Insect repellents", "Laundry care"]
    },
    {
      id: 4,
      name: "Health & Wellness",
      description: "Production of supplements, vitamins, and medical supplies.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path><path d="M10 10h4"></path><path d="M12 8v4"></path>
            </svg>`,
      items: ["Nutritional supplements & vitamins", "Herbal remedies & natural medicines", "First-aid supplies", "Medical disposables", "Eco-friendly health products"]
    },
    {
      id: 5,
      name: "Mother & Baby",
      description: "Manufacturing baby care products, feeding equipment, and maternal care items.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 12h.01"></path><path d="M15 12h.01"></path><path d="M10 16c.5.3 1.1.5 2 .5s1.5-.2 2-.5"></path><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
            </svg>`,
      items: ["Feeding bottles & sterilizers", "Baby food processors", "Baby safety & gear", "Educational toys", "School supplies", "Baby furniture & strollers"]
    },
    {
      id: 6,
      name: "Beauty & Cosmetics",
      description: "Production of makeup, fragrances, and beauty products.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><path d="M2.2 8.9c-.5 1.6-.7 3.3-.7 5.1 0 2.5.7 4.9 1.9 7 .2.4.6.6 1 .6h15.2c.4 0 .8-.2 1-.6 1.2-2.1 1.9-4.5 1.9-7 0-5.3-3.1-10.2-8-12.8-4.9 2.6-8 7.6-8 12.8 0 .7 0 1.4.1 2.1"></path>
            </svg>`,
      items: ["Makeup products", "Fragrances & perfumes", "Nail care products", "Men's grooming products", "Natural/organic beauty lines"]
    },
    {
      id: 7,
      name: "Textiles & Fashion",
      description: "Manufacturing of garments, fabrics, and fashion items.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6.5 14.5A6.5 6.5 0 0 0 13 21a6.5 6.5 0 0 0 6.5-6.5 6.5 6.5 0 0 0 .13-1.32A7 7 0 0 0 15.5 8H15a7 7 0 0 0-6.72 5"></path><path d="M16 8V3"></path><path d="M8 9V4"></path><line x1="10" y1="13" x2="8" y2="13"></line><line x1="16" y1="13" x2="14" y2="13"></line>
            </svg>`,
      items: ["Undergarments & socks", "Basic T-shirts & jeans", "Sleepwear & loungewear", "Sportswear", "Baby clothing", "School uniforms"]
    },
    {
      id: 8,
      name: "Household Essentials",
      description: "Production of kitchenware, storage solutions, and home accessories.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21 7-9-5-9 5v10l9 5 9-5V7Z"></path><path d="m3 7 9 5 9-5"></path><path d="M12 22V12"></path>
            </svg>`,
      items: ["Kitchenware", "Storage solutions", "Plastic & glass containers", "Reusable bags & eco-products", "Home decor items"]
    },
    {
      id: 9,
      name: "Stationery & Office",
      description: "Manufacturing of paper products, writing instruments, and office supplies.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline>
            </svg>`,
      items: ["Notebooks & paper products", "Writing instruments", "Educational kits", "Office organization tools", "Art & craft supplies"]
    },
    {
      id: 10,
      name: "Electronics",
      description: "Production of small appliances, mobile accessories, and consumer electronics.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="2" y1="10" x2="4" y2="10"></line><line x1="20" y1="10" x2="22" y2="10"></line><line x1="12" y1="14" x2="12" y2="16"></line>
            </svg>`,
      items: ["Small home appliances", "Mobile accessories", "Personal grooming devices", "Smart toys & educational electronics", "Solar-powered gadgets"]
    },
    {
      id: 11,
      name: "Automotive",
      description: "Manufacturing of car care products and automotive accessories.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"></path>
            </svg>`,
      items: ["Car care products", "Air fresheners", "Seat covers & organizers", "Vehicle maintenance kits"]
    },
    {
      id: 12,
      name: "Pet Care",
      description: "Production of pet food, grooming products, and accessories.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"></path><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"></path><path d="M8 14v.5"></path><path d="M16 14v.5"></path><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"></path>
            </svg>`,
      items: ["Pet food", "Grooming products", "Pet toys and accessories", "Pet hygiene"]
    }
  ];
  
  const sectorContentContainer = document.querySelector('.sector-content-container');
  
  // Generate HTML for sectors 2-12 (sector 1 is already in the HTML)
  sectorData.forEach(sector => {
    const sectorContentHTML = `
      <div class="sector-content" data-sector="${sector.id}">
        <div class="sector-header">
          <div class="sector-icon">
            ${sector.icon}
          </div>
          <h3 class="sector-title">${sector.name}</h3>
        </div>
        
        <p class="sector-description">${sector.description}</p>
        
        <div class="sector-items">
          <h4 class="sector-items-title">Products & Categories</h4>
          <div class="sector-items-grid">
            ${sector.items.map(item => `
              <div class="sector-item">
                <div class="sector-item-dot"></div>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="sector-footer">
          <a href="#contact" class="link-arrow">
            Learn more about ${sector.name.toLowerCase()}
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `;
    
    sectorContentContainer.insertAdjacentHTML('beforeend', sectorContentHTML);
  });
}
