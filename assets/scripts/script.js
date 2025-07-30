
       
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

     
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Initialize Swiper
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });

       
        document.getElementById('timeframe').addEventListener('change', function() {
            const customDateField = document.getElementById('customDateField');
            if (this.value === 'other') {
                customDateField.classList.add('show');
                document.getElementById('customDate').required = true;
            } else {
                customDateField.classList.remove('show');
                document.getElementById('customDate').required = false;
            }
        });

        // Form validation 
        document.getElementById('leadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = this;
            const submitBtn = document.querySelector('.btn-submit');
            const successMessage = document.getElementById('successMessage');
            

            form.classList.remove('was-validated');
            document.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
            document.querySelectorAll('.is-valid').forEach(el => {
                el.classList.remove('is-valid');
            });
            
            let isValid = true;
            

            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
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
            
            if (!isValid) {
                return;
            }
            
    
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
                    
           
                    document.querySelectorAll('.is-valid').forEach(el => {
                        el.classList.remove('is-valid');
                    });
                }, 5000);
            }, 2000);
        });


        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Real-time form validation
        document.querySelectorAll('.form-control, .form-select').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
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


        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
