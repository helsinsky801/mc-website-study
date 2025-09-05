// Fungsi popup
function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// Tutup popup saat klik diluar popup-content
function outsideClickPopup(event) {
  if (event.target.classList.contains('popup')) {
    event.target.style.display = 'none';
  }
}

// Progress tracking
const modules = [
  { id: 1, title: 'Dasar Trading', page: 'belajar-1.html' },
  { id: 2, title: 'Analisis Teknikal', page: 'belajar-2.html' },
  { id: 3, title: 'Manajemen Risiko', page: 'belajar-3.html' },
  { id: 4, title: 'Strategi Trading', page: 'belajar-4.html' },
  { id: 5, title: 'Psikologi Trading', page: 'belajar-5.html' },
  { id: 6, title: 'Tools & Platform', page: 'belajar-6.html' },
  { id: 7, title: 'Kasus Studi', page: 'belajar-7.html' },
  { id: 8, title: 'Lanjutan', page: 'belajar-8.html' },
];

function getCurrentModule() {
  const path = window.location.pathname;
  const page = path.split('/').pop();
  return modules.find(m => m.page === page);
}

function getProgress() {
  const progress = localStorage.getItem('mkg_progress') || '{}';
  return JSON.parse(progress);
}

function saveProgress(progress) {
  localStorage.setItem('mkg_progress', JSON.stringify(progress));
}

function renderProgress() {
  const currentModule = getCurrentModule();
  if (!currentModule) return;
  const progress = getProgress();
  const completedModules = Object.keys(progress).filter(id => progress[id]).length;
  const totalModules = modules.length;
  const percentage = (completedModules / totalModules) * 100;

  // Find the progress container
  const container = document.querySelector('.progress-container');
  if (!container) return;

  // Update percentage
  const percentageEl = container.querySelector('.progress-percentage');
  if (percentageEl) percentageEl.textContent = `${percentage.toFixed(1)}%`;

  // Update progress bar
  const fillEl = container.querySelector('.progress-fill');
  if (fillEl) fillEl.style.width = `${percentage}%`;

  // Update steps
  const stepsEl = container.querySelector('.progress-steps');
  if (stepsEl) {
    stepsEl.innerHTML = '';
    modules.forEach(module => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'step';
      if (progress[module.id]) {
        stepDiv.classList.add('completed');
      } else if (module.id === currentModule.id) {
        stepDiv.classList.add('current');
      }
      stepDiv.innerHTML = `
        <div class="step-circle" onclick="window.location.href='${module.page}'">${module.id}</div>
        <div class="step-label">${module.title}</div>
      `;
      stepsEl.appendChild(stepDiv);
    });
  }
}

  // Bot account functions
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateAccounts(num = 5) {
  const accounts = [];
  for (let i = 0; i < num; i++) {
    const username = 'bot' + generateRandomString(5);
    const email = username + '@example.com';
    const password = generateRandomString(8);
    accounts.push({ username, email, password });
  }
  return accounts;
}

