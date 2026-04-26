document.addEventListener('DOMContentLoaded', () => {

    // --- Cursor Follower with Inertia ---
    const cursor = document.querySelector('.cursor');
    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateCursor() {
        cursorX += (targetX - cursorX) * 0.1;
        cursorY += (targetY - cursorY) * 0.1;
        cursor.style.transform = `translate3d(${cursorX - 15}px, ${cursorY - 15}px, 0)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // --- Soft 3D Tilt Effect ---
    const tiltTargets = document.querySelectorAll('.tilt-target');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const rotateX = (clientY - centerY) / 40; // Softer than Architecture
        const rotateY = (centerX - clientX) / 40;

        tiltTargets.forEach(target => {
            target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // --- Intersection Observer for Reveal ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Scroll Parallax ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        const floatElements = document.querySelectorAll('.float-element');
        floatElements.forEach(el => {
            const speed = 0.2;
            el.style.transform = `translate3d(0, ${scrolled * speed}px, 80px)`;
        });
        
        const bgText = document.querySelector('.bg-text');
        if (bgText) {
            bgText.style.transform = `translateX(${scrolled * 0.1}px)`;
        }
    });

    // --- Interactive Hover ---
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.background = 'rgba(212, 163, 115, 0.1)';
            cursor.style.transform += ' scale(2)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.background = 'transparent';
            cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
        });
    });
});
