document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Mobile Navigation
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    hamburgerMenu.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburgerMenu.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Model Tabs
    const tabLinks = document.querySelectorAll('.tab-link');
    const modelCards = document.querySelectorAll('.model-card');

    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            tabLinks.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.textContent.toLowerCase().replace(' ', '-');

            modelCards.forEach(card => {
                if (filter === 'all-models' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Video Modal
    const watchDemoButtons = document.querySelectorAll('.cta-secondary, .final-cta-section .cta-secondary');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const videoContainer = document.querySelector('.video-container');

    const openModal = () => {
        videoModal.style.display = 'flex';
        videoContainer.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/Yp-d3mK_e-E?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    };

    const closeModalFunction = () => {
        videoModal.style.display = 'none';
        videoContainer.innerHTML = '';
    };

    watchDemoButtons.forEach(button => {
        if (button.textContent.includes('Watch Demo') || button.textContent.includes('Watch 2-Min Demo')) {
            button.addEventListener('click', openModal);
        }
    });

    closeModal.addEventListener('click', closeModalFunction);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModalFunction();
        }
    });
});
