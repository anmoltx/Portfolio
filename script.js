/* ==========================================================================
   ANMOL KUMAR MISHRA - PERSONAL PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initBackgroundCanvas();
  initMouseSpotlight();
  initNavbarScroll();
  initMobileDrawer();
  initScrollObserver();
  initStatsCounter();
  initBackToTop();
});

/* ==========================================================================
   1. TYPING TEXT ANIMATION
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    "Junior Developer",
    "IT Jr. Executive",
    "Web Developer",
    "UI/UX Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. PARTICLES BACKGROUND CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 65);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const opacity = (1 - distance / 130) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79, 172, 254, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ==========================================================================
   3. MOUSE SPOTLIGHT FOLLOW EFFECT
   ========================================================================== */
function initMouseSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   4. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   6. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollObserver() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.glass-card, .timeline-item, .stat-card, .section-header');
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* ==========================================================================
   7. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const statsSection = document.querySelector('.stats-container');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasCounted) {
      hasCounted = true;
      statNumbers.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);

        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
      });
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* ==========================================================================
   8. SMART MULTI-FALLBACK CONTACT FORM HANDLER
   ========================================================================== */
function handleFormSubmit() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const subject = subjectInput ? subjectInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name || !email || !subject || !message) {
    alert("Please fill out all required form fields.");
    return;
  }

  const recipientEmail = "iamanmol0807@gmail.com";
  const emailBodyText = `Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`;

  // 1. Direct Gmail Web Composer URL (Works on Desktop & Mobile Web without needing desktop Outlook/Mail app!)
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBodyText)}`;

  // 2. Standard mailto fallback
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBodyText)}`;

  // Copy email to clipboard automatically
  navigator.clipboard.writeText(recipientEmail).catch(() => {});

  // Update button state
  const originalBtnHtml = submitBtn.innerHTML;
  submitBtn.innerHTML = `<i class="fa-solid fa-check-circle"></i> Opening Email Composer...`;
  submitBtn.style.background = "#10b981";

  // Attempt to open Gmail Web Composer in a new tab first
  const newTab = window.open(gmailWebUrl, '_blank');

  // Fallback to mailto if popups are blocked
  if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
    window.location.href = mailtoUrl;
  }

  alert(`Redirecting to send email to ${recipientEmail}.\n\nYour message text has also been copied to your clipboard!`);

  setTimeout(() => {
    submitBtn.innerHTML = originalBtn Html;
    submitBtn.style.background = "";
  }, 4000);
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
