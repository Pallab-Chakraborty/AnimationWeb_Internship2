// ──────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────
let currentIndex = 0;
const total = characters.length;
let autoplayRunning = true;
let autoplayProgress = 0;
let autoplayTimer = null;
const AUTOPLAY_DURATION = 4000; // ms
let isAnimating = false;

// Touch
let touchStartX = 0, touchEndX = 0;

// ──────────────────────────────────────────────
// STARS CANVAS
// ──────────────────────────────────────────────
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a = 0.3 + 0.5 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,180,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  window.addEventListener('resize', () => { resize(); createStars(); });
  requestAnimationFrame(draw);
})();

// ──────────────────────────────────────────────
// BUILD DOM
// ──────────────────────────────────────────────
const track = document.getElementById('slide-track');
const dotsEl = document.getElementById('dots');
const counterCur = document.getElementById('counter-cur');
const counterTotal = document.getElementById('counter-total');
const bgHero = document.getElementById('bg-hero');
counterTotal.textContent = total;

// ── Build items with <img> tags ──────────────────────────────
const items = characters.map((ch, i) => {
  const div = document.createElement('div');
  div.className = 'item';
  div.style.background = ch.fallback;
  div.dataset.index = i;

  // Create img element — always loaded (base64 data URIs never fail)
  const imgEl = document.createElement('img');
  imgEl.className = 'card-img';
  imgEl.src = ch.images[0];
  imgEl.alt = ch.name;
  imgEl.draggable = false;
  div.appendChild(imgEl);

  // Store src for bg-hero use
  div.dataset.loadedUrl = ch.images[0];

  track.appendChild(div);
  return div;
});

// Build dots
characters.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.dataset.index = i;
  d.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(d);
});

// ──────────────────────────────────────────────
// CONTENT INJECTION
// ──────────────────────────────────────────────
function buildContent(ch) {
  return `
    <div class="item-content">
      <div class="badge"><i class="${ch.badgeIcon}"></i>&nbsp;${ch.badge}</div>
      <div class="char-name">${ch.name}</div>
      <div class="char-tagline">"${ch.tagline}"</div>
      <div class="char-desc">${ch.desc}</div>
      <div class="abilities">
        ${ch.abilities.slice(0,4).map(a=>`<span class="ability-tag">${a}</span>`).join('')}
      </div>
      <div class="btn-group">
        <button class="btn-primary open-modal-btn" data-index="${characters.indexOf(ch)}">Explore <i class="fa-solid fa-arrow-right" style="margin-left:6px;font-size:0.75rem"></i></button>
        <button class="btn-outline" onclick="goNext()">Skip</button>
      </div>
    </div>`;
}

// ──────────────────────────────────────────────
// RENDER POSITIONS
// ──────────────────────────────────────────────
function render() {
  const positions = ['0','1','2','3','hidden','hidden','hidden'];

  items.forEach((item, i) => {
    const offset = (i - currentIndex + total) % total;
    const pos = offset < positions.length ? positions[offset] : 'hidden';
    item.dataset.pos = pos;

    // Remove old content
    item.querySelector('.item-content')?.remove();

    // Inject content for the featured card
    if (pos === '0') {
      item.insertAdjacentHTML('beforeend', buildContent(characters[i]));
      // Rebind modal btn
      item.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          openModal(+btn.dataset.index);
        });
      });
    }
  });

  // Update bg
  const activeCh = characters[currentIndex];
  bgHero.style.backgroundImage = `url(${activeCh.images[0]})`;

  // Update dots
  dotsEl.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });

  // Update counter
  counterCur.textContent = currentIndex + 1;
}

// ──────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────
function goNext() {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = (currentIndex + 1) % total;
  resetAutoplay();
  render();
  setTimeout(() => isAnimating = false, 650);
}

function goPrev() {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = (currentIndex - 1 + total) % total;
  resetAutoplay();
  render();
  setTimeout(() => isAnimating = false, 650);
}

function goTo(i) {
  if (isAnimating || i === currentIndex) return;
  isAnimating = true;
  currentIndex = i;
  resetAutoplay();
  render();
  setTimeout(() => isAnimating = false, 650);
}

// Side card click to jump
items.forEach(item => {
  item.addEventListener('click', function() {
    if (this.dataset.pos !== '0') {
      goTo(+this.dataset.index);
    }
  });
});

