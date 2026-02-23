/* ============================================================
$XI — The People’s Coin | script.js
All interactive behaviors and dynamic effects
============================================================ */

/* ─── 1. SCROLL REVEAL ───────────────────────────────────────────
Fades in sections as the user scrolls them into view.
Uses IntersectionObserver for performance.
─────────────────────────────────────────────────────────────── */

// Target every section and card on the page
const revealTargets = document.querySelectorAll(
‘.section, .token-card, .road-item, .poster-panel, .manifesto-text’
);

// Add base invisible styles programmatically
revealTargets.forEach(el => {
el.style.opacity = ‘0’;
el.style.transform = ‘translateY(30px)’;
el.style.transition = ‘opacity 0.7s ease, transform 0.7s ease’;
});

// Create the observer
const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = ‘1’;
entry.target.style.transform = ‘translateY(0)’;
revealObserver.unobserve(entry.target); // Only animate once
}
});
}, {
threshold: 0.12, // Trigger when 12% of the element is visible
rootMargin: ‘0px 0px -40px 0px’
});

revealTargets.forEach(el => revealObserver.observe(el));

/* ─── 2. TOKEN CARD STAGGER ──────────────────────────────────────
When the tokenomics section scrolls into view,
each card fades in with a staggered delay.
─────────────────────────────────────────────────────────────── */

const tokenCards = document.querySelectorAll(’.token-card’);

tokenCards.forEach((card, index) => {
card.style.transitionDelay = ${index * 0.1}s;
});

/* ─── 3. ROADMAP ITEM STAGGER ────────────────────────────────────
Road items animate in sequentially as you scroll.
─────────────────────────────────────────────────────────────── */

const roadItems = document.querySelectorAll(’.road-item’);

roadItems.forEach((item, index) => {
item.style.transitionDelay = ${index * 0.15}s;
});

/* ─── 4. COIN CLICK EASTER EGG ───────────────────────────────────
Clicking the coin triggers a little spin animation
and shows a fun “TO THE MOON” message.
─────────────────────────────────────────────────────────────── */

const coin = document.querySelector(’.coin’);
const coinWrapper = document.querySelector(’.coin-wrapper’);

if (coin && coinWrapper) {
coin.style.cursor = ‘pointer’;

coin.addEventListener(‘click’, () => {
// Pause the floating animation temporarily
coinWrapper.style.animation = ‘none’;


// Spin the coin fast
coin.style.transition = 'transform 0.6s ease';
coin.style.transform = 'rotateY(720deg) scale(1.15)';

// Flash gold glow
coin.style.boxShadow = `
  0 0 0 3px #FFD700,
  0 0 80px rgba(255, 215, 0, 0.9),
  0 20px 60px rgba(0,0,0,0.5),
  inset 0 2px 10px rgba(255,255,255,0.4)
`;

// Show toast message
showToast('🚀 TO THE MOON! 月球! $XI');

// Reset after animation
setTimeout(() => {
  coin.style.transform = 'rotateY(0deg) scale(1)';
  coin.style.boxShadow = '';
  setTimeout(() => {
    coin.style.transition = '';
    coinWrapper.style.animation = '';
  }, 600);
}, 800);


});
}

/* ─── 5. TOAST NOTIFICATION ──────────────────────────────────────
Shows a temporary popup message at the bottom of the screen.
─────────────────────────────────────────────────────────────── */

