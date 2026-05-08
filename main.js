gsap.registerPlugin(ScrollTrigger);

/* --- Bento Gallery Logic --- */
function initBentoGallery() {
    try {
        const bentoItems = document.querySelectorAll('.bento-item');
        const lightbox = document.getElementById('bento-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxOverlay = document.querySelector('.lightbox-overlay');

        if (!bentoItems.length || !lightbox) return;

        bentoItems.forEach(item => {
            const images = item.querySelectorAll('img');
            if (images.length <= 1) return;

            let currentIndex = 0;
            let intervalTime = parseInt(item.getAttribute('data-interval')) || 3000;
            let timer;

            const startCycling = () => {
                timer = setInterval(() => {
                    images[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].classList.add('active');
                }, intervalTime);
            };

            const stopCycling = () => {
                clearInterval(timer);
            };

            startCycling();

            item.addEventListener('mouseenter', stopCycling);
            item.addEventListener('mouseleave', startCycling);

            item.addEventListener('click', (e) => {
                const activeImg = item.querySelector('img.active') || images[0];
                if (activeImg) {
                    lightboxImg.src = activeImg.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    } catch (err) {
        console.error("Bento Gallery Init Error:", err);
    }
}

/* --- Cinematic Loader --- */
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('.loader-line', { scaleX: 1, duration: 1, ease: 'power2.inOut' })
      .to('.loader-content', { opacity: 1, duration: 1.2, ease: 'power2.inOut' }, 0)
      .to('.loader-content', { opacity: 0, duration: 0.8, delay: 1, ease: 'power2.inOut' })
      .to('#loader', { 
          opacity: 0, 
          duration: 1.5, 
          ease: 'power2.inOut' 
      }, "-=0.2")
      .to('#loader', {
          display: 'none',
          onComplete: () => {
              initBentoGallery();
              initHeroAnimations();
              initAllScrollTriggersSequentially();
              setTimeout(() => ScrollTrigger.refresh(), 500);
          }
      });
});

/* --- Mobile Menu --- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const closeBtn = document.querySelector('.mobile-menu-close');
const mobileLinksAll = document.querySelectorAll('.mobile-links a');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            gsap.fromTo('.mobile-links li', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.2, ease: 'power2.out' });
        }
    });
    
    mobileLinksAll.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }));

    // Mobile Contact Modal Logic
    const mobileContactBtn = document.querySelector('.btn-mobile-contact');
    const contactModal = document.querySelector('.contact-modal');
    const contactModalClose = document.querySelector('.contact-modal-close');

    if (mobileContactBtn && contactModal) {
        mobileContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            contactModal.classList.add('active');
        });

        contactModalClose.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });
    }
}

/* --- Navbar Scroll --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* --- Hero Animations --- */
function initHeroAnimations() {
    gsap.to('.hero-content', { opacity: 1, y: 0, duration: 1 });
    gsap.to('.hero-title, .hero-script, .hero-kicker, .hero-content .btn', {
        y: 0, opacity: 1, stagger: 0.2, duration: 1.5, ease: 'power2.out'
    });
    gsap.set('.hero-bg video', { width: '100%', height: '100%', objectFit: 'cover', rotation: -90, scale: 1.8 });
    gsap.to('.hero-bg video', {
        rotation: -90,
        scale: 2.0, 
        ease: 'none',
        scrollTrigger: { trigger: '.hero-classic', start: 'top top', end: 'bottom top', scrub: true }
    });
}

function updateTheme(isLight) {
    gsap.to('body', { 
        backgroundColor: isLight ? '#f5f5f5' : '#0a0a0a', 
        duration: 0.8, 
        overwrite: 'auto' 
    });
    if (isLight) document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');
}

function addThemeTrigger(section) {
    const isLight = section.classList.contains('light-section');
    ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => updateTheme(isLight),
        onEnterBack: () => updateTheme(isLight),
    });
}

function initAllScrollTriggersSequentially() {
    // We must create ALL ScrollTriggers in the order they appear in the DOM
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Add theme trigger for every section
        addThemeTrigger(section);

        // Add section-specific logic if it matches
        if (section.id === 'films') {
            const filmsTrack = section.querySelector('.films-track');
            if (filmsTrack) {
                gsap.to(filmsTrack, {
                    x: () => -(filmsTrack.scrollWidth - window.innerWidth + 100),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${filmsTrack.scrollWidth - window.innerWidth + 100}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    }
                });
            }
        }

        if (section.classList.contains('marquee-section')) {
            const marqueeContent = section.querySelector('.marquee-content');
            if (marqueeContent) {
                const firstSpan = marqueeContent.querySelector('span');
                if (firstSpan) {
                    for (let i = 0; i < 4; i++) marqueeContent.appendChild(firstSpan.cloneNode(true));
                }
                const singleSetWidth = marqueeContent.scrollWidth / 2;
                gsap.fromTo(marqueeContent, { x: 0 }, { x: -singleSetWidth, ease: 'none', duration: 30, repeat: -1 });
                gsap.to(marqueeContent, {
                    x: `-=${singleSetWidth * 0.3}`,
                    ease: 'none',
                    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 }
                });
            }
        }

        if (section.id === 'stories') {
            const storyImg = section.querySelector('.story-image img');
            if (storyImg) {
                gsap.to(storyImg, {
                    yPercent: -10, ease: 'none',
                    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
                });
            }
        }

        if (section.id === 'experience') {
            const scrubVideo = section.querySelector('#experience-video');
            if (scrubVideo) {
                const scrubTl = gsap.timeline({
                    scrollTrigger: { trigger: section, start: "top top", end: "+=100%", scrub: 1, pin: true }
                });
                const addVideoTween = () => {
                    scrubTl.fromTo(scrubVideo, { currentTime: 0 }, { currentTime: scrubVideo.duration || 1, ease: "none" });
                };
                if (scrubVideo.readyState >= 1) addVideoTween();
                else scrubVideo.addEventListener('loadedmetadata', addVideoTween);
            }
        }

        if (section.id === 'gallery-deck') {
            const deckCards = gsap.utils.toArray('.deck-card', section);
            const deckContainer = section.querySelector('.deck-container');
            if (deckCards.length > 0) {
                gsap.set(deckCards.slice(1), { yPercent: 120 });
                const deckTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${window.innerHeight * deckCards.length}`,
                        pin: deckContainer,
                        pinSpacing: true,
                        scrub: 1,
                        anticipatePin: 1,
                    }
                });
                deckCards.forEach((card, i) => {
                    if (i === 0) return;
                    deckTl.to(card, { yPercent: 0, ease: "none", duration: 1 });
                    deckTl.to(deckCards[i - 1], { scale: 0.92, opacity: 0.3, ease: "none", duration: 1 }, "<");
                });
            }
        }
    });

    // Finally, stats and fade ups (after pins are established)
    document.querySelectorAll('.stat-number').forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        ScrollTrigger.create({
            trigger: num, start: 'top 85%',
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, { val: target, duration: 2, ease: 'power2.out', onUpdate: () => { num.textContent = Math.round(obj.val) + '+'; } });
            },
            once: true
        });
    });

    document.querySelectorAll('.fade-up').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });
}

/* --- Form Submission --- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const orig = btn.innerText;
        btn.innerText = "Sending...";
        setTimeout(() => {
            btn.innerText = "Thank you! We'll be in touch.";
            btn.style.background = "transparent"; btn.style.color = "var(--gold)"; btn.style.border = "1px solid var(--gold)";
            contactForm.reset();
            setTimeout(() => { btn.innerText = orig; btn.style = ""; }, 3000);
        }, 1500);
    });
}