document.getElementById('btn-next').addEventListener('click', goNext);
document.getElementById('btn-prev').addEventListener('click', goPrev);

// Keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') goNext();
  else if (e.key === 'ArrowLeft') goPrev();
  else if (e.key === ' ') { e.preventDefault(); toggleAutoplay(); }
  else if (e.key === 'Enter') openModal(currentIndex);
  else if (e.key === 'Escape') closeModal();
});

// Touch/swipe
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
});

// ──────────────────────────────────────────────
// AUTO-PLAY
// ──────────────────────────────────────────────
const progressCircle = document.getElementById('progress-circle');
const playIcon = document.getElementById('play-icon');
const circumference = 113; // 2π × 18
let lastTimestamp = null;

function autoplayStep(ts) {
  if (!autoplayRunning) return;
  if (!lastTimestamp) lastTimestamp = ts;
  const elapsed = ts - lastTimestamp;
  lastTimestamp = ts;
  autoplayProgress += elapsed;

  const frac = Math.min(autoplayProgress / AUTOPLAY_DURATION, 1);
  progressCircle.style.strokeDashoffset = circumference - frac * circumference;

  if (autoplayProgress >= AUTOPLAY_DURATION) {
    autoplayProgress = 0;
    lastTimestamp = null;
    goNext();
  }

  autoplayTimer = requestAnimationFrame(autoplayStep);
}

function resetAutoplay() {
  autoplayProgress = 0;
  lastTimestamp = null;
  progressCircle.style.strokeDashoffset = circumference;
}

function startAutoplay() {
  autoplayRunning = true;
  lastTimestamp = null;
  playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
  autoplayTimer = requestAnimationFrame(autoplayStep);
}

function stopAutoplay() {
  autoplayRunning = false;
  cancelAnimationFrame(autoplayTimer);
  playIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function toggleAutoplay() {
  autoplayRunning ? stopAutoplay() : startAutoplay();
}

document.getElementById('autoplay-ring').addEventListener('click', toggleAutoplay);

// Pause on hover over stage
const stage = document.getElementById('card-stage');
stage.addEventListener('mouseenter', stopAutoplay);
stage.addEventListener('mouseleave', () => { if (!document.getElementById('modal-overlay').classList.contains('open')) startAutoplay(); });

// ──────────────────────────────────────────────
// MODAL
// ──────────────────────────────────────────────
const overlay = document.getElementById('modal-overlay');
const modalImg = document.getElementById('modal-img');
const modalBadge = document.getElementById('modal-badge');
const modalName = document.getElementById('modal-name');
const modalTagline = document.getElementById('modal-tagline');
const modalDesc = document.getElementById('modal-desc');
const modalAbilities = document.getElementById('modal-abilities');
const modalStats = document.getElementById('modal-stats');

function openModal(idx) {
  const ch = characters[idx];
  // Use an img element inside modal for proper display
  modalImg.innerHTML = '';
  const mImg = document.createElement('img');
  mImg.src = ch.images[0];
  mImg.alt = ch.name;
  mImg.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:center top;border-radius:20px 0 0 20px;display:block;';
  modalImg.appendChild(mImg);
  modalBadge.innerHTML = `<i class="${ch.badgeIcon}"></i>&nbsp;${ch.badge}`;
  modalName.textContent = ch.name;
  modalTagline.textContent = `"${ch.tagline}"`;
  modalDesc.textContent = ch.desc;
  modalAbilities.innerHTML = ch.abilities.map(a => `<span class="modal-ability">${a}</span>`).join('');

  const statKeys = Object.keys(ch.stats);
  modalStats.innerHTML = statKeys.map(k => `
    <div class="stat-item">
      <div class="stat-label">${k}</div>
      <div class="stat-bar-bg"><div class="stat-bar" data-val="${ch.stats[k]}"></div></div>
    </div>
  `).join('');

  overlay.classList.add('open');
  stopAutoplay();

  // Animate stat bars
  setTimeout(() => {
    modalStats.querySelectorAll('.stat-bar').forEach(bar => {
      bar.style.width = bar.dataset.val + '%';
    });
  }, 80);
}

function closeModal() {
  overlay.classList.remove('open');
  // Reset bars
  modalStats.querySelectorAll('.stat-bar').forEach(bar => { bar.style.width = '0'; });
  startAutoplay();
}

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
render();
startAutoplay();