function showToast(message) {
// Remove any existing toast
const existing = document.querySelector(’.xi-toast’);
if (existing) existing.remove();

const toast = document.createElement(‘div’);
toast.className = ‘xi-toast’;
toast.textContent = message;

// Inline styles so we don’t need extra CSS classes
Object.assign(toast.style, {
position: ‘fixed’,
bottom: ‘30px’,
left: ‘50%’,
transform: ‘translateX(-50%) translateY(20px)’,
background: ‘#FFD700’,
color: ‘#0A0A0A’,
fontFamily: “‘Bebas Neue’, sans-serif”,
fontSize: ‘20px’,
letterSpacing: ‘3px’,
padding: ‘14px 30px’,
zIndex: ‘99999’,
boxShadow: ‘4px 4px 0 #8B6914, 0 0 30px rgba(255,215,0,0.5)’,
opacity: ‘0’,
transition: ‘opacity 0.3s ease, transform 0.3s ease’,
whiteSpace: ‘nowrap’,
pointerEvents: ‘none’,
});

document.body.appendChild(toast);

// Animate in
requestAnimationFrame(() => {
requestAnimationFrame(() => {
toast.style.opacity = ‘1’;
toast.style.transform = ‘translateX(-50%) translateY(0)’;
});
});

// Animate out and remove
setTimeout(() => {
toast.style.opacity = ‘0’;
toast.style.transform = ‘translateX(-50%) translateY(20px)’;
setTimeout(() => toast.remove(), 400);
}, 2500);
}

/* ─── 6. SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────────
If any <a href="#section"> links are added, they scroll smoothly.
─────────────────────────────────────────────────────────────── */

document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, (e) => {
const target = document.querySelector(anchor.getAttribute(‘href’));
if (target) {
e.preventDefault();
target.scrollIntoView({ behavior: ‘smooth’, block: ‘start’ });
}
});
});

/* ─── 7. STATS BAR COUNTER ANIMATION ────────────────────────────
The supply stat counts up from 0 to 1B when it enters view.
─────────────────────────────────────────────────────────────── */

const statsBar = document.querySelector(’.stats-bar’);

if (statsBar) {
const statsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCounter();
statsObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

statsObserver.observe(statsBar);
}

function animateCounter() {
// Find the “1B” supply stat value and count up to it
const statValues = document.querySelectorAll(’.stat-value’);
statValues.forEach(el => {
if (el.textContent === ‘1B’) {
let count = 0;
const target = 1000;
const duration = 1200; // ms
const step = target / (duration / 16);


  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = '1B';
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(count) + 'M';
    }
  }, 16);
}


});
}

/* ─── 8. CURSOR TRAIL EFFECT ─────────────────────────────────────
Leaves small gold star particles trailing the cursor.
─────────────────────────────────────────────────────────────── */

let trailTimeout;

document.addEventListener(‘mousemove’, (e) => {
// Throttle to every 80ms for performance
if (trailTimeout) return;
trailTimeout = setTimeout(() => { trailTimeout = null; }, 80);

const star = document.createElement(‘div’);
star.textContent = ‘★’;

Object.assign(star.style, {
position: ‘fixed’,
left: e.clientX + ‘px’,
top: e.clientY + ‘px’,
color: ‘#FFD700’,
fontSize: Math.random() * 10 + 8 + ‘px’,
pointerEvents: ‘none’,
zIndex: ‘99998’,
opacity: ‘0.7’,
transform: ‘translate(-50%, -50%)’,
transition: ‘opacity 0.6s ease, transform 0.6s ease’,
fontFamily: ‘serif’,
});

document.body.appendChild(star);

// Fade and float upward
requestAnimationFrame(() => {
requestAnimationFrame(() => {
star.style.opacity = ‘0’;
star.style.transform = translate(-50%, -${30 + Math.random() * 40}px) rotate(${Math.random() * 60 - 30}deg);
});
});

setTimeout(() => star.remove(), 700);
});

/* ─── 9. CONSOLE EASTER EGG ──────────────────────────────────────
A fun message for devs who open the console.
─────────────────────────────────────────────────────────────── */

console.log(’%c $XI — THE PEOPLE'S COIN 🌕’, ‘color: #FFD700; background: #CC0000; font-size: 20px; font-weight: bold; padding: 10px 20px; font-family: monospace; letter-spacing: 3px;’);
console.log(’%c 人民的硬币 | Built on Solana | Launched on Moonshot’, ‘color: #FFD700; font-size: 13px; font-family: monospace;’);
console.log(’%c https://x.com/jinpingxi_coin’, ‘color: #aaa; font-size: 11px; font-family: monospace;’);
