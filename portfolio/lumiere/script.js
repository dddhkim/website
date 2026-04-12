document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Slow Fade-in Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1, // Trigger earlier for a smoother feel
        rootMargin: "0px 0px -100px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Subtly parallax the hero image on scroll
    const heroImage = document.querySelector('.hero-image');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        // Move the image slightly down as we scroll down to create depth
        if(heroImage && scrollPosition < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.15}px) scale(1.05)`;
        }
    });

    // Initial Trigger for elements already in viewport
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});
