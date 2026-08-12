/**
 * Standalone Vanilla JS - Growth ROI Calculator Module
 */
function initCalculator() {
  const revInput = document.getElementById('annualRevenue');
  const growthInput = document.getElementById('growthRate');
  const teamInput = document.getElementById('teamSize');
  const industrySelect = document.getElementById('industrySelect');

  const revValLabel = document.getElementById('revVal');
  const growthValLabel = document.getElementById('growthVal');
  const teamValLabel = document.getElementById('teamVal');

  const projectedRevenueEl = document.getElementById('projectedRevenue');
  const projectedSavingsEl = document.getElementById('projectedSavings');
  const projectedEfficiencyEl = document.getElementById('projectedEfficiency');
  const projectedROIElements = document.getElementById('projectedROI');
  const recProgramTextEl = document.getElementById('recProgramText');

  if (!revInput || !projectedRevenueEl) return;

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  }

  function calculate() {
    const rev = parseFloat(revInput.value);
    const growth = parseFloat(growthInput.value);
    const team = parseInt(teamInput.value, 10);
    const industry = industrySelect.value;

    let industryMult = 1.0;
    if (industry === 'tech') industryMult = 1.35;
    else if (industry === 'finance') industryMult = 1.25;
    else if (industry === 'health') industryMult = 1.15;
    else if (industry === 'retail') industryMult = 1.10;

    const additionalARR = rev * (0.18 + (growth > 0 ? growth / 200 : 0.05)) * industryMult;
    const annualSavings = (team * 4500) + (rev * 0.03);
    const efficiencyBoost = Math.min(65, Math.round(25 + (team / 8) + (industryMult * 5)));
    const estimatedROI = (Math.round(((additionalARR + annualSavings) / 125000) * 10) / 10).toFixed(1);

    revValLabel.textContent = formatCurrency(rev);
    growthValLabel.textContent = growth + '%';
    teamValLabel.textContent = team + ' Members';

    projectedRevenueEl.textContent = '+' + formatCurrency(additionalARR);
    projectedSavingsEl.textContent = formatCurrency(annualSavings);
    projectedEfficiencyEl.textContent = '+' + efficiencyBoost + '%';
    projectedROIElements.textContent = estimatedROI + 'x';

    if (rev >= 25000000 || team >= 150) {
      recProgramTextEl.textContent = 'Enterprise Transformation & Global Scale Retainer (12-Month)';
    } else if (rev >= 5000000 || team >= 40) {
      recProgramTextEl.textContent = 'Strategic Revenue Acceleration & Digital AI Suite (6-12 Month)';
    } else {
      recProgramTextEl.textContent = 'Growth Sprint & Revenue Optimization Sprint (3-6 Month)';
    }
  }

  [revInput, growthInput, teamInput].forEach(function(input) {
    input.addEventListener('input', calculate);
  });
  industrySelect.addEventListener('change', calculate);

  calculate();
}
