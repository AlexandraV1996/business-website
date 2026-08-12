/**
 * Standalone Vanilla JS - Booking Modal & Contact Module
 */
function initBookingSystem() {
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const openBookingBtns = [
    document.getElementById('openBookingNavBtn'),
    document.getElementById('openBookingMobileBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('calcBookBtn'),
    document.getElementById('auditBookBtn'),
    document.getElementById('gameBookConsultBtn')
  ];

  const modalBookingForm = document.getElementById('modalBookingForm');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');

  const serviceModal = document.getElementById('serviceModal');
  const closeServiceModal = document.getElementById('closeServiceModal');
  const serviceModalHeader = document.getElementById('serviceModalHeader');
  const serviceModalBody = document.getElementById('serviceModalBody');
  const serviceModalBookBtn = document.getElementById('serviceModalBookBtn');

  const serviceData = {
    strategy: {
      title: 'Corporate Strategy & M&A Advisory',
      icon: 'fa-chess-king',
      desc: 'Our Corporate Strategy team works side-by-side with CEOs and Boards to navigate transformative transactions, define 3-5 year growth milestones, and outmaneuver industry competitors.',
      points: [
        'Comprehensive market landscape & competitor vulnerability mapping.',
        'M&A target identification, valuation modeling, and synergy analysis.',
        'Post-merger integration (PMI) roadmaps to preserve equity value.',
        'Board of Directors quarterly strategic presentation decks.'
      ]
    },
    ops: {
      title: 'Revenue Operations & Scaling',
      icon: 'fa-gears',
      desc: 'Fix operational leaks and unlock hidden margins across your supply chain, RevOps funnel, and cross-functional teams.',
      points: [
        'End-to-end RevOps architecture linking Marketing, Sales, and Customer Success.',
        'Supply chain resilience auditing and margin optimization.',
        'Automated workflow implementation reducing overhead by 35%+.',
        'Key Performance Indicator (KPI) real-time dashboard deployment.'
      ]
    },
    digital: {
      title: 'Digital Transformation & AI',
      icon: 'fa-laptop-code',
      desc: 'Propel your business into the AI era with custom enterprise agent deployment, cloud modernizations, and secure data pipelines.',
      points: [
        'Bespoke AI agent integration for customer support & internal ops.',
        'Legacy infrastructure modernization to scalable cloud platforms.',
        'Enterprise data governance, compliance, and cybersecurity alignment.',
        'Digital workforce upskilling and executive tech training.'
      ]
    },
    financial: {
      title: 'Capital Structuring & Fractional CFO',
      icon: 'fa-coins',
      desc: 'Maximize capital efficiency, optimize debt-to-equity ratios, and prepare your organization for institutional capital raises.',
      points: [
        'Fractional CFO services for high-growth venture or PE backed companies.',
        'Financial modeling, unit economic auditing, and cash runway extension.',
        'Investor pitch deck architecture & term sheet negotiation support.',
        'Tax structuring and global multi-currency treasury strategy.'
      ]
    },
    expansion: {
      title: 'Global Market Expansion',
      icon: 'fa-earth-americas',
      desc: 'Scale into new international territories with strategic localized marketing, regulatory compliance, and cross-border channel partners.',
      points: [
        'Geographic market prioritization matrix (EMEA, APAC, Americas).',
        'In-country legal and regulatory compliance frameworks.',
        'Local talent acquisition & cross-cultural leadership alignment.',
        'International distribution channel partner setup.'
      ]
    },
    leadership: {
      title: 'Executive Leadership Advisory',
      icon: 'fa-user-group',
      desc: 'Empower your C-Suite and founders with 1-on-1 confidential executive coaching, leadership alignment, and change management.',
      points: [
        '1-on-1 confidential CEO & C-Suite mentorship.',
        'Executive alignment workshops to resolve strategic friction.',
        'Organizational design & talent succession planning.',
        'High-stakes crisis management and public relations strategy.'
      ]
    }
  };

  function showToast(message, icon) {
    if (!icon) icon = 'fa-circle-check';
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<i class="fa-solid ' + icon + ' text-gold"></i> <span>' + message + '</span>';
    container.appendChild(toast);

    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(function() { toast.remove(); }, 300);
    }, 4000);
  }

  function openBooking() {
    if (bookingModal) {
      bookingModal.style.display = 'flex';
      const dateInput = document.getElementById('modalDate');
      if (dateInput && !dateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
      }
    }
  }

  openBookingBtns.forEach(function(btn) {
    if (btn) btn.addEventListener('click', openBooking);
  });

  if (closeBookingModal) {
    closeBookingModal.addEventListener('click', function() {
      if (bookingModal) bookingModal.style.display = 'none';
    });
  }

  document.querySelectorAll('.service-learn-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const modalKey = btn.dataset.modal;
      const data = serviceData[modalKey];
      if (data && serviceModal) {
        serviceModalHeader.innerHTML = '<i class="fa-solid ' + data.icon + ' text-gold modal-icon"></i><h3>' + data.title + '</h3>';
        serviceModalBody.innerHTML = '<p style="color: var(--text-muted); margin-bottom: 1.2rem;">' + data.desc + '</p><h4 style="font-size: 1rem; margin-bottom: 0.8rem; color: var(--gold-400);">Key Advisory Deliverables:</h4><ul style="display: flex; flex-direction: column; gap: 0.6rem;">' + data.points.map(function(p) { return '<li><i class="fa-solid fa-check text-gold"></i> ' + p + '</li>'; }).join('') + '</ul>';
        serviceModal.style.display = 'flex';
      }
    });
  });

  if (closeServiceModal) {
    closeServiceModal.addEventListener('click', function() {
      if (serviceModal) serviceModal.style.display = 'none';
    });
  }

  if (serviceModalBookBtn) {
    serviceModalBookBtn.addEventListener('click', function() {
      if (serviceModal) serviceModal.style.display = 'none';
      openBooking();
    });
  }

  window.addEventListener('click', function(e) {
    if (e.target === bookingModal) bookingModal.style.display = 'none';
    if (e.target === serviceModal) serviceModal.style.display = 'none';
  });

  document.querySelectorAll('.select-tier-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tier = btn.dataset.tier;
      showToast('Selected Package: ' + tier + '. Opening consultation booking...');
      openBooking();
    });
  });

  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('modalName').value;
      const date = document.getElementById('modalDate').value;
      const time = document.getElementById('modalTime').value;

      showToast('Strategy Call Confirmed for ' + name + ' on ' + date + ' at ' + time + '! Check your inbox for confirmation.', 'fa-circle-check');
      modalBookingForm.reset();
      if (bookingModal) bookingModal.style.display = 'none';
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      showToast('Thank you ' + name + '! Your executive consultation inquiry has been routed to our senior partners.', 'fa-paper-plane');
      contactForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Subscribed! You will now receive monthly executive briefs.', 'fa-envelope');
      newsletterForm.reset();
    });
  }
}
