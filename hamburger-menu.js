// Consolidated Hamburger Menu Functionality for MKG Capital Group
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const popupMenu = document.getElementById('hamburger-popup');
  const closePopupMenu = document.getElementById('hamburger-close-btn');
  const popupMenuItems = document.querySelector('.hamburger-nav-buttons');
  const navButtonsContainer = document.getElementById('nav-buttons-container');

  // Function to open popup menu
  function openPopupMenu() {
    hamburgerMenu.classList.add('open');
    popupMenu.style.display = 'flex';
  }

  // Function to close popup menu
  function closePopupMenuFunc() {
    hamburgerMenu.classList.remove('open');
    popupMenu.style.display = 'none';
  }

  // Toggle hamburger menu on click
  hamburgerMenu.addEventListener('click', () => {
    if (popupMenu.style.display === 'flex') {
      closePopupMenuFunc();
    } else {
      openPopupMenu();
    }
  });

  // Close popup menu on close button click
  closePopupMenu.addEventListener('click', () => {
    closePopupMenuFunc();
  });

  // Close popup when clicking outside popup content
  popupMenu.addEventListener('click', (e) => {
    if (e.target === popupMenu) {
      closePopupMenuFunc();
    }
  });

  // Handle menu item clicks
  popupMenuItems.addEventListener('click', (e) => {
    const target = e.target;
    const menuItem = target.classList.contains('hamburger-nav-btn') ? target : target.closest('.hamburger-nav-btn');
    if (!menuItem) return;

    const page = menuItem.getAttribute('data-page');

    if (page) {
      // Close menu first
      closePopupMenuFunc();

      // Navigate to page with fade transition
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = page;
      }, 500);
    } else if (menuItem.id === 'hamburger-open-popup-members') {
      // Handle members popup
      closePopupMenuFunc();
      document.getElementById('popup-members').style.display = 'flex';
    }
  });

  // Handle responsive navigation display
  function handleResponsiveNav() {
    if (window.innerWidth > 768) {
      // Desktop: show nav buttons, hide hamburger and popup menu
      if (navButtonsContainer) {
        navButtonsContainer.style.display = 'flex';
      }
      hamburgerMenu.style.display = 'none';
      closePopupMenuFunc();
    } else {
      // Mobile: hide nav buttons, show hamburger
      if (navButtonsContainer) {
        navButtonsContainer.style.display = 'none';
      }
      hamburgerMenu.style.display = 'flex';
    }
  }

  // Initial responsive check
  handleResponsiveNav();

  // Listen for window resize to adjust navigation
  window.addEventListener('resize', handleResponsiveNav);

  // Handle nav button clicks on desktop
  if (navButtonsContainer) {
    navButtonsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-btn')) {
        const page = e.target.getAttribute('data-page');
        if (page) {
          document.body.style.transition = 'opacity 0.5s ease';
          document.body.style.opacity = '0';
          setTimeout(() => {
            window.location.href = page;
          }, 500);
        } else if (e.target.id === 'open-popup-members') {
          document.getElementById('popup-members').style.display = 'flex';
        }
      }
    });
  }
});
