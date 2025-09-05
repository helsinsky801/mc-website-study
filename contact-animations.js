// Advanced Contact Page Animations - Ultra Cool Edition
// MKG Capital Group - Contact Page Animations

class ContactAnimations {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.createParticles();
        this.createMorphingShapes();
        this.createInteractiveElements();
        this.createScrollAnimations();
        this.create3DEffects();
        this.startAnimation();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'contact-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            background: linear-gradient(45deg, #0a0a0a, #1a1a2e, #16213e, #0f3460);
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Enhanced mouse tracking for interactive elements
        document.addEventListener('mousemove', (e) => {
            const elements = document.querySelectorAll('.interactive-element');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance < 200) {
                    const intensity = 1 - distance / 200;
                    el.style.transform = `translate(${deltaX * intensity * 0.1}px, ${deltaY * intensity * 0.1}px) rotate(${deltaX * intensity * 0.05}deg)`;
                } else {
                    el.style.transform = 'translate(0, 0) rotate(0deg)';
                }
            });
        });
    }

    createParticles() {
        const particleCount = 150;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                life: Math.random() * 100 + 50,
                maxLife: Math.random() * 100 + 50,
                type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }
    }

    getRandomColor() {
        const colors = [
            '#00ffff', '#ff00ff', '#ffff00', '#ff6b6b', '#4ecdc4',
            '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createMorphingShapes() {
        const morphingContainer = document.createElement('div');
        morphingContainer.id = 'morphing-shapes';
        morphingContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            shape.className = 'morphing-shape';
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 200 + 100}px;
                height: ${Math.random() * 200 + 100}px;
                background: linear-gradient(45deg, ${this.getRandomColor()}, ${this.getRandomColor()});
                border-radius: 50%;
                opacity: 0.1;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: morphShape ${Math.random() * 10 + 10}s infinite ease-in-out;
                filter: blur(20px);
            `;
            morphingContainer.appendChild(shape);
        }

        document.body.appendChild(morphingContainer);

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes morphShape {
                0%, 100% {
                    border-radius: 50%;
                    transform: scale(1) rotate(0deg);
                }
                25% {
                    border-radius: 20% 80% 60% 40%;
                    transform: scale(1.2) rotate(90deg);
                }
                50% {
                    border-radius: 80% 20% 40% 60%;
                    transform: scale(0.8) rotate(180deg);
                }
                75% {
                    border-radius: 40% 60% 80% 20%;
                    transform: scale(1.1) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    createInteractiveElements() {
        // Add interactive class to key elements
        const elements = document.querySelectorAll('.btn-primary, .btn-secondary, .feature-card, .team-member, .popup-content');
        elements.forEach(el => {
            el.classList.add('interactive-element');
        });

        // Create floating orbs
        const orbContainer = document.createElement('div');
        orbContainer.id = 'floating-orbs';
        orbContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

        for (let i = 0; i < 12; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            orb.style.cssText = `
                position: absolute;
                width: ${Math.random() * 50 + 20}px;
                height: ${Math.random() * 50 + 20}px;
                background: radial-gradient(circle, ${this.getRandomColor()}40, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatOrb ${Math.random() * 20 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            orbContainer.appendChild(orb);
        }

        document.body.appendChild(orbContainer);

        // Add floating orb animation
        const style = document.createElement('style');
        style.textContent += `
            @keyframes floatOrb {
                0%, 100% {
                    transform: translateY(0px) translateX(0px) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translateY(-20px) translateX(10px) scale(1.1);
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-40px) translateX(-10px) scale(0.9);
                    opacity: 0.4;
                }
                75% {
                    transform: translateY(-20px) translateX(5px) scale(1.05);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const elements = document.querySelectorAll('.animate-on-scroll, .feature-card, .team-member, .popup-content');
        elements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    create3DEffects() {
        // Add 3D transform effects on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            const elements = document.querySelectorAll('.card-3d');
            elements.forEach(el => {
                el.style.transform = `translateY(${rate * 0.1}px) rotateX(${rate * 0.01}deg)`;
            });
        });
    }

    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.5;
                particle.vy += (dy / distance) * force * 0.5;
            }

            // Update life
            particle.life--;

            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
                // Add new particle
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: Math.random() * 3 + 1,
                    color: this.getRandomColor(),
                    life: Math.random() * 100 + 50,
                    maxLife: Math.random() * 100 + 50,
                    type: Math.floor(Math.random() * 3),
                    rotation: 0,
                    rotationSpeed: (Math.random() - 0.5) * 0.1
                });
            }
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            this.ctx.globalAlpha = particle.life / particle.maxLife;

            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;

            switch (particle.type) {
                case 0: // Circle
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;
                case 1: // Square
                    this.ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
                    break;
                case 2: // Triangle
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -particle.size);
                    this.ctx.lineTo(-particle.size, particle.size);
                    this.ctx.lineTo(particle.size, particle.size);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;
            }

            this.ctx.restore();
        });
    }

    createDynamicBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(0.3, '#1a1a2e');
        gradient.addColorStop(0.6, '#16213e');
        gradient.addColorStop(1, '#0f3460');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        this.createDynamicBackground();
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    startAnimation() {
        this.animate();
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Enhanced Button Animations
class ButtonAnimations {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp-large');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            this.addHoverEffects(button);
            this.addClickEffects(button);
        });
    }

    addHoverEffects(button) {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = `0 10px 30px ${this.getButtonColor(button)}40`;

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple 0.6s linear;
                left: ${e.offsetX - 10}px;
                top: ${e.offsetY - 10}px;
            `;
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '';
        });
    }

    addClickEffects(button) {
        button.addEventListener('click', (e) => {
            button.style.transform = 'scale(0.95)';
            button.style.transition = 'transform 0.1s ease';

            setTimeout(() => {
                button.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
            }, 100);
        });
    }

    getButtonColor(button) {
        if (button.classList.contains('btn-primary')) return '#00ffff';
        if (button.classList.contains('btn-secondary')) return '#ff00ff';
        if (button.classList.contains('btn-whatsapp-large')) return '#25d366';
        return '#ffffff';
    }
}

