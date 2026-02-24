gsap.registerPlugin(ScrollTrigger);

// 1. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger to X
    const bars = document.querySelectorAll('.bar');
    bars[0].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
    bars[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// 2. Toaster Animation
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom center",
        scrub: 1.5,
    }
});

tl.to(".toaster-lever", {
    y: 50,
    ease: "power1.inOut"
})
.to(".bread", {
    y: -130,
    backgroundColor: "#d2a679", // Bakes as it pops
    ease: "back.out(2)"
}, "-=0.2");

// 3. Skills Cards Entrance
gsap.from(".skill-card", {
    scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out"
});