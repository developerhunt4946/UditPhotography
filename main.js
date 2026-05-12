gsap.registerPlugin(ScrollTrigger);

/* --- Lightbox Logic --- */
function initLightbox() {
    const lightbox = document.getElementById('bento-lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

/* --- Bento Gallery Logic --- */
function initBentoGallery() {
    try {
        const bentoItems = document.querySelectorAll('.bento-item');
        const lightbox = document.getElementById('bento-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

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
    } catch (err) {
        console.error("Bento Gallery Init Error:", err);
    }
}

/* --- Portfolio Filtering & Collection Modal --- */
function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const collectionModal = document.getElementById('collection-modal');
    const modalGrid = document.getElementById('modal-grid');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const closeModal = document.querySelector('.close-modal');
    const seeAllBtn = document.getElementById('see-all-photos');
    
    const lightbox = document.getElementById('bento-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!portfolioItems.length) return;

    // Filtering logic
    filterBtns.forEach(btn => {
        if (btn.id === 'see-all-photos') return;
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    gsap.to(item, { scale: 1, opacity: 1, duration: 0.5, display: 'block', ease: 'power2.out' });
                } else {
                    gsap.to(item, { scale: 0.8, opacity: 0, duration: 0.5, display: 'none', ease: 'power2.out' });
                }
            });
            setTimeout(() => ScrollTrigger.refresh(), 600);
        });
    });

    const openModal = (title, category, imagesStr) => {
        if (!imagesStr || !collectionModal) return;
        const images = imagesStr.split(',');
        modalTitle.innerText = title;
        modalCategory.innerText = category;
        modalGrid.innerHTML = '';
        
        images.forEach(imgSrc => {
            const div = document.createElement('div');
            div.className = 'modal-grid-item';
            div.innerHTML = `<img src="${imgSrc.trim()}" alt="${title}">`;
            div.addEventListener('click', () => {
                if (lightboxImg) lightboxImg.src = imgSrc.trim();
                if (lightbox) lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            modalGrid.appendChild(div);
        });

        collectionModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        gsap.fromTo('.modal-grid-item', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' });
    };

    // Collection Modal Logic for items
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const category = item.getAttribute('data-category');
            const imagesStr = item.getAttribute('data-images');
            openModal(title, category, imagesStr);
        });
    });

    // See All Logic
    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', () => {
            let allImages = [];
            
            // Collect from visible items
            portfolioItems.forEach(item => {
                const imgs = item.getAttribute('data-images');
                if (imgs) allImages = allImages.concat(imgs.split(','));
            });
            
            // Collect from hidden data
            const hiddenData = document.querySelector('.hidden-portfolio-data');
            if (hiddenData) {
                const hiddenImgs = hiddenData.getAttribute('data-images');
                if (hiddenImgs) allImages = allImages.concat(hiddenImgs.split(','));
            }

            // Remove duplicates and trim
            const uniqueImages = [...new Set(allImages.map(s => s.trim()))];
            openModal('Complete Portfolio', 'All Works', uniqueImages.join(','));
        });
    }

    if (closeModal && collectionModal) {
        closeModal.addEventListener('click', () => {
            collectionModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && collectionModal && collectionModal.classList.contains('active')) {
            collectionModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* --- Cinematic Loader --- */
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('.loader-content', { opacity: 1, duration: 0.5 })
        .to('.loader-logo', { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 1.8, 
            ease: 'expo.out' 
        }, 'reveal')
        .to('.loader-title', { 
            y: 0, 
            opacity: 1, 
            duration: 1.6, 
            ease: 'expo.out' 
        }, 'reveal+=0.3')
        .to('.loader-subtitle', { 
            y: 0, 
            opacity: 1, 
            duration: 1.6, 
            ease: 'expo.out' 
        }, 'reveal+=0.6')
        .to('.loader-line', { 
            scaleX: 1, 
            duration: 2, 
            ease: 'power4.inOut' 
        }, 'reveal+=0.4')
        .to('.loader-content', { 
            y: -30, 
            opacity: 0, 
            duration: 1.2, 
            delay: 1.8, 
            ease: 'power4.inOut' 
        })
        .to('#loader', {
            yPercent: -100,
            duration: 1.8,
            ease: 'expo.inOut'
        }, '-=0.8')
        .set('#loader', {
            display: 'none',
            onComplete: () => {
                initLightbox(); // New Global Init
                initBentoGallery();
                initCustomCursor(); // Radical New
                initEditorialAnimations(); // Radical New
                initPortfolio();
                initVideoModal(); 
                initHorizontalFilms(); // Radical New
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
            const typingTarget = section.querySelector('#typing-text');

            if (typingTarget) {
                const phrases = ["Emotion in Motion", "Timeless Frames", "Unscripted Beauty", "Your Legacy, Filmed"];
                let phraseIdx = 0;
                let charIdx = 0;
                let isDeleting = false;
                let typeSpeed = 100;

                function typeEffect() {
                    const current = phrases[phraseIdx];
                    if (isDeleting) {
                        typingTarget.textContent = current.substring(0, charIdx - 1);
                        charIdx--;
                        typeSpeed = 50;
                    } else {
                        typingTarget.textContent = current.substring(0, charIdx + 1);
                        charIdx++;
                        typeSpeed = 150;
                    }

                    if (!isDeleting && charIdx === current.length) {
                        isDeleting = true;
                        typeSpeed = 3000;
                    } else if (isDeleting && charIdx === 0) {
                        isDeleting = false;
                        phraseIdx = (phraseIdx + 1) % phrases.length;
                        typeSpeed = 500;
                    }
                    setTimeout(typeEffect, typeSpeed);
                }

                ScrollTrigger.create({
                    trigger: section,
                    start: "top 70%",
                    onEnter: () => { if (charIdx === 0 && !isDeleting) typeEffect(); },
                    once: true
                });
            }

            if (scrubVideo) {
                const scrubTl = gsap.timeline({
                    scrollTrigger: { 
                        trigger: section, 
                        start: "top bottom", 
                        end: "bottom top", 
                        scrub: 1 
                    }
                });
                const addVideoTween = () => {
                    scrubTl.fromTo(scrubVideo, { currentTime: 0 }, { currentTime: scrubVideo.duration || 1, ease: "none" });
                    
                    const scrollHint = section.querySelector('.experience-scroll-hint');
                    if (scrollHint) {
                        scrubTl.to(scrollHint, { opacity: 0, y: 20, duration: 0.2 }, 0);
                    }
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
            scrollTrigger: { trigger: el, start: 'top 90%' }
        });
    });

    // Magnetic Buttons
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });
}

/* --- Form Submission (Google Sheets Integration) --- */
const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; // Replace with your Google Apps Script URL
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const orig = btn.innerText;
        btn.innerText = "Sending...";
        btn.disabled = true;

        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(contactForm)
        })
        .then(response => {
            btn.innerText = "Thank you! We'll be in touch.";
            btn.style.background = "transparent"; 
            btn.style.color = "var(--gold)"; 
            btn.style.border = "1px solid var(--gold)";
            contactForm.reset();
            setTimeout(() => { 
                btn.innerText = orig; 
                btn.style = ""; 
                btn.disabled = false;
            }, 5000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.innerText = "Oops! Try again.";
            btn.style.background = "#ff3b30";
            btn.style.color = "#fff";
            setTimeout(() => { 
                btn.innerText = orig; 
                btn.style = ""; 
                btn.disabled = false;
            }, 3000);
        });
    });
}
/* --- Video Modal Logic --- */
function initVideoModal() {
    const videoModal = document.getElementById('video-modal');
    const playerWrapper = document.getElementById('youtube-player');
    const closeVideo = document.querySelector('.close-video');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const triggers = document.querySelectorAll('.film-trigger');

    if (!videoModal || !playerWrapper) return;

    const openVideo = (videoId) => {
        playerWrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoModal.classList.add('active');
        gsap.to(videoModal, { opacity: 1, duration: 0.5 });
        document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        gsap.to(videoModal, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => {
                videoModal.classList.remove('active');
                playerWrapper.innerHTML = ''; 
                document.body.style.overflow = '';
            } 
        });
    };

    triggers.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const videoId = item.getAttribute('data-video-id');
            if (videoId) openVideo(videoId);
        });
    });

    if (closeVideo) closeVideo.addEventListener('click', closeVideoModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

/* --- Custom Cinematic Cursor --- */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');
    
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        circleX += (mouseX - circleX) * 0.1;
        circleY += (mouseY - circleY) * 0.1;

        gsap.set(dot, { x: dotX, y: dotY });
        gsap.set(circle, { x: circleX, y: circleY });
    });

    const interactive = document.querySelectorAll('a, button, .editorial-item, .horizontal-film-card, .play-btn');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

