gsap.registerPlugin(ScrollTrigger);

/* --- Cinematic Loader --- */
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('.loader-content', {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut'
    })
    .to('.loader-content', {
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.inOut'
    })
    .to('.loader-overlay-left', {
        xPercent: -100,
        duration: 1.5,
        ease: 'power4.inOut'
    }, "-=0.5")
    .to('.loader-overlay-right', {
        xPercent: 100,
        duration: 1.5,
        ease: 'power4.inOut'
    }, "-=1.5")
    .to('#loader', {
        display: 'none',
        onComplete: () => {
            initHeroAnimations();
        }
    });
});

/* --- Clean Navbar Scroll --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.style.background = 'var(--charcoal)';
        navbar.style.borderBottom = 'none';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,0.2)';
    }
});

/* --- Hero Animations --- */
function initHeroAnimations() {
    gsap.to('.hero-title, .hero-script, .hero-kicker, .hero-content .btn', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power2.out'
    });
    
    // Slow cinematic pan
    gsap.to('.hero-bg video', {
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-classic',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

/* --- Scroll Animated Marquee --- */
gsap.to('.marquee-content', {
    xPercent: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    }
});

/* --- Scroll-Scrubbed Experience Video --- */
const scrubVideo = document.getElementById('experience-video');
const scrubSection = document.querySelector('.experience-scrub-section');

if(scrubVideo && scrubSection) {
    scrubVideo.addEventListener('loadedmetadata', () => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrubSection,
                start: "top top",
                end: "+=150%", // Scroll depth for playback
                scrub: 1,
                pin: true,
            }
        });
        
        tl.fromTo(scrubVideo, 
            { currentTime: 0 }, 
            { currentTime: scrubVideo.duration || 1, ease: "none" }
        );
    });
}

// Global Fade Up for all elements
document.querySelectorAll('.fade-up').forEach(element => {
    gsap.fromTo(element, 
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%'
            }
        }
    );
});

// Dynamic Dark Theme Transition
ScrollTrigger.create({
    trigger: ".video-block",
    start: "top 40%",
    end: "bottom 40%",
    onEnter: () => document.body.classList.add("dark-theme"),
    onLeaveBack: () => document.body.classList.remove("dark-theme"),
    onEnterBack: () => document.body.classList.add("dark-theme"),
    onLeave: () => document.body.classList.remove("dark-theme"),
});

// Simple Form Submission
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerText;
        btn.innerText = "Sending...";
        setTimeout(() => {
            btn.innerText = "Thank you! We will be in touch.";
            btn.style.background = "var(--charcoal)";
            btn.style.color = "var(--white)";
            contactForm.reset();
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.color = "";
            }, 3000);
        }, 1500);
    });
}
