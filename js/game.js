/**
 * Standalone Vanilla JS - Arcade Market Growth Runner Game
 */
function initMarketGame() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const startOverlay = document.getElementById('gameStartOverlay');
  const gameOverOverlay = document.getElementById('gameOverOverlay');
  const startBtn = document.getElementById('startGameBtn');
  const restartBtn = document.getElementById('restartGameBtn');
  const scoreValEl = document.getElementById('gameScore');
  const marketShareEl = document.getElementById('gameMarketShare');
  const assetsCountEl = document.getElementById('gameAssetsCount');
  const highScoreEl = document.getElementById('gameHighScore');
  const gameOverReasonEl = document.getElementById('gameOverReason');
  const finalScoreValEl = document.getElementById('finalScoreVal');
  const finalHighScoreValEl = document.getElementById('finalHighScoreVal');
  const consultingTipEl = document.getElementById('consultingTip');

  const muteBtn = document.getElementById('gameMuteBtn');
  const soundIcon = document.getElementById('gameSoundIcon');
  const pauseBtn = document.getElementById('gamePauseBtn');
  const pauseIcon = document.getElementById('gamePauseIcon');
  const mobileJumpBtn = document.getElementById('mobileJumpBtn');

  let audioCtx = null;
  let isMuted = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'collect') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'shield') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(800, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {}
  }

  const GROUND_Y = canvas.height - 50;
  let isRunning = false;
  let isPaused = false;

  let score = 0;
  let assetsCollected = 0;
  let marketShare = 10;
  let highScore = parseInt(localStorage.getItem('vanguard_runner_highscore') || '0', 10);

  let gameSpeed = 5.5;
  let frameCount = 0;

  const player = {
    x: 90,
    y: GROUND_Y - 45,
    width: 45,
    height: 45,
    vy: 0,
    gravity: 0.65,
    jumpPower: -12.5,
    isGrounded: true,
    jumpCount: 0,
    maxJumps: 2,
    hasShield: false,
    shieldTimer: 0,
    rotation: 0
  };

  let obstacles = [];
  let collectibles = [];
  let particles = [];
  let clouds = [];

  const obstacleTypes = [
    { type: 'Recession', name: 'Market Recession', color: '#ef4444', icon: '📉', tip: 'Vanguard helps restructure revenue models to stay profitable during economic contractions.' },
    { type: 'RedTape', name: 'Regulatory Red Tape', color: '#f97316', icon: '🚧', tip: 'Compliance automation and early risk assessment eliminate costly regulatory delays.' },
    { type: 'Churn', name: 'Customer Churn', color: '#e11d48', icon: '🔥', tip: 'Optimizing RevOps and customer success architecture dramatically boosts retention.' },
    { type: 'Inflation', name: 'Inflation Spike', color: '#dc2626', icon: '⚡', tip: 'Strategic pricing models & supply chain efficiency protect profit margins against inflation.' }
  ];

  const itemTypes = [
    { name: 'Seed Capital ($)', points: 250000, color: '#fbbf24', symbol: '$' },
    { name: 'Top Talent', points: 150000, color: '#38bdf8', symbol: '★' },
    { name: 'Strategic Partnership', points: 500000, color: '#c084fc', symbol: '◆' },
    { name: 'Innovation Shield', points: 100000, color: '#34d399', symbol: '🛡', isShield: true }
  ];

  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: Math.random() * canvas.width,
      y: 20 + Math.random() * 100,
      width: 60 + Math.random() * 80,
      speed: 0.5 + Math.random() * 0.8
    });
  }

  function formatCurrency(num) {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(2) + 'M';
    return '$' + (num / 1000).toFixed(0) + 'K';
  }

  function updateHighScoreDisplay() {
    if (highScoreEl) highScoreEl.textContent = formatCurrency(highScore);
  }
  updateHighScoreDisplay();

  function resetGame() {
    score = 0;
    assetsCollected = 0;
    marketShare = 10;
    gameSpeed = 5.5;
    frameCount = 0;

    player.y = GROUND_Y - player.height;
    player.vy = 0;
    player.isGrounded = true;
    player.jumpCount = 0;
    player.hasShield = false;
    player.shieldTimer = 0;
    player.rotation = 0;

    obstacles = [];
    collectibles = [];
    particles = [];

    if (scoreValEl) scoreValEl.textContent = '$0';
    if (marketShareEl) marketShareEl.textContent = '10%';
    if (assetsCountEl) assetsCountEl.textContent = '0';
  }

  function doJump() {
    if (!isRunning || isPaused) return;

    if (player.jumpCount < player.maxJumps) {
      initAudio();
      player.vy = player.jumpPower;
      player.isGrounded = false;
      player.jumpCount++;
      playSound('jump');

      for (let i = 0; i < 8; i++) {
        particles.push({
          x: player.x + player.width / 2,
          y: player.y + player.height,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2 + 1,
          radius: Math.random() * 4 + 2,
          color: '#f59e0b',
          life: 20
        });
      }
    }
  }

  function update() {
    frameCount++;

    if (frameCount % 400 === 0 && gameSpeed < 12) {
      gameSpeed += 0.4;
    }

    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y >= GROUND_Y - player.height) {
      player.y = GROUND_Y - player.height;
      player.vy = 0;
      player.isGrounded = true;
      player.jumpCount = 0;
      player.rotation = 0;
    } else {
      player.rotation = Math.min(Math.PI / 4, player.vy * 0.05);
    }

    if (player.hasShield) {
      player.shieldTimer--;
      if (player.shieldTimer <= 0) {
        player.hasShield = false;
      }
    }

    score += Math.round(gameSpeed * 150);
    marketShare = Math.min(99, 10 + Math.floor(score / 500000));

    if (scoreValEl) scoreValEl.textContent = formatCurrency(score);
    if (marketShareEl) marketShareEl.textContent = marketShare + '%';

    if (frameCount % Math.max(70, Math.floor(130 - gameSpeed * 5)) === 0) {
      const template = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      const obsWidth = 38 + Math.random() * 14;
      const obsHeight = 42 + Math.random() * 25;
      obstacles.push(Object.assign({
        x: canvas.width + 20,
        y: GROUND_Y - obsHeight,
        width: obsWidth,
        height: obsHeight
      }, template));
    }

    if (frameCount % 160 === 0 && Math.random() > 0.3) {
      const item = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      const flyY = GROUND_Y - (70 + Math.random() * 110);
      collectibles.push(Object.assign({
        x: canvas.width + 30,
        y: flyY,
        width: 30,
        height: 30,
        bob: Math.random() * Math.PI
      }, item));
    }

    clouds.forEach(function(c) {
      c.x -= c.speed;
      if (c.x + c.width < 0) {
        c.x = canvas.width + Math.random() * 50;
      }
    });

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x -= gameSpeed;

      const pad = 6;
      if (
        player.x + pad < obs.x + obs.width - pad &&
        player.x + player.width - pad > obs.x + pad &&
        player.y + pad < obs.y + obs.height - pad &&
        player.y + player.height - pad > obs.y + pad
      ) {
        if (player.hasShield) {
          player.hasShield = false;
          playSound('hit');
          obstacles.splice(i, 1);
          for (let p = 0; p < 15; p++) {
            particles.push({
              x: obs.x + obs.width / 2,
              y: obs.y + obs.height / 2,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              radius: Math.random() * 5 + 2,
              color: obs.color,
              life: 30
            });
          }
        } else {
          handleGameOver(obs);
          return;
        }
      }

      if (obs.x + obs.width < -50) {
        obstacles.splice(i, 1);
      }
    }

    for (let i = collectibles.length - 1; i >= 0; i--) {
      const col = collectibles[i];
      col.x -= gameSpeed;
      col.bob += 0.08;
      const currentY = col.y + Math.sin(col.bob) * 6;

      if (
        player.x < col.x + col.width &&
        player.x + player.width > col.x &&
        player.y < currentY + col.height &&
        player.y + player.height > currentY
      ) {
        score += col.points;
        assetsCollected++;
        if (assetsCountEl) assetsCountEl.textContent = assetsCollected;

        if (col.isShield) {
          player.hasShield = true;
          player.shieldTimer = 300;
          playSound('shield');
        } else {
          playSound('collect');
        }

        for (let p = 0; p < 12; p++) {
          particles.push({
            x: col.x + col.width / 2,
            y: currentY + col.height / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            radius: Math.random() * 4 + 2,
            color: col.color,
            life: 25
          });
        }

        collectibles.splice(i, 1);
        continue;
      }

      if (col.x + col.width < -50) {
        collectibles.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function draw() {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    clouds.forEach(function(c) {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(c.x, c.y, c.width, 18, 10);
      else ctx.rect(c.x, c.y, c.width, 18);
      ctx.fill();
    });

    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(canvas.width, GROUND_Y);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridOffset = (frameCount * gameSpeed) % 40;
    for (let x = -gridOffset; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y);
      ctx.lineTo(x - 20, canvas.height);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.rotate(player.rotation);

    if (isRunning && !isPaused) {
      ctx.fillStyle = (frameCount % 6 < 3) ? '#f59e0b' : '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-player.width / 2 + 5, 5);
      ctx.lineTo(-player.width / 2 - 15 - Math.random() * 6, 0);
      ctx.lineTo(-player.width / 2 + 5, -5);
      ctx.fill();
    }

    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(-player.width / 2, -player.height / 2, player.width, player.height, 10);
    else ctx.rect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = '22px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🚀', 0, 0);

    if (player.hasShield) {
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, player.width / 2 + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.restore();

    obstacles.forEach(function(obs) {
      ctx.fillStyle = obs.color;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 6);
      else ctx.rect(obs.x, obs.y, obs.width, obs.height);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.stroke();

      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(obs.icon, obs.x + obs.width / 2, obs.y + obs.height / 2 + 5);
    });

    collectibles.forEach(function(col) {
      const currentY = col.y + Math.sin(col.bob) * 6;
      ctx.fillStyle = col.color;
      ctx.shadowColor = col.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(col.x + col.width / 2, currentY + col.height / 2, col.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(col.symbol, col.x + col.width / 2, currentY + col.height / 2 + 1);
    });

    particles.forEach(function(p) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function gameLoop() {
    if (isRunning && !isPaused) {
      update();
    }
    draw();
    requestAnimationFrame(gameLoop);
  }

  function handleGameOver(obstacle) {
    isRunning = false;
    playSound('hit');

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('vanguard_runner_highscore', highScore.toString());
      updateHighScoreDisplay();
    }

    if (gameOverReasonEl) gameOverReasonEl.textContent = 'Hit Hazard: ' + obstacle.name;
    if (finalScoreValEl) finalScoreValEl.textContent = formatCurrency(score);
    if (finalHighScoreValEl) finalHighScoreValEl.textContent = formatCurrency(highScore);
    if (consultingTipEl) {
      consultingTipEl.innerHTML = '<i class="fa-solid fa-lightbulb text-gold"></i> <strong>Consultant Insight:</strong> ' + obstacle.tip;
    }

    if (gameOverOverlay) gameOverOverlay.style.display = 'flex';
  }

  if (startBtn) {
    startBtn.addEventListener('click', function() {
      initAudio();
      resetGame();
      isRunning = true;
      isPaused = false;
      if (startOverlay) startOverlay.style.display = 'none';
      if (gameOverOverlay) gameOverOverlay.style.display = 'none';
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', function() {
      initAudio();
      resetGame();
      isRunning = true;
      isPaused = false;
      if (gameOverOverlay) gameOverOverlay.style.display = 'none';
    });
  }

  window.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      doJump();
    }
  });

  canvas.addEventListener('pointerdown', function(e) {
    e.preventDefault();
    doJump();
  });

  if (mobileJumpBtn) {
    mobileJumpBtn.addEventListener('click', function(e) {
      e.preventDefault();
      doJump();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', function() {
      isMuted = !isMuted;
      if (soundIcon) {
        soundIcon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
      }
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', function() {
      if (!isRunning) return;
      isPaused = !isPaused;
      if (pauseIcon) {
        pauseIcon.className = isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
      }
    });
  }

  gameLoop();
}