// Advanced Scroll Effects
class ScrollEffects {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll(); // Initial call
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax effect for sections
        this.sections.forEach((section, index) => {
            const yPos = -(scrolled * 0.1 * (index + 1));
            section.style.transform = `translateY(${yPos}px)`;
        });

        // Dynamic opacity for elements
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight && elementBottom > 0) {
                const opacity = 1 - Math.abs(elementTop - windowHeight / 2) / (windowHeight / 2);
                el.style.opacity = Math.max(0.3, opacity);
            }
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';

        // Initialize all animation classes
        new ContactAnimations();
        new ButtonAnimations();
        new ScrollEffects();

        // Add additional CSS for enhanced animations
        const style = document.createElement('style');
        style.textContent = `
            .interactive-element {
                transition: transform 0.3s ease-out;
            }

            .animate-in {
                animation: slideInUp 0.8s ease-out forwards;
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            .morphing-shape {
                animation: morphShape 15s infinite ease-in-out;
            }

            .floating-orb {
                animation: floatOrb 20s infinite ease-in-out;
            }

            /* Enhanced hover effects */
            .feature-card:hover {
                transform: translateY(-10px) rotateX(5deg);
                box-shadow: 0 20px 40px rgba(0, 255, 255, 0.3);
            }

            .team-member:hover {
                transform: scale(1.05) rotateY(5deg);
                box-shadow: 0 15px 30px rgba(255, 0, 255, 0.3);
            }

            /* Liquid button effect enhancement */
            .liquid-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                transform: translateX(-100%);
                transition: transform 0.6s;
            }

            .liquid-btn:hover::before {
                transform: translateX(100%);
            }
        `;
        document.head.appendChild(style);

    }, 500);
});

// Ultra Cool Contact Popup Functionality
class ContactPopupManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactPopups();
        this.setupContactForm();
        this.setupCopyToClipboard();
    }

    setupContactPopups() {
        // Contact method cards click handlers
        const contactCards = document.querySelectorAll('.contact-method-card');
        contactCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const method = card.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.openContactPopup(method);
            });
        });

        // Close popup handlers
        const closeButtons = document.querySelectorAll('[id^="close-contact-"]');
        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const popupId = e.target.id.replace('close-', '');
                this.closePopup(popupId);
            });
        });

        // Close popup when clicking outside
        const popups = document.querySelectorAll('.popup');
        popups.forEach(popup => {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    this.closePopup(popup.id);
                }
            });
        });
    }

    openContactPopup(method) {
        let popupId = '';
        switch(method) {
            case 'whatsapp':
                popupId = 'contact-whatsapp-popup';
                // Directly open WhatsApp chat link instead of popup
                const phoneNumber = '6285156116897'; // WhatsApp number for 085156116897
                const whatsappUrl = `https://wa.me/${phoneNumber}`;
                window.open(whatsappUrl, '_blank');
                return; // Skip showing popup
            case 'email':
                popupId = 'contact-email-popup';
                // Pre-fill email in popup if it exists
                setTimeout(() => {
                    const emailElement = document.querySelector('.contact-value');
                    if (emailElement && emailElement.textContent.includes('@')) {
                        emailElement.textContent = 'awenhelsins@gmail.com';
                    }
                }, 100);
                break;
            case 'phone':
                popupId = 'contact-phone-popup';
                break;
        }

        if (popupId) {
            this.showPopup(popupId);
        }
    }

    showPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'flex';
            popup.style.opacity = '0';
            popup.style.transform = 'scale(0.8)';

            // Animate in
            setTimeout(() => {
                popup.style.transition = 'all 0.3s ease-out';
                popup.style.opacity = '1';
                popup.style.transform = 'scale(1)';
            }, 10);

            // Add body scroll lock
            document.body.style.overflow = 'hidden';
        }
    }

    closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.transition = 'all 0.3s ease-in';
            popup.style.opacity = '0';
            popup.style.transform = 'scale(0.8)';

            setTimeout(() => {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmission();
            });
        }
    }

    handleContactFormSubmission() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);

        // Get form values
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            this.showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Format email tidak valid!', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call)
        this.showLoadingState();

        setTimeout(() => {
            this.hideLoadingState();
            this.showSuccessMessage();
            form.reset();
        }, 2000);
    }

    showLoadingState() {
        const submitBtn = document.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Mengirim...';
            submitBtn.style.opacity = '0.7';
        }
    }

    hideLoadingState() {
        const submitBtn = document.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="submit-icon">🚀</span> Kirim Pesan';
            submitBtn.style.opacity = '1';
        }
    }

    showSuccessMessage() {
        this.showPopup('success-popup');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : '#3742fa'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    setupCopyToClipboard() {
        // This function is called from HTML onclick attributes
        window.copyToClipboard = (text) => {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Berhasil disalin ke clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.showNotification('Gagal menyalin. Silakan salin manual.', 'error');
            });
        };
    }


}

