// Enhanced Hamburger Menu Functionality for MKG Capital Group with Cool Animations
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const popupMenu = document.getElementById('hamburger-popup');
  const closePopupMenu = document.getElementById('hamburger-popup-close');
  const navButtonsContainer = document.getElementById('nav-buttons-container');
  const hamburgerLogo = document.querySelector('.hamburger-popup-logo');
  const hamburgerNavButtons = document.querySelectorAll('.hamburger-menu-item, .hamburger-nav-btn');

  let isAnimating = false;

  // Function to create particle effect
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hamburger-particles';
    popupMenu.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'hamburger-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
      particlesContainer.appendChild(particle);
    }

    setTimeout(() => {
      if (particlesContainer.parentNode) {
        particlesContainer.remove();
      }
    }, 3000);
  }

  // Function to open popup menu with cool animations
  function openPopupMenu() {
    if (isAnimating) return;
    isAnimating = true;

    hamburgerMenu.classList.add('open');

    // Add bounce animation to hamburger icon
    hamburgerMenu.style.animation = 'hamburgerBounce 0.6s ease';

    // Show popup with slide-in animation
    popupMenu.style.display = 'flex';
    popupMenu.style.animation = 'slideInFromRight 0.5s ease-out forwards';

    // Animate logo with fade-in and scale effect
    if (hamburgerLogo) {
      hamburgerLogo.style.animation = 'logoFadeIn 0.8s ease-out 0.2s both';
    }

    // Stagger animation for menu items
    hamburgerNavButtons.forEach((button, index) => {
      button.style.animation = `menuItemSlideIn 0.6s ease-out ${0.3 + index * 0.1}s both`;
    });

    // Create particle effect
    setTimeout(() => {
      createParticles();
      isAnimating = false;
    }, 500);
  }

  // Function to close popup menu with cool animations
  function closePopupMenuFunc() {
    if (isAnimating) return;
    isAnimating = true;

    // Reverse animations
    popupMenu.style.animation = 'slideOutToRight 0.4s ease-in forwards';

    // Animate menu items out
    hamburgerNavButtons.forEach((button, index) => {
      button.style.animation = `menuItemSlideOut 0.3s ease-in ${index * 0.05}s both`;
    });

    // Animate logo out
    if (hamburgerLogo) {
      hamburgerLogo.style.animation = 'logoFadeOut 0.3s ease-in both';
    }

    // Remove bounce from hamburger
    hamburgerMenu.style.animation = '';

    setTimeout(() => {
      popupMenu.style.display = 'none';
      hamburgerMenu.classList.remove('open');
      isAnimating = false;
    }, 400);
  }

  // Toggle hamburger menu on click with sound effect simulation
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      if (popupMenu && popupMenu.style.display === 'flex') {
        closePopupMenuFunc();
      } else {
        openPopupMenu();
      }
    });
  }

  // Close popup menu on close button click with rotation effect
  if (closePopupMenu) {
    closePopupMenu.addEventListener('click', () => {
      closePopupMenu.style.animation = 'rotateClose 0.3s ease-in-out';
      setTimeout(() => {
        closePopupMenuFunc();
        closePopupMenu.style.animation = '';
      }, 300);
    });
  }

  // Close popup when clicking outside popup content
  popupMenu.addEventListener('click', (e) => {
    if (e.target === popupMenu) {
      closePopupMenuFunc();
    }
  });

  // Handle menu item clicks with ripple effect
  const handleMenuItemClick = (e) => {
    const target = e.target;
    const menuItem = target.classList.contains('hamburger-menu-item') || target.classList.contains('hamburger-nav-btn') ? target :
                     target.closest('.hamburger-menu-item') || target.closest('.hamburger-nav-btn');
    if (!menuItem) return;

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    const rect = menuItem.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    menuItem.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    const page = menuItem.getAttribute('data-page');

    if (page) {
      // Close menu first with delay for effect
      setTimeout(() => {
        closePopupMenuFunc();
      }, 200);

      // Navigate to page with enhanced transition
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        setTimeout(() => {
          window.location.href = page;
        }, 800);
      }, 400);
    } else if (menuItem.id === 'hamburger-open-popup-members') {
      // Handle members popup with delay
      setTimeout(() => {
        closePopupMenuFunc();
        const popupMembers = document.getElementById('popup-members');
        if (popupMembers) {
          popupMembers.style.display = 'flex';
          popupMembers.style.animation = 'popupFadeIn 0.5s ease-out';
        }
      }, 300);
    }
  };

  // Add event listener to hamburger popup menu
  if (popupMenu) {
    popupMenu.addEventListener('click', handleMenuItemClick);
  }

  // Handle responsive navigation display
  function handleResponsiveNav() {
    if (window.innerWidth > 768) {
      // Desktop: show nav buttons, hide hamburger and popup menu
      if (navButtonsContainer) {
        navButtonsContainer.style.display = 'flex';
      }
      if (hamburgerMenu) {
        hamburgerMenu.style.display = 'none';
      }
      if (popupMenu && popupMenu.style.display === 'flex') {
        closePopupMenuFunc();
      }
    } else {
      // Mobile: hide nav buttons, show hamburger
      if (navButtonsContainer) {
        navButtonsContainer.style.display = 'none';
      }
      if (hamburgerMenu) {
        hamburgerMenu.style.display = 'flex';
      }
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
          // Add click effect
          e.target.style.animation = 'navBtnClick 0.3s ease';
          setTimeout(() => {
            document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            document.body.style.opacity = '0';
            document.body.style.transform = 'scale(0.95)';
            setTimeout(() => {
              window.location.href = page;
            }, 800);
          }, 300);
        } else if (e.target.id === 'open-popup-members') {
          document.getElementById('popup-members').style.display = 'flex';
          document.getElementById('popup-members').style.animation = 'popupFadeIn 0.5s ease-out';
        }
      }
    });
  }

  // Add keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupMenu && popupMenu.style.display === 'flex') {
      closePopupMenuFunc();
    }
  });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInFromRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutToRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes logoFadeIn {
    0% {
      transform: scale(0.8) translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }

  @keyframes logoFadeOut {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
  }

  @keyframes menuItemSlideIn {
    0% {
      transform: translateX(50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes menuItemSlideOut {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(50px);
      opacity: 0;
    }
  }

  @keyframes hamburgerBounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @keyframes rotateClose {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes ripple-effect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes navBtnClick {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }

  @keyframes popupFadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .hamburger-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .hamburger-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: linear-gradient(45deg, #3498db, #e74c3c);
    border-radius: 50%;
    animation: particleFloat 3s ease-out infinite;
  }

  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    animation: ripple-effect 0.6s linear;
    pointer-events: none;
  }

  .hamburger-menu.open .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger-menu.open .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .hamburger-menu.open .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  .hamburger-line {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);
