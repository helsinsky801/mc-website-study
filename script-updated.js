// JavaScript to add animated particles to the hero section on the homepage

document.addEventListener('DOMContentLoaded', () => {
  const heroParticlesContainer = document.querySelector('.hero-particles');
  if (!heroParticlesContainer) return;

  const particleCount = 15;
  const particles = [];

  // Create particles and append to container
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    // Random size between 5 and 12 px
    const size = Math.random() * 7 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Random horizontal position within container width
    particle.style.left = `${Math.random() * 100}%`;
    // Random animation delay for staggered effect
    particle.style.animationDelay = `${Math.random() * 8}s`;
    // Random animation duration between 6 and 12 seconds
    particle.style.animationDuration = `${Math.random() * 6 + 6}s`;
    heroParticlesContainer.appendChild(particle);
    particles.push(particle);
  }

  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        // Optional: remove animate class when out of view
        // entry.target.classList.remove('animate');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Fallback: Add animate class to all elements after a short delay
  setTimeout(() => {
    animateElements.forEach(element => {
      if (!element.classList.contains('animate')) {
        element.classList.add('animate');
      }
    });
  }, 1000);

  // --- New Animations and Effects ---

  // 1. Magnetic Cursor Effect
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Magnetic effect on elements with class 'magnetic'
  const magneticElements = document.querySelectorAll('.magnetic');
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (relX - centerX) / centerX;
      const deltaY = (relY - centerY) / centerY;
      el.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.05)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0) scale(1)';
    });
  });

  // 2. Interactive Particle System reacting to mouse - DISABLED to prevent overlay issues
  // const interactiveParticlesContainer = document.createElement('div');
  // interactiveParticlesContainer.classList.add('interactive-particles');
  // document.body.appendChild(interactiveParticlesContainer);

  // const interactiveParticleCount = 30;
  // const interactiveParticles = [];

  // for (let i = 0; i < interactiveParticleCount; i++) {
  //   const p = document.createElement('div');
  //   p.classList.add('particle');
  //   p.style.width = '6px';
  //   p.style.height = '6px';
  //   p.style.left = Math.random() * window.innerWidth + 'px';
  //   p.style.top = Math.random() * window.innerHeight + 'px';
  //   interactiveParticlesContainer.appendChild(p);
  //   interactiveParticles.push({
  //     el: p,
  //     x: parseFloat(p.style.left),
  //     y: parseFloat(p.style.top),
  //     vx: (Math.random() - 0.5) * 0.5,
  //     vy: (Math.random() - 0.5) * 0.5
  //   });
  // }

  // function animateInteractiveParticles() {
  //   interactiveParticles.forEach(p => {
  //     p.x += p.vx;
  //     p.y += p.vy;

  //     // Bounce off edges
  //     if (p.x < 0 || p.x > window.innerWidth) p.vx = -p.vx;
  //     if (p.y < 0 || p.y > window.innerHeight) p.vy = -p.vy;

  //     // Mouse interaction
  //     const dx = mouseX - p.x;
  //     const dy = mouseY - p.y;
  //     const dist = Math.sqrt(dx * dx + dy * dy);
  //     if (dist < 100) {
  //       const angle = Math.atan2(dy, dx);
  //       p.vx -= Math.cos(angle) * 0.05;
  //       p.vy -= Math.sin(angle) * 0.05;
  //     }

  //     p.el.style.left = p.x + 'px';
  //     p.el.style.top = p.y + 'px';
  //   });

  //   requestAnimationFrame(animateInteractiveParticles);
  // }
  // animateInteractiveParticles();

  // 3. Typing Effect for elements with class 'typing-effect'
  const typingElements = document.querySelectorAll('.typing-effect');
  typingElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let index = 0;
    function type() {
      if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    type();
  });

  // 4. Animated Counter for elements with class 'counter'
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    function updateCounter() {
      const increment = target / 200;
      if (count < target) {
        count += increment;
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }
    updateCounter();
  });

  // 5. Parallax Effect on elements with class 'parallax'
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // 6. 3D Tilt Effect on elements with class 'tilt'
  const tiltElements = document.querySelectorAll('.tilt');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      el.style.transform = `perspective(500px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // 7. Dynamic Background Color Change - REMOVED to preserve static gradient
  // Background is handled by CSS only

  // 8. Smooth Scroll with offset for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const targetRect = target.getBoundingClientRect().top;
        const targetPosition = targetRect - bodyRect - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 9. Canvas Animation for visual effect - DISABLED to prevent overlay issues
  // const canvas = document.createElement('canvas');
  // canvas.style.position = 'fixed';
  // canvas.style.top = '0';
  // canvas.style.left = '0';
  // canvas.style.width = '100%';
  // canvas.style.height = '100%';
  // canvas.style.pointerEvents = 'none';
  // canvas.style.zIndex = '0';
  // document.body.appendChild(canvas);

  // const ctx = canvas.getContext('2d');
  // let width, height;
  // function resize() {
  //   width = canvas.width = window.innerWidth;
  //   height = canvas.height = window.innerHeight;
  // }
  // window.addEventListener('resize', resize);
  // resize();

  // const stars = [];
  // const starCount = 100;

  // function createStars() {
  //   for (let i = 0; i < starCount; i++) {
  //     stars.push({
  //       x: Math.random() * width,
  //       y: Math.random() * height,
  //       radius: Math.random() * 1.5,
  //       alpha: Math.random(),
  //       delta: 0.01 + Math.random() * 0.02
  //     });
  //   }
  // }
  // createStars();

  // function animateStars() {
  //   ctx.clearRect(0, 0, width, height);
  //   stars.forEach(star => {
  //     star.alpha += star.delta;
  //     if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
  //     ctx.beginPath();
  //     ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  //     ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
  //     ctx.fill();
  //   });
  //   requestAnimationFrame(animateStars);
  // }
  // animateStars();

  // 10. Page Transition Fade Effect
  document.querySelectorAll('a').forEach(link => {
    if (link.target !== '_blank' && link.href.startsWith(window.location.origin)) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = link.href;
        }, 500);
      });
    }
  });

});