/* --- Editorial Animations --- */
function initEditorialAnimations() {
    // Split Reveal for Hero
    const heroTl = gsap.timeline();
    heroTl.from('.hero-img-side', { xPercent: -100, duration: 1.5, ease: 'expo.inOut' })
          .from('.hero-text-side', { xPercent: 100, duration: 1.5, ease: 'expo.inOut' }, 0)
          .from('.hero-img-side img', { scale: 1.5, duration: 2, ease: 'expo.out' }, 0.5);

    // Character Reveal for Text
    document.querySelectorAll('.char-reveal, .split-reveal').forEach(text => {
        const content = text.innerText;
        text.innerHTML = content.split('').map(char => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        
        gsap.from(text.querySelectorAll('span'), {
            y: 100,
            opacity: 0,
            stagger: 0.02,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 90%'
            }
        });
    });
}

/* --- Horizontal Films Section --- */
function initHorizontalFilms() {
    const section = document.querySelector('.horizontal-films-section');
    const track = document.querySelector('.horizontal-track');
    
    if (!section || !track) return;

    const mainAnim = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.2),
        ease: 'none',
        scrollTrigger: {
            id: 'horizontalScrollTrigger',
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    // Parallax effect for cards
    document.querySelectorAll('.horizontal-film-card').forEach(card => {
        gsap.to(card.querySelector('img'), {
            x: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                containerAnimation: mainAnim, 
                start: 'left right',
                end: 'right left',
                scrub: true
            }
        });
    });
}
