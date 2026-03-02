const stickyNav = document.querySelector('.site-nav');
const navLinks = Array.from(
  document.querySelectorAll('.brand-title[href^="#"], .section-nav a[href^="#"], .action-nav a[href^="#"]')
);

const sectionIds = [...new Set(navLinks.map((link) => link.getAttribute('href')))].filter(Boolean);
const sections = sectionIds
  .map((id) => document.querySelector(id))
  .filter((section) => section instanceof HTMLElement);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const navOffset = () => (stickyNav ? stickyNav.offsetHeight + 10 : 0);

const setActiveLink = (activeId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === activeId;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const updateActiveLinkOnScroll = () => {
  const scrollY = window.scrollY + navOffset() + 20;
  let activeSection = null;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollY) {
      activeSection = section;
    }
  });

  setActiveLink(activeSection ? `#${activeSection.id}` : "");
};

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') {
      return;
    }

    const target = document.querySelector(targetId);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset();
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setActiveLink(targetId);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toaster = document.querySelector(".toaster-wrapper");

  const handleScroll = () => {
    // Uses documentElement.scrollTop as a fallback for mobile browsers
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    // The moment the screen moves down even a pixel
    if (scrollPosition > 0) { 
      toaster.classList.add("is-popped");
      
      // Clean up both event listeners so it only pops once
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    }
  };

  // 1. Listens for traditional mouse wheel / trackpad scrolling
  window.addEventListener("scroll", handleScroll, { passive: true });
  
  // 2. Listens instantly for a finger swipe on mobile and tablets
  window.addEventListener("touchmove", handleScroll, { passive: true });
});

  document.addEventListener("DOMContentLoaded", () => {
  const posterRow = document.querySelector('.poster-row');

  if (posterRow) {
    // When the mouse enters the row, slow down the animation
    posterRow.addEventListener('mouseenter', () => {
      // .getAnimations() targets the CSS @keyframes running on this element
      const animations = posterRow.getAnimations();
      animations.forEach(anim => {
        anim.playbackRate = 0.5; // Slows down to 20% speed
      });
    });

    // When the mouse leaves, return to normal speed
    posterRow.addEventListener('mouseleave', () => {
      const animations = posterRow.getAnimations();
      animations.forEach(anim => {
        anim.playbackRate = 1; // Back to 100% speed
      });
    });
  }
});

window.addEventListener('scroll', updateActiveLinkOnScroll, { passive: true });
window.addEventListener('load', updateActiveLinkOnScroll);
