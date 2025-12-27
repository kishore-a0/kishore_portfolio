// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Animation
    const typingText = document.getElementById('typingText');
    const words = ["Software Developer", "Coder", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex--);
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex++);
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingText) typeEffect();


    // 2. Theme Toggle (Dark/Light)
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        let current = document.documentElement.getAttribute('data-theme');
        let newTheme = current === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        // Reset classes first
        toggleIcon.classList.remove('fa-moon', 'fa-sun');

        if (theme === 'light') {
            toggleIcon.classList.add('fa-sun');
            themeToggle.style.color = '#f1c40f'; // Sun Yellow
        } else {
            toggleIcon.classList.add('fa-moon');
            themeToggle.style.color = '#ffffff'; // Moon White
        }
    }


    // 3. Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('span'); // Simple hamburger animation
        // You can add 'open' class for CSS transformation of hamburger
        menuToggle.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });


    // 4. Header Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // 5. Back to Top Button
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // 6. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 7. Modals
    function setupModal(triggerId, modalId, closeId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        const close = document.getElementById(closeId);

        if (trigger && modal && close) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });

            close.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }

    setupModal('avatar', 'profileModal', 'closeModal');
    setupModal('resumeButton', 'resumeModal', 'closeResumeModal');
    setupModal('Certificate_button', 'certificateModal', 'closeCertificateModal');


    // 8. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            formStatus.textContent = 'Sending...';

            // Basic validation
            const name = this.elements['name'].value;
            const email = this.elements['email'].value;
            const message = this.elements['message'].value;

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill all fields.';
                formStatus.style.color = 'red';
                return;
            }

            // Simulate sending (replace with actual EmailJS call)
            // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            //    .then(() => {...}, (err) => {...});

            // Mock success for now
            setTimeout(() => {
                formStatus.innerHTML = 'Thanks for reaching out! 🎉<br>This feature is coming soon. Please contact me directly at <a href="mailto:aakishore0@gmail.com" style="color: var(--accent-color); text-decoration: underline;">aakishore0@gmail.com</a>';
                formStatus.style.color = '#27c93f';
                contactForm.reset();
                setTimeout(() => formStatus.innerHTML = '', 5000);
            }, 1000);
        });
    }

    // 9. Advanced Mouse Move Parallax (Background Shapes)
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.bg-shape');
        const x = e.clientX;
        const y = e.clientY;

        shapes.forEach(shape => {
            const speed = shape.getAttribute('data-speed');
            const xOffset = (window.innerWidth - x * speed) / 100;
            const yOffset = (window.innerHeight - y * speed) / 100;

            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // 10. 3D Tilt Effect for Profile Card
    const card = document.querySelector('.profile-glass-card');
    const container = document.querySelector('.profile-container');

    if (container && card) {
        container.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        container.addEventListener('mouseenter', (e) => {
            card.style.transition = 'none';
        });

        container.addEventListener('mouseleave', (e) => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }

    // 11. Coding Background (Floating Code Characters)
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;
        const codeChars = ['Developer', 'Problem Solver', 'Clean Code', 'Logic', 'System Design', 'Backend', 'Frontend', 'Optimization', 'Debug', '<Code/>'];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 10 + 8; // Variable font size
                this.text = codeChars[Math.floor(Math.random() * codeChars.length)];
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = Math.random() * 1.5 - 0.75;
                this.color = 'rgba(0, 210, 255, 0.15)'; // Low opacity accent
                this.angle = Math.random() * 360;
                this.spin = Math.random() < 0.5 ? 1 : -1;
            }
            update(scrollY) {
                this.x += this.speedX;
                this.y += this.speedY;

                // Scroll interaction: Move particles faster or change direction based on scroll
                // A simple effect: add scrollY to y position modulo height to loop, or just affect speed
                // Let's make them rotate based on scroll
                this.angle += 0.5 * this.spin + (scrollY * 0.002);

                // Wall collision (bounce)
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.font = `${this.size}px 'Space Mono', monospace`;
                ctx.fillText(this.text, 0, 0);
                ctx.restore();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let scrollY = window.scrollY;

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update(scrollY);
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }

    // 12. Scroll Driven Background Rotation (Global)
    // 12. Custom Cursor Logic Removed


    // 13. Enhanced Scroll Driven Background (Parallax + Rotation)
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // 13a. Scroll Progress Bar
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollY / docHeight) * 100;
        const progressBar = document.getElementById('scrollProgressBar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }

        // Background shapes parallax
        const shapes = document.querySelectorAll('.bg-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = scrollY * speed;
            const rotate = scrollY * 0.1;
            shape.style.transform = `translateY(${yPos}px) rotate(${rotate}deg)`;
        });
    });


});
