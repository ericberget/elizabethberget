/* ===== FIREFLY PARTICLES ===== */
(function() {
  const canvas = document.getElementById('fireflies');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const COUNT = 28;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Firefly {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2.2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = (Math.random() - 0.5) * 0.18;
      this.opacity = 0;
      this.targetOpacity = Math.random() * 0.3 + 0.05;
      this.fadeSpeed = Math.random() * 0.007 + 0.003;
      this.phase = Math.random() * Math.PI * 2;
      this.wobble = Math.random() * 0.4 + 0.15;
      const colors = [[200,164,92],[181,137,74],[140,180,130],[200,180,140]];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.fadingIn = true;
      this.life = Math.random() * 400 + 200;
    }
    update() {
      this.phase += 0.015;
      this.x += this.speedX + Math.sin(this.phase) * this.wobble * 0.3;
      this.y += this.speedY + Math.cos(this.phase * 0.7) * this.wobble * 0.2;
      if (this.fadingIn) {
        this.opacity += this.fadeSpeed;
        if (this.opacity >= this.targetOpacity) { this.opacity = this.targetOpacity; this.fadingIn = false; }
      }
      this.life--;
      if (this.life < 60) this.opacity = this.targetOpacity * (this.life / 60);
      if (this.life <= 0 || this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20) this.reset();
    }
    draw() {
      const [r, g, b] = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity * 0.12})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    for (let i = 0; i < COUNT; i++) particles.push(new Firefly());
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  init();
})();

/* ===== NAVBAR SCROLL ===== */
(function() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
})();

/* ===== COUNTDOWN (only if elements exist) ===== */
(function() {
  const el = document.getElementById('cd-days');
  if (!el) return;

  function update() {
    const release = new Date('2026-05-05T00:00:00');
    const diff = release - new Date();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent = '0');
      return;
    }
    document.getElementById('cd-days').textContent = Math.floor(diff / (1000*60*60*24));
    document.getElementById('cd-hours').textContent = String(Math.floor((diff % (1000*60*60*24)) / (1000*60*60))).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(Math.floor((diff % (1000*60*60)) / (1000*60))).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(Math.floor((diff % (1000*60)) / 1000)).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
})();

/* ===== SCROLL REVEAL ===== */
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
})();
