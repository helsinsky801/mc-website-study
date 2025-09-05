// About Page Specific Script
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  initScrollAnimations();

  // Initialize interactive elements
  initInteractiveElements();

  // Initialize navigation
  initNavigation();

  // Initialize popup functionality
  initPopups();
});

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe all animate-on-scroll elements
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Observe feature cards with different animations
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe team members
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach((member, index) => {
    member.style.animationDelay = `${index * 0.15}s`;
    observer.observe(member);
  });

  // Observe achievement cards
  const achievementCards = document.querySelectorAll('.achievement-card');
  achievementCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
  });
}

function initInteractiveElements() {
  // Add hover effects for team members
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-20px) rotateY(5deg) rotateX(5deg) scale(1.08)';
    });

    member.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  });

  // Add click effects for achievement cards
  const achievementCards = document.querySelectorAll('.achievement-card');
  achievementCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });

  // Add particle effects on hero section
  createParticles();
}

function createParticles() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heroSection.appendChild(particle);
  }
}

function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      if (page) {
        // Add loading animation
        document.body.style.opacity = '0.7';
        setTimeout(() => {
          window.location.href = page;
        }, 300);
      }
    });
  });

  // Add smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
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

function initPopups() {
  // Members popup
  const openMembersBtn = document.getElementById('open-popup-members');
  const popupMembers = document.getElementById('popup-members');
  const closeMembersBtn = document.getElementById('close-popup-members');

  if (openMembersBtn && popupMembers) {
    openMembersBtn.addEventListener('click', function(e) {
      e.preventDefault();
      popupMembers.style.display = 'flex';
      popupMembers.style.opacity = '0';
      setTimeout(() => {
        popupMembers.style.opacity = '1';
      }, 10);
    });
  }

  if (closeMembersBtn && popupMembers) {
    closeMembersBtn.addEventListener('click', function() {
      popupMembers.style.opacity = '0';
      setTimeout(() => {
        popupMembers.style.display = 'none';
      }, 300);
    });
  }

  if (popupMembers) {
    popupMembers.addEventListener('click', function(e) {
      if (e.target === popupMembers) {
        popupMembers.style.opacity = '0';
        setTimeout(() => {
          popupMembers.style.display = 'none';
        }, 300);
      }
    });
  }
}

// Add loading animation on page load
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
  }, 100);
});

// Add scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #1976d2, #64b5f6);
    z-index: 1000;
    transition: width 0.25s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize scroll progress
initScrollProgress();

// Add parallax effect for hero section
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add typing effect for hero title
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '3px solid #64b5f6';

  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      setTimeout(() => {
        heroTitle.style.borderRight = 'none';
      }, 500);
    }
  }, 100);
}

// Initialize typing effect after a delay
setTimeout(initTypingEffect, 1000);

// Add counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(count) + (counter.textContent.includes('+') ? '+' : '');
      }
    }, 20);
  });
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Add magnetic effect for buttons
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-community');
  buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
}

initMagneticButtons();

// Add glassmorphism effect enhancement
function enhanceGlassmorphism() {
  const glassElements = document.querySelectorAll('.glass-card');
  glassElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.backdropFilter = 'blur(25px)';
      this.style.webkitBackdropFilter = 'blur(25px)';
    });

    element.addEventListener('mouseleave', function() {
      this.style.backdropFilter = 'blur(20px)';
      this.style.webkitBackdropFilter = 'blur(20px)';
    });
  });
}

enhanceGlassmorphism();

// Add custom cursor effects
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mousedown', function() {
    cursor.classList.add('click');
  });

  document.addEventListener('mouseup', function() {
    cursor.classList.remove('click');
  });

  const hoverElements = document.querySelectorAll('button, .nav-btn, .feature-card, .team-member, .achievement-card');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('hover');
    });

    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('hover');
    });
  });
}

initCustomCursor();

// Add floating particles effect
function createFloatingParticles() {
  const container = document.querySelector('.hero');
  if (!container) return;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(100, 181, 246, 0.6);
      border-radius: 50%;
      pointer-events: none;
      animation: floatParticle ${Math.random() * 3 + 2}s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(particle);
  }
}

createFloatingParticles();

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
  }

  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #1976d2, #64b5f6);
    z-index: 1000;
    transition: width 0.25s ease;
  }

  .cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #64b5f6, #1976d2);
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    mix-blend-mode: difference;
    box-shadow: 0 0 20px rgba(100, 181, 246, 0.5);
  }

  .cursor::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }

  .cursor.hover {
    transform: scale(1.5);
    background: linear-gradient(135deg, #ff6b6b, #ff4757);
    box-shadow: 0 0 30px rgba(255, 107, 107, 0.7);
  }

  .cursor.click {
    transform: scale(0.8);
    background: linear-gradient(135deg, #2ed573, #1e90ff);
    box-shadow: 0 0 25px rgba(46, 213, 115, 0.7);
  }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const openPopups = document.querySelectorAll('.popup[style*="display: flex"]');
    openPopups.forEach(popup => {
      popup.style.opacity = '0';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 300);
    });
  }
});

// Add performance optimization
function optimizePerformance() {
  // Debounce scroll events
  let scrollTimer;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      // Scroll-based actions
    }, 16);
  });

  // Use passive listeners for better performance
  document.addEventListener('touchstart', function() {}, { passive: true });
  document.addEventListener('touchmove', function() {}, { passive: true });
}

optimizePerformance();

// Add accessibility improvements
function initAccessibility() {
  // Add ARIA labels
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    const page = button.getAttribute('data-page');
    if (page) {
      button.setAttribute('aria-label', `Navigate to ${page.replace('.html', '').replace('-', ' ')}`);
    }
  });

  // Add focus management for popups
  const popupMembers = document.getElementById('popup-members');
  if (popupMembers) {
    const closeBtn = popupMembers.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.setAttribute('aria-label', 'Close members popup');
    }
  }
}

initAccessibility();

// Add theme toggle (if needed in future)
function initThemeToggle() {
  // Placeholder for theme toggle functionality
  // Can be expanded later
}

initThemeToggle();

// Final initialization message
console.log('About page script loaded successfully!');