// Enhanced Popup Functions for backward compatibility
function openPopup(popupId) {
    const popupManager = new ContactPopupManager();
    popupManager.showPopup(popupId);
}

function closePopup(popupId) {
    const popupManager = new ContactPopupManager();
    popupManager.closePopup(popupId);
}

function openContactPopup(method) {
    const popupManager = new ContactPopupManager();
    popupManager.openContactPopup(method);
}

// Add CSS for loading spinner and notifications
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .notification {
        max-width: 300px;
    }

    .notification-success {
        background: #2ed573 !important;
    }

    .popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease-out;
    }

    .popup.show {
        display: flex;
    }

    .popup-content {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .contact-popup-content {
        max-width: 600px;
    }

    .success-popup-content {
        max-width: 400px;
        text-align: center;
    }

    .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        transition: all 0.3s ease;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .close-btn:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
        transform: rotate(90deg);
    }

    .popup-header {
        text-align: center;
        margin-bottom: 25px;
    }

    .popup-icon {
        font-size: 48px;
        margin-bottom: 15px;
        display: block;
    }

    .whatsapp-popup-icon { color: #25d366; }
    .email-popup-icon { color: #ea4335; }
    .phone-popup-icon { color: #34a853; }
    .social-popup-icon { color: #1877f2; }
    .success-popup-icon { color: #2ed573; }

    .popup-title {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
        background: linear-gradient(45deg, #00ffff, #ff00ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .popup-body {
        color: #333;
    }

    .contact-info {
        margin-bottom: 20px;
    }

    .contact-number, .contact-email, .contact-phone, .contact-social {
        margin-bottom: 15px;
    }

    .contact-label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
        color: #666;
    }

    .contact-value {
        font-size: 18px;
        font-weight: bold;
        color: #333;
    }

    .contact-status {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-dot.online { background: #2ed573; }
    .status-dot.available { background: #ffa502; }
    .status-dot.business-hours { background: #3742fa; }
    .status-dot.active { background: #e84393; }

    .status-text {
        font-size: 12px;
        color: #666;
    }

    .popup-description {
        margin: 20px 0;
        line-height: 1.6;
        color: #555;
    }

    .popup-features {
        margin: 20px 0;
    }

    .feature-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        padding: 8px 0;
    }

    .feature-icon {
        font-size: 16px;
    }

    .feature-text {
        color: #666;
    }

    .popup-actions {
        display: flex;
        gap: 15px;
        margin-top: 25px;
        flex-wrap: wrap;
    }

    .btn-primary-popup, .btn-secondary-popup {
        padding: 12px 20px;
        border: none;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }

    .btn-primary-popup {
        background: linear-gradient(45deg, #00ffff, #ff00ff);
        color: white;
        flex: 1;
        justify-content: center;
    }

    .btn-secondary-popup {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .btn-success {
        background: #2ed573;
        color: white;
        width: 100%;
        justify-content: center;
    }

    .social-links {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        margin: 20px 0;
    }

    .social-link {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        text-decoration: none;
        color: #333;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .social-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .social-icon {
        font-size: 24px;
    }

    .social-platform {
        font-weight: bold;
        flex: 1;
    }

    .social-handle {
        color: #666;
        font-size: 14px;
    }

    .instagram-link .social-icon { color: #e84393; }
    .tiktok-link .social-icon { color: #000000; }
    .youtube-link .social-icon { color: #ff0000; }

    @media (max-width: 768px) {
        .popup-content {
            margin: 20px;
            padding: 20px;
        }

        .popup-actions {
            flex-direction: column;
        }

        .btn-primary-popup, .btn-secondary-popup {
            width: 100%;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Initialize contact popup manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPopupManager();
});

// Export for potential use in other scripts
window.ContactAnimations = ContactAnimations;
window.ButtonAnimations = ButtonAnimations;
window.ScrollEffects = ScrollEffects;
window.ContactPopupManager = ContactPopupManager;
