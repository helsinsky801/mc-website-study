// Animasi Keren untuk Halaman Quiz MKG Capital Group
// Dibuat dengan JavaScript modern dan efek visual yang menarik

class QuizAnimations {
  constructor() {
    this.questions = [];
    this.options = [];
    this.submitBtn = null;
    this.currentQuestionIndex = 0;
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.questions = Array.from(document.querySelectorAll('.question'));
    this.options = Array.from(document.querySelectorAll('label'));
    this.submitBtn = document.querySelector('.quiz-form button[type="submit"]');

    if (this.questions.length > 0) {
      this.setupPageLoadAnimations();
      this.setupInteractiveAnimations();
      this.setupSubmitAnimation();
      this.createParticleSystem();
    }
  }

  // Animasi saat halaman dimuat
  setupPageLoadAnimations() {
    // Animasi judul halaman dengan efek typewriter
    const title = document.querySelector('h2');
    if (title) {
      this.animateTypewriter(title);
    }

    // Animasi bertahap untuk setiap pertanyaan
    this.questions.forEach((question, index) => {
      question.style.opacity = '0';
      question.style.transform = 'translateX(-50px) scale(0.95)';
      question.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

      setTimeout(() => {
        question.style.opacity = '1';
        question.style.transform = 'translateX(0) scale(1)';
        // Animasi text pertanyaan
        this.animateQuestionText(question);
      }, 400 + (index * 200));
    });

    // Animasi untuk opsi jawaban
    this.options.forEach((option, index) => {
      option.style.opacity = '0';
      option.style.transform = 'translateY(20px)';
      option.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

      setTimeout(() => {
        option.style.opacity = '1';
        option.style.transform = 'translateY(0)';
        // Animasi text opsi
        this.animateOptionText(option);
      }, 800 + (index * 100));
    });

    // Animasi tombol submit
    if (this.submitBtn) {
      this.submitBtn.style.opacity = '0';
      this.submitBtn.style.transform = 'scale(0.8)';
      this.submitBtn.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

      setTimeout(() => {
        this.submitBtn.style.opacity = '1';
        this.submitBtn.style.transform = 'scale(1)';
        this.animateButtonText(this.submitBtn);
      }, 1200 + (this.options.length * 100));
    }

    // Tambahkan animasi text berjalan
    this.createRunningText();
  }

  // Animasi interaktif
  setupInteractiveAnimations() {
    // Hover effect untuk pertanyaan
    this.questions.forEach(question => {
      question.addEventListener('mouseenter', () => {
        if (!this.isAnimating) {
          question.style.transform = 'translateY(-5px) scale(1.02)';
          question.style.boxShadow = '0 15px 30px rgba(100, 181, 246, 0.3)';
          question.style.borderColor = 'rgba(100, 181, 246, 0.5)';
        }
      });

      question.addEventListener('mouseleave', () => {
        if (!this.isAnimating) {
          question.style.transform = 'translateY(0) scale(1)';
          question.style.boxShadow = '';
          question.style.borderColor = '';
        }
      });
    });

    // Hover effect untuk opsi jawaban
    this.options.forEach(option => {
      option.addEventListener('mouseenter', () => {
        if (!this.isAnimating) {
          option.style.transform = 'translateX(10px) scale(1.02)';
          option.style.background = 'rgba(100, 181, 246, 0.15)';
          option.style.borderColor = 'rgba(100, 181, 246, 0.3)';
        }
      });

      option.addEventListener('mouseleave', () => {
        if (!this.isAnimating) {
          option.style.transform = 'translateX(0) scale(1)';
          option.style.background = '';
          option.style.borderColor = '';
        }
      });
    });

    // Animasi saat memilih jawaban
    this.options.forEach(option => {
      const radio = option.querySelector('input[type="radio"]');
      if (radio) {
        radio.addEventListener('change', () => {
          this.animateSelection(option);
        });
      }
    });
  }