function displayAccounts(accounts) {
  const list = document.getElementById('accounts-list');
  if (!list) return;
  list.innerHTML = '';
  accounts.forEach(account => {
    const card = document.createElement('div');
    card.className = 'account-card card-3d glass-card hover-lift';
    card.innerHTML = `
      <h3>${account.username}</h3>
      <p>Email: ${account.email}</p>
      <p>Password: ${account.password}</p>
    `;
    list.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Popup anggota grup
  const openMembersBtn = document.getElementById('open-popup-members');
  const popupMembers = document.getElementById('popup-members');
  const closeMembersBtn = document.getElementById('close-popup-members');

  if(openMembersBtn && popupMembers && closeMembersBtn){
    openMembersBtn.addEventListener('click', e => {
      e.preventDefault();
      openPopup('popup-members');
    });
    closeMembersBtn.addEventListener('click', () => closePopup('popup-members'));
    popupMembers.addEventListener('click', outsideClickPopup);
  }

  // Popup materi pembelajaran — bisa ada tombol yang sama di halaman lain
  const openLearningBtn = document.getElementById('open-popup-learning');
  const popupLearning = document.getElementById('popup-learning');
  const closeLearningBtn = document.getElementById('close-popup-learning');

  if(openLearningBtn && popupLearning && closeLearningBtn){
    openLearningBtn.addEventListener('click', () => openPopup('popup-learning'));
    closeLearningBtn.addEventListener('click', () => closePopup('popup-learning'));
    popupLearning.addEventListener('click', outsideClickPopup);
  }

  // Popup quiz
  const openQuizBtn = document.getElementById('open-popup-quiz');
  const popupQuiz = document.getElementById('popup-quiz');
  const closeQuizBtn = document.getElementById('close-popup-quiz');

  if(openQuizBtn && popupQuiz && closeQuizBtn){
    openQuizBtn.addEventListener('click', () => openPopup('popup-quiz'));
    closeQuizBtn.addEventListener('click', () => closePopup('popup-quiz'));
    popupQuiz.addEventListener('click', outsideClickPopup);
  }

  // Quiz simple handler
  const quizForms = document.querySelectorAll('.quiz-form');
  quizForms.forEach(form => {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      let correct = 0;
      const questions = form.querySelectorAll('.question');
      questions.forEach(q => {
        const chosen = q.querySelector('input[type="radio"]:checked');
        if(chosen && chosen.dataset.correct === "true"){
          correct++;
        }
      });
      alert(`Jawaban benar: ${correct} dari ${questions.length}`);
      if (correct >= 7) {
        const currentModule = getCurrentModule();
        if (currentModule) {
          const progress = getProgress();
          progress[currentModule.id] = true;
          saveProgress(progress);
          renderProgress();
          alert('Selamat! Modul ini telah diselesaikan.');
        }
      }
    });
  });

  // Member buttons functionality
  const memberButtons = document.querySelectorAll('.member-btn');
  memberButtons.forEach(button => {
    button.addEventListener('click', () => {
      const memberName = button.getAttribute('data-member');
      alert(`Anggota Grup: ${memberName}`);
    });
  });

  // Popup login
  const openLoginBtn = document.getElementById('open-login-popup');
  const popupLogin = document.getElementById('popup-login');
  const closeLoginBtn = document.getElementById('close-popup-login');

  if(openLoginBtn && popupLogin && closeLoginBtn){
    openLoginBtn.addEventListener('click', e => {
      e.preventDefault();
      openPopup('popup-login');
    });
    closeLoginBtn.addEventListener('click', () => closePopup('popup-login'));
    popupLogin.addEventListener('click', outsideClickPopup);
  }

  // Popup register
  const popupRegister = document.getElementById('popup-register');
  const closeRegisterBtn = document.getElementById('close-popup-register');

  if(popupRegister && closeRegisterBtn){
    closeRegisterBtn.addEventListener('click', () => closePopup('popup-register'));
    popupRegister.addEventListener('click', outsideClickPopup);
  }

  // Switch between login and register
  const switchToRegister = document.getElementById('switch-to-register');
  const switchToLogin = document.getElementById('switch-to-login');

  if(switchToRegister && popupLogin && popupRegister){
    switchToRegister.addEventListener('click', e => {
      e.preventDefault();
      closePopup('popup-login');
      openPopup('popup-register');
    });
  }

  if(switchToLogin && popupRegister && popupLogin){
    switchToLogin.addEventListener('click', e => {
      e.preventDefault();
      closePopup('popup-register');
      openPopup('popup-login');
    });
  }

  // Render progress on page load
  renderProgress();

  // Bot accounts
  displayAccounts(generateAccounts());
  document.getElementById('generate-btn').addEventListener('click', () => {
    displayAccounts(generateAccounts());
  });
});
