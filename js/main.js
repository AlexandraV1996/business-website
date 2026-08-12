/**
 * Standalone Vanilla JS - Main Entrypoint Bootstrap
 */
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(7, 10, 18, 0.95)';
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.background = 'rgba(7, 10, 18, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  });

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
      });
    });
  }

  // FAQ Accordion Handler
  document.querySelectorAll('.faq-item').forEach(function(item) {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function(el) {
          el.classList.remove('active');
        });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  // Portfolio Category Filter Handler
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      document.querySelectorAll('.portfolio-card').forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Init Modules
  if (typeof initCalculator === 'function') initCalculator();
  if (typeof initAuditQuiz === 'function') initAuditQuiz();
  if (typeof initBookingSystem === 'function') initBookingSystem();
  if (typeof initMarketGame === 'function') initMarketGame();

  console.log('[Vanguard Platform] Standalone Vanilla Web Application loaded cleanly.');
});
