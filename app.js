/* ===========================================
   Muhammad Zaheeb Kasmani — Portfolio Script
   =========================================== */

// ===== Navbar background on scroll =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Mobile menu toggle =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('mobile');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('mobile');
  });
});

// ===== Reveal elements on scroll =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Animate skill bars =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.w + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.bar i').forEach(bar => skillObserver.observe(bar));

// ===== Contact form — sends to Gmail via Web3Forms =====
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  note.textContent = '';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: jsonData
    });

    const result = await response.json();

    if (result.success) {
      note.textContent = '✅ Thank you! Your message has been sent successfully. I will get back to you soon.';
      note.style.color = '#22c55e';
      form.reset();
    } else {
      note.textContent = '❌ Oops! Something went wrong. Please try again or email me directly.';
      note.style.color = '#ef4444';
    }
  } catch (error) {
    note.textContent = '❌ Could not send message. Please check your internet connection and try again.';
    note.style.color = '#ef4444';
  }

  submitBtn.innerHTML = originalBtnText;
  submitBtn.disabled = false;
  submitBtn.style.opacity = '1';
});