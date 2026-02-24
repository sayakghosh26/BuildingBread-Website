// Execute code only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // Register the GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // The Toaster Pop Animation
    gsap.to(".bread", {
        y: -130, // Move up by 130px
        duration: 0.6, 
        ease: "back.out(1.5)", // Springy pop effect
        scrollTrigger: {
            trigger: ".toaster-container", 
            start: "top 80%", // Triggers when toaster enters bottom 20% of viewport
            end: "bottom 20%", // Triggers when toaster leaves top 20% of viewport
            toggleActions: "play reverse play reverse", 
            
            // Optional: Uncomment the lines below to add debug markers to your screen 
            // to help you see exactly where the triggers are firing.
            // markers: true 
        }
    });

});