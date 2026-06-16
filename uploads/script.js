document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Toggle menu icon
      const icon = mobileMenuBtn.querySelector('svg');
      if (navLinks.classList.contains('active')) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
      } else {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
      }
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('svg').innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
      }
    });
  });

  // --- HASIBUR RAHMAN MOBILE NAVIGATION DROPDOWN ---
  const mobileHamburgerBtn = document.querySelector('.mobile-hamburger-btn');
  const mobileDropdown = document.querySelector('.mobile-dropdown-menu');
  
  if (mobileHamburgerBtn && mobileDropdown) {
    mobileHamburgerBtn.addEventListener('click', () => {
      mobileDropdown.classList.toggle('active');
      const icon = mobileHamburgerBtn.querySelector('svg');
      if (mobileDropdown.classList.contains('active')) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
      } else {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
      }
    });

    // Close dropdown when clicking any link
    const dropdownLinks = mobileDropdown.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDropdown.classList.remove('active');
        if (mobileHamburgerBtn) {
          mobileHamburgerBtn.querySelector('svg').innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
        }
      });
    });
  }

  // --- MODAL / FREE AUDIT FUNCTIONALITY ---
  const modal = document.getElementById('audit-modal');
  const openModalBtns = document.querySelectorAll('.open-modal');
  const closeModalBtn = document.querySelector('.modal-close');
  const auditForm = document.getElementById('free-audit-form');
  const formSuccess = document.querySelector('.form-success');
  const modalTitle = document.querySelector('.modal-title');
  const modalDesc = document.querySelector('.modal-desc');

  // Open modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Optional: Get customized topic from data attribute
      const topic = btn.getAttribute('data-topic');
      const selectElem = document.getElementById('audit-service');
      if (topic && selectElem) {
        selectElem.value = topic;
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    });
  });

  // Close modal function
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
    // Reset form after closing
    setTimeout(() => {
      if (auditForm) auditForm.style.display = 'flex';
      if (formSuccess) formSuccess.style.display = 'none';
      if (modalTitle) modalTitle.style.display = 'block';
      if (modalDesc) modalDesc.style.display = 'block';
    }, 400);
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking background
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle form submission
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate button loading state
      const submitBtn = auditForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `Analyzing Website & Channels... <svg class="animate-spin" style="margin-left: 8px; height: 18px; width: 18px; display: inline; color: white;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        auditForm.style.display = 'none';
        modalTitle.style.display = 'none';
        modalDesc.style.display = 'none';
        formSuccess.style.display = 'block';
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        auditForm.reset();
      }, 1600);
    });
  }

  // --- PORTFOLIO / REELS TAB FILTERING ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const workCards = document.querySelectorAll('.work-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      workCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          // animate transition
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
