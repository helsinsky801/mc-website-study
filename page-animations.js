// Lightweight general animations for all pages except contact, quiz, and belajar pages

document.addEventListener('DOMContentLoaded', () => {
  // Fade in main content
  const mainContent = document.querySelector('body > main, body > .container, body > section, body > div.container');
  if (mainContent) {
    mainContent.style.opacity = 0;
    mainContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    mainContent.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
      mainContent.style.opacity = 1;
      mainContent.style.transform = 'translateY(0)';
    });
  }

  // Animate headers with subtle slide and fade
  const headers = document.querySelectorAll('h1, h2, h3');
  headers.forEach((header, index) => {
    header.style.opacity = 0;
    header.style.transform = 'translateX(-20px)';
    header.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
    requestAnimationFrame(() => {
      header.style.opacity = 1;
      header.style.transform = 'translateX(0)';
    });
  });

  // Animate buttons with scale and shadow on hover
  const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-community');
  buttons.forEach(button => {
    button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 8px 20px rgba(25, 118, 210, 0.4)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '';
    });
  });

  // Subtle floating animation for elements with class 'floating'
  const floatingElements = document.querySelectorAll('.floating');
  floatingElements.forEach(el => {
    el.style.animation = 'floatUpDown 4s ease-in-out infinite';
  });

  // Add keyframes for floating animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUpDown {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);
});
