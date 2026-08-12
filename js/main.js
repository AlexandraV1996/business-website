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

  // Init Modules
  if (typeof initCalculator === 'function') initCalculator();
  if (typeof initAuditQuiz === 'function') initAuditQuiz();
  if (typeof initBookingSystem === 'function') initBookingSystem();
  if (typeof initMarketGame === 'function') initMarketGame();

  console.log('[Vanguard Platform] Standalone Vanilla Web Application loaded cleanly.');
});
