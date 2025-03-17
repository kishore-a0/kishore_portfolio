// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.mode-toggle');
    const body = document.body;
    const avatar = document.getElementById('avatar');
    const profileModal = document.getElementById('profileModal');
    const closeModal = document.getElementById('closeModal');
    const resumeButton = document.getElementById('resumeButton');
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');

    // Typing Effect
    const text = "Hi, I’m Kishore A";
    let index = 0;

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150); // Adjust speed (ms) here
        } else {
            cursor.style.display = 'none'; // Hide cursor when typing is complete
            // Re-render text with "Kishore A" in a span for styling
            const parts = text.split('Kishore A');
            typingText.innerHTML = `${parts[0]}<span class="name-highlight">Kishore A</span>`;
        }
    }

    type();

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // Toggle theme
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = toggleButton.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('nav a, .cta-button[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector(anchor.getAttribute('href'));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Smooth scroll for resume button (external link)
    resumeButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(resumeButton.getAttribute('href'), '_blank');
    });

    // Scroll Animation for Sections
    const items = document.querySelectorAll('.experience-item, .education-item, .project-card, .skills-list span');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of the element is visible
        }
    );

    items.forEach((item) => {
        item.classList.add('scroll-reveal'); // Add the initial class to all items
        observer.observe(item);
    });

    // Profile image modal
    avatar.addEventListener('click', () => {
        profileModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        profileModal.classList.remove('active');
    });

    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('active');
        }
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll to top
        });
    });

    // Scroll-aware Header
    let lastScrollTop = 0;
    let isHeaderVisible = true; // Track header visibility state
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        let currentScrollTop = window.scrollY;

        if (currentScrollTop > lastScrollTop && isHeaderVisible) {
            // Scrolling down and header is visible
            header.classList.add('hidden');
            isHeaderVisible = false;
        } else if (currentScrollTop < lastScrollTop && !isHeaderVisible) {
            // Scrolling up and header is hidden
            header.classList.remove('hidden');
            isHeaderVisible = true;
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative scroll values
    });

    // Resume modal
    resumeButton.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('active');
    });

    closeResumeModal.addEventListener('click', () => {
        resumeModal.classList.remove('active');
    });

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
        }
    });
});