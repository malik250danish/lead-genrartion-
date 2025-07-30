// script.js

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Show/hide custom date field
document
  .getElementById('timeframe')
  .addEventListener('change', function () {
    const customDateField = document.getElementById('customDateField');
    if (this.value === 'other') {
      customDateField.classList.add('show');
      document.getElementById('customDate').required = true;
    } else {
      customDateField.classList.remove('show');
      document.getElementById('customDate').required = false;
    }
  });

// Form validation & submit handling
document.getElementById('leadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = this;
  const submitBtn = document.querySelector('.btn-submit');
  const successMessage = document.getElementById('successMessage');

  // reset validation states
  form.classList.remove('was-validated');
  form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
    el.classList.remove('is-invalid', 'is-valid');
  });

  // validate
  let isValid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else if (field.type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value)) {
        field.classList.add('is-invalid');
        isValid = false;
      } else {
        field.classList.add('is-valid');
      }
    } else {
      field.classList.add('is-valid');
    }
  });

  if (!isValid) return;

  // show loading
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    successMessage.style.display = 'block';

    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successMessage.style.display = 'none';
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    }, 5000);
  }, 2000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const offsetPosition = target.offsetTop - 80;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  });
});

// Real-time field validation
document.querySelectorAll('.form-control, .form-select').forEach(field => {
  field.addEventListener('blur', function () {
    if (this.required && !this.value.trim()) {
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
    } else if (this.type === 'email' && this.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.value)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
      } else {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
      }
    } else if (this.value.trim()) {
      this.classList.add('is-valid');
      this.classList.remove('is-invalid');
    }
  });
});