  // Animasi pemilihan jawaban
  animateSelection(selectedOption) {
    this.isAnimating = true;

    // Reset semua opsi
    this.options.forEach(option => {
      option.style.transform = 'scale(1)';
      option.style.background = '';
      option.style.borderColor = '';
      option.style.boxShadow = '';
    });

    // Animasi opsi yang dipilih
    selectedOption.style.transform = 'scale(1.05)';
    selectedOption.style.background = 'rgba(25, 118, 210, 0.2)';
    selectedOption.style.borderColor = '#1976d2';
    selectedOption.style.boxShadow = '0 8px 20px rgba(25, 118, 210, 0.4)';

    // Efek ripple
    this.createRippleEffect(selectedOption);

    // Efek partikel kecil
    this.createSelectionParticles(selectedOption);

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  // Efek ripple saat klik
  createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(100, 181, 246, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Partikel saat memilih jawaban
  createSelectionParticles(element) {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = '#64b5f6';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '10';

      const rect = element.getBoundingClientRect();
      particle.style.left = (rect.left + rect.width / 2) + 'px';
      particle.style.top = (rect.top + rect.height / 2) + 'px';

      document.body.appendChild(particle);

      // Animasi partikel
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      const duration = 800 + Math.random() * 400;

      particle.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });

      setTimeout(() => {
        particle.remove();
      }, duration);
    }
  }

  // Animasi tombol submit
  setupSubmitAnimation() {
    if (!this.submitBtn) return;

    this.submitBtn.addEventListener('mouseenter', () => {
      this.submitBtn.style.transform = 'scale(1.05) translateY(-2px)';
      this.submitBtn.style.boxShadow = '0 10px 25px rgba(25, 118, 210, 0.4)';
    });

    this.submitBtn.addEventListener('mouseleave', () => {
      this.submitBtn.style.transform = 'scale(1) translateY(0)';
      this.submitBtn.style.boxShadow = '';
    });

    this.submitBtn.addEventListener('click', () => {
      this.animateSubmit();
    });
  }

  // Animasi saat submit
  animateSubmit() {
    this.isAnimating = true;
    this.submitBtn.disabled = true;

    // Animasi loading
    this.submitBtn.innerHTML = '<span class="loading-spinner"></span> Memproses...';
    this.submitBtn.style.transform = 'scale(0.95)';

    // Simulasi pemrosesan
    setTimeout(() => {
      this.submitBtn.innerHTML = '✓ Berhasil!';
      this.submitBtn.style.background = 'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)';
      this.submitBtn.style.transform = 'scale(1)';

      // Efek confetti
      this.createConfetti();

      setTimeout(() => {
        this.submitBtn.innerHTML = 'Kirim Jawaban';
        this.submitBtn.style.background = '';
        this.submitBtn.disabled = false;
        this.isAnimating = false;
      }, 2000);
    }, 1500);
  }

  // Sistem partikel latar belakang
  createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'quiz-particles';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    particleContainer.style.overflow = 'hidden';

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.background = 'rgba(100, 181, 246, 0.3)';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 5 + 's';

      particleContainer.appendChild(particle);
    }

    document.body.appendChild(particleContainer);
  }

  // Efek confetti saat berhasil
  createConfetti() {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.background = this.getRandomColor();
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';

      document.body.appendChild(confetti);

      const duration = 2000 + Math.random() * 2000;
      const rotation = Math.random() * 720;

      confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 20}px) rotate(${rotation}deg)`, opacity: 0 }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });

      setTimeout(() => {
        confetti.remove();
      }, duration);
    }
  }

  // Warna acak untuk confetti
  getRandomColor() {
    const colors = ['#64b5f6', '#1976d2', '#2ed573', '#ff6b6b', '#ff9800', '#9c27b0'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Animasi Typewriter untuk judul
  animateTypewriter(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        // Tambahkan efek glow setelah selesai
        element.style.textShadow = '0 0 10px rgba(100, 181, 246, 0.5)';
        setTimeout(() => {
          element.style.textShadow = '';
        }, 1000);
      }
    }, 100);
  }

  // Animasi text pertanyaan dengan efek fade-in per karakter
  animateQuestionText(questionElement) {
    const paragraph = questionElement.querySelector('p');
    if (!paragraph) return;

    const text = paragraph.textContent;
    paragraph.innerHTML = '';

    // Buat span untuk setiap karakter
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(10px)';
      span.style.transition = `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s`;
      paragraph.appendChild(span);
    }

    // Trigger animasi
    setTimeout(() => {
      const spans = paragraph.querySelectorAll('span');
      spans.forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }, 100);
  }

  // Animasi text opsi jawaban
  animateOptionText(optionElement) {
    const text = optionElement.textContent;
    if (!text || text.length < 10) return; // Skip untuk text pendek

    optionElement.style.position = 'relative';
    optionElement.style.overflow = 'hidden';

    // Efek sliding text
    optionElement.animate([
      { transform: 'translateX(-10px)', opacity: 0.7 },
      { transform: 'translateX(0)', opacity: 1 }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards'
    });
  }

  // Animasi text tombol
  animateButtonText(buttonElement) {
    const text = buttonElement.textContent;
    buttonElement.innerHTML = '';

    // Buat span untuk setiap karakter
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.display = 'inline-block';
      span.style.transform = 'scale(0) rotate(45deg)';
      span.style.opacity = '0';
      span.style.transition = `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${i * 0.1}s`;
      buttonElement.appendChild(span);
    }

    // Trigger animasi
    setTimeout(() => {
      const spans = buttonElement.querySelectorAll('span');
      spans.forEach(span => {
        span.style.transform = 'scale(1) rotate(0deg)';
        span.style.opacity = '1';
      });
    }, 100);
  }

  // Animasi text berjalan (marquee)
  createRunningText() {
    const runningText = document.createElement('div');
    runningText.className = 'running-text';
    runningText.innerHTML = `
      <div class="running-text-content">
        🎯 Selamat Mengerjakan Quiz MKG Capital Group 🎯
        📚 Tingkatkan Pengetahuan Trading Anda 📚
        💡 Jawab dengan Teliti dan Benar 💡
        🏆 Raih Skor Tertinggi 🏆
        🚀 Sukses di Dunia Trading 🚀
      </div>
    `;

    runningText.style.cssText = `
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, rgba(25, 118, 210, 0.9), rgba(100, 181, 246, 0.9));
      color: white;
      padding: 8px 0;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    `;

    const content = runningText.querySelector('.running-text-content');
    content.style.cssText = `
      display: inline-block;
      white-space: nowrap;
      animation: marquee 20s linear infinite;
      padding-left: 100%;
    `;

    document.body.insertBefore(runningText, document.body.firstChild);

    // Tambahkan animasi close button
    setTimeout(() => {
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = `
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0 8px;
        border-radius: 50%;
        transition: all 0.3s ease;
      `;

      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.4)';
        closeBtn.style.transform = 'translateY(-50%) scale(1.2)';
      });

      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'translateY(-50%) scale(1)';
      });

      closeBtn.addEventListener('click', () => {
        runningText.style.animation = 'slideUp 0.5s ease-out forwards';
        setTimeout(() => runningText.remove(), 500);
      });

      runningText.appendChild(closeBtn);
    }, 3000);
  }

  // Animasi text feedback saat submit
  animateFeedbackText(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `feedback-text ${type}`;
    feedback.textContent = message;

    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${type === 'success' ? 'linear-gradient(135deg, #2ed573, #1e90ff)' : 'linear-gradient(135deg, #ff6b6b, #ff9800)'};
      color: white;
      padding: 20px 40px;
      border-radius: 15px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      animation: feedbackPopup 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    document.body.appendChild(feedback);

    // Animasi text per karakter
    const text = feedback.textContent;
    feedback.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.display = 'inline-block';
      span.style.transform = 'scale(0) rotate(-45deg)';
      span.style.opacity = '0';
      span.style.transition = `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${i * 0.05}s`;
      feedback.appendChild(span);
    }

    setTimeout(() => {
      const spans = feedback.querySelectorAll('span');
      spans.forEach(span => {
        span.style.transform = 'scale(1) rotate(0deg)';
        span.style.opacity = '1';
      });
    }, 100);

    // Auto remove
    setTimeout(() => {
      feedback.style.animation = 'feedbackFadeOut 0.5s ease-out forwards';
      setTimeout(() => feedback.remove(), 500);
    }, 3000);
  }
}

// Inisialisasi animasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  new QuizAnimations();
});

// CSS untuk animasi tambahan
const additionalStyles = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes floatParticle {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes slideUp {
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes feedbackPopup {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes feedbackFadeOut {
  to {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
}

.running-text {
  animation: slideDown 0.8s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.question p span {
  animation: textGlow 2s ease-in-out infinite alternate;
}

@keyframes textGlow {
  from {
    text-shadow: 0 0 5px rgba(100, 181, 246, 0.3);
  }
  to {
    text-shadow: 0 0 15px rgba(100, 181, 246, 0.8), 0 0 25px rgba(100, 181, 246, 0.4);
  }
}

label span {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

label:hover span {
  color: #1976d2;
  font-weight: bold;
}

.quiz-form button span {
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.quiz-form button:hover span {
  transform: translateY(-2px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
`;

// Tambahkan CSS ke head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
