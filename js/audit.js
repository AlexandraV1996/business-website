/**
 * Standalone Vanilla JS - Business Readiness Audit Quiz Module
 */
function initAuditQuiz() {
  const steps = document.querySelectorAll('.quiz-step');
  const progressBar = document.getElementById('auditProgress');
  const resultScreen = document.getElementById('quizResult');
  const scoreNumEl = document.getElementById('auditScoreNum');
  const auditBadgeEl = document.getElementById('auditBadge');
  const auditTitleEl = document.getElementById('auditTitle');
  const auditDescEl = document.getElementById('auditDesc');
  const resetBtn = document.getElementById('auditResetBtn');

  if (!steps.length) return;

  let currentStep = 1;
  let totalScore = 0;
  const maxScore = 20;

  function updateQuiz() {
    steps.forEach(function(step) {
      const stepNum = parseInt(step.dataset.step, 10);
      if (stepNum === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    if (currentStep <= 4) {
      const percentage = (currentStep / 4) * 100;
      if (progressBar) progressBar.style.width = percentage + '%';
    }
  }

  function handleOptionClick(score) {
    totalScore += score;
    if (currentStep < 4) {
      currentStep++;
      updateQuiz();
    } else {
      showResults();
    }
  }

  function showResults() {
    steps.forEach(function(step) { step.classList.remove('active'); });
    if (progressBar) progressBar.style.width = '100%';
    if (resultScreen) resultScreen.style.display = 'block';

    const normalizedScore = Math.round((totalScore / maxScore) * 100);

    let startVal = 0;
    const interval = setInterval(function() {
      startVal += 2;
      if (startVal >= normalizedScore) {
        startVal = normalizedScore;
        clearInterval(interval);
      }
      if (scoreNumEl) scoreNumEl.textContent = startVal;
    }, 20);

    if (normalizedScore >= 80) {
      if (auditBadgeEl) auditBadgeEl.textContent = 'HIGH SCALE READINESS';
      if (auditTitleEl) auditTitleEl.textContent = 'Prime Candidate for High-Velocity Growth';
      if (auditDescEl) auditDescEl.textContent = 'Your business demonstrates strong strategic alignment and unit economics. Partnering with Vanguard can help you capitalize on M&A or international expansion.';
    } else if (normalizedScore >= 50) {
      if (auditBadgeEl) auditBadgeEl.textContent = 'MODERATE OPERATIONAL BOTTLENECKS';
      if (auditTitleEl) auditTitleEl.textContent = 'Substantial Opportunity for RevOps & AI Optimization';
      if (auditDescEl) auditDescEl.textContent = 'You have foundational revenue, but internal workflows and financial margins need strategic tuning to prevent scaling friction.';
    } else {
      if (auditBadgeEl) auditBadgeEl.textContent = 'HIGH RISK EXPOSURE';
      if (auditTitleEl) auditTitleEl.textContent = 'Urgent Strategic Alignment Required';
      if (auditDescEl) auditDescEl.textContent = 'Current operational bottlenecks and margin pressures pose severe risks to cash runway. Immediate C-suite advisory is recommended.';
    }
  }

  steps.forEach(function(step) {
    const buttons = step.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const score = parseInt(btn.dataset.score, 10);
        handleOptionClick(score);
      });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      currentStep = 1;
      totalScore = 0;
      if (resultScreen) resultScreen.style.display = 'none';
      updateQuiz();
    });
  }

  updateQuiz();
}
