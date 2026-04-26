document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor Follower ---
    const cursor = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    });

    // --- 3D Tilt Effect on Mouse Move ---
    const tiltTargets = document.querySelectorAll('.tilt-target');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const rotateX = (clientY - centerY) / 30; // Control intensity
        const rotateY = (centerX - clientX) / 30;

        tiltTargets.forEach(target => {
            target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Parallax background for Hero
        const heroBg = document.querySelector('.hero-bg-container');
        if (heroBg) {
            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;
            heroBg.style.transform = `translate3d(${moveX}px, ${moveY}px, -100px) scale(1.1)`;
        }
    });

    // --- Scroll Parallax & Reveal ---
    const revealElements = document.querySelectorAll('.reveal-3d, .reveal-up, .reveal-left, .reveal-right');
    
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Smooth Scroll Parallax for specific targets ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Perspective shift on scroll
        const wrapper = document.querySelector('.perspective-wrapper');
        const rotateValue = scrolled * 0.02; // Very subtle
        // wrapper.style.transform = `rotateX(${rotateValue}deg)`;
        
        // Individual element parallax
        const parallaxTargets = document.querySelectorAll('.parallax-target');
        parallaxTargets.forEach(target => {
            const speed = 0.3;
            target.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // --- Click Effect ---
    document.addEventListener('mousedown', () => {
        cursor.style.transform += ' scale(0.5)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.5)', '');
    });
});
