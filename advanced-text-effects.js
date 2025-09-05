// Advanced Text Effects JavaScript
// MKG Capital Group - Enhanced Text Animations

class AdvancedTextEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingEffect();
        this.setupTextMorphing();
        this.setup3DText();
        this.setupParticleText();
        this.setupWaveText();
        this.setupRainbowText();
        this.setupMagneticText();
        this.setupLiquidText();
        this.setupFireText();
    }

    // Enhanced Typing Effect with Smooth Cursor
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');

        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #64b5f6';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Cursor blinking animation
                    setInterval(() => {
                        element.style.borderRight = element.style.borderRight === 'none'
                            ? '2px solid #64b5f6'
                            : 'none';
                    }, 500);
                }
            };

            // Start typing when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(element);
        });
    }

    // Text Morphing Effect
    setupTextMorphing() {
        const morphElements = document.querySelectorAll('.text-morph');

        morphElements.forEach(element => {
            const originalText = element.textContent;
            const morphTexts = element.dataset.morphTexts ?
                JSON.parse(element.dataset.morphTexts) :
                ['TRADING', 'INVESTING', 'SUCCESS', 'PROFIT'];

            let currentIndex = 0;

            const morphText = () => {
                const currentText = morphTexts[currentIndex];
                const nextText = morphTexts[(currentIndex + 1) % morphTexts.length];

                // Create morphing animation
                let output = '';
                const maxLength = Math.max(currentText.length, nextText.length);

                for (let i = 0; i < maxLength; i++) {
                    setTimeout(() => {
                        if (i < nextText.length) {
                            output += nextText[i];
                        }
                        element.textContent = output;
                    }, i * 50);
                }

                currentIndex = (currentIndex + 1) % morphTexts.length;
            };

            setInterval(morphText, 3000);
        });
    }

    // 3D Text Rotation Effect
    setup3DText() {
        const text3DElements = document.querySelectorAll('.text-3d');

        text3DElements.forEach(element => {
            element.style.transformStyle = 'preserve-3d';
            element.style.transition = 'transform 0.3s ease';

            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;

                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // Particle Text Effect
    setupParticleText() {
        const particleElements = document.querySelectorAll('.text-particles');

        particleElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            // Create particle container
            const container = document.createElement('div');
            container.style.position = 'relative';
            container.style.display = 'inline-block';
            element.appendChild(container);

            // Create particles for each character
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ') continue;

                const particle = document.createElement('span');
                particle.textContent = char;
                particle.style.position = 'relative';
                particle.style.display = 'inline-block';
                particle.style.transition = 'all 0.3s ease';

                // Random initial position
                particle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;

                container.appendChild(particle);

                // Animate particles
                setInterval(() => {
                    particle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
                }, 2000 + Math.random() * 1000);
            }
        });
    }

    // Wave Text Animation
    setupWaveText() {
        const waveElements = document.querySelectorAll('.text-wave');

        waveElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            for (let i = 0; i < text.length; i++) {
                const char = document.createElement('span');
                char.textContent = text[i];
                char.style.display = 'inline-block';
                char.style.animation = `wave 2s ease-in-out infinite`;
                char.style.animationDelay = `${i * 0.1}s`;
                element.appendChild(char);
            }
        });

        // Add wave keyframes if not exists
        if (!document.querySelector('#wave-keyframes')) {
            const style = document.createElement('style');
            style.id = 'wave-keyframes';
            style.textContent = `
                @keyframes wave {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Rainbow Color Cycling
    setupRainbowText() {
        const rainbowElements = document.querySelectorAll('.text-rainbow');

        rainbowElements.forEach(element => {
            const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];

            let colorIndex = 0;
            const text = element.textContent;
            element.innerHTML = '';

            for (let i = 0; i < text.length; i++) {
                const char = document.createElement('span');
                char.textContent = text[i];
                char.style.color = colors[(colorIndex + i) % colors.length];
                element.appendChild(char);
            }

            // Animate color cycling
            setInterval(() => {
                colorIndex = (colorIndex + 1) % colors.length;
                const chars = element.querySelectorAll('span');
                chars.forEach((char, i) => {
                    char.style.color = colors[(colorIndex + i) % colors.length];
                });
            }, 200);
        });
    }

    // Magnetic Text Effect
    setupMagneticText() {
        const magneticElements = document.querySelectorAll('.text-magnetic');

        magneticElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            for (let i = 0; i < text.length; i++) {
                const char = document.createElement('span');
                char.textContent = text[i];
                char.style.display = 'inline-block';
                char.style.transition = 'transform 0.3s ease';
                char.style.cursor = 'pointer';
                element.appendChild(char);

                char.addEventListener('mousemove', (e) => {
                    const rect = char.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const deltaX = e.clientX - centerX;
                    const deltaY = e.clientY - centerY;

                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    const maxDistance = 50;

                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance;
                        const moveX = deltaX * force * 0.3;
                        const moveY = deltaY * force * 0.3;

                        char.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    }
                });

                char.addEventListener('mouseleave', () => {
                    char.style.transform = 'translate(0px, 0px)';
                });
            }
        });
    }

    // Liquid Text Effect
    setupLiquidText() {
        const liquidElements = document.querySelectorAll('.text-liquid');

        liquidElements.forEach(element => {
            element.style.position = 'relative';
            element.style.overflow = 'hidden';

            // Create liquid effect with CSS and JS
            const liquidEffect = document.createElement('div');
            liquidEffect.style.position = 'absolute';
            liquidEffect.style.top = '0';
            liquidEffect.style.left = '0';
            liquidEffect.style.width = '100%';
            liquidEffect.style.height = '100%';
            liquidEffect.style.background = 'linear-gradient(45deg, #64b5f6, #1976d2, #ff6b6b)';
            liquidEffect.style.opacity = '0.1';
            liquidEffect.style.animation = 'liquidFlow 3s ease-in-out infinite';

            element.appendChild(liquidEffect);

            // Add liquid keyframes if not exists
            if (!document.querySelector('#liquid-keyframes')) {
                const style = document.createElement('style');
                style.id = 'liquid-keyframes';
                style.textContent = `
                    @keyframes liquidFlow {
                        0%, 100% { transform: translateX(-100%) skewX(-15deg); }
                        50% { transform: translateX(100%) skewX(15deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }

    // Fire Text Effect
    setupFireText() {
        const fireElements = document.querySelectorAll('.text-fire');

        fireElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            for (let i = 0; i < text.length; i++) {
                const char = document.createElement('span');
                char.textContent = text[i];
                char.style.display = 'inline-block';
                char.style.position = 'relative';

                // Create fire particles
                for (let j = 0; j < 5; j++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'absolute';
                    particle.style.width = '2px';
                    particle.style.height = '2px';
                    particle.style.background = `hsl(${20 + Math.random() * 20}, 100%, ${50 + Math.random() * 30}%)`;
                    particle.style.borderRadius = '50%';
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.bottom = '0';
                    particle.style.animation = `fireParticle ${1 + Math.random()}s ease-out infinite`;
                    particle.style.animationDelay = `${Math.random() * 2}s`;

                    char.appendChild(particle);
                }

                element.appendChild(char);
            }

            // Add fire particle keyframes if not exists
            if (!document.querySelector('#fire-keyframes')) {
                const style = document.createElement('style');
                style.id = 'fire-keyframes';
                style.textContent = `
                    @keyframes fireParticle {
                        0% {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                        100% {
                            opacity: 0;
                            transform: translateY(-20px) scale(0);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedTextEffects();
});

// Export for potential use in other scripts
window.AdvancedTextEffects = AdvancedTextEffects;
