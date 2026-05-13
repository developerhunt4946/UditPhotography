// --- PORTFOLIO DATA CONFIGURATION ---
const portfolioData = [
    {
        id: 1,
        category: 'wedding',
        title: 'The Royal Legacy',
        layout: 'item-large',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1000/v1778569978/017_compressed_oka7nj.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569978/017_compressed_oka7nj.webp'],
        metadata: 'ISO 100 | f/2.8 | 1/200',
        location: 'Udaipur, Rajasthan'
    },
    {
        id: 2,
        category: 'portraits',
        title: 'Grace in Motion',
        layout: 'item-portrait',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1000/v1778569979/018_compressed_oiyxja.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569979/018_compressed_oiyxja.webp'],
        metadata: 'ISO 400 | f/1.4 | 1/500',
        location: 'Editorial'
    },
    {
        id: 3,
        category: 'wedding',
        title: 'Mist & Mountains',
        layout: 'item-square',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1000/v1778569977/016_compressed_hohql7.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569977/016_compressed_hohql7.webp'],
        metadata: 'ISO 200 | f/4.0 | 1/1000',
        location: 'Ladakh'
    },
    {
        id: 4,
        category: 'wedding',
        title: 'Desert Symphony',
        layout: 'item-portrait',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1000/v1778569977/015_compressed_wpyyob.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569977/015_compressed_wpyyob.webp'],
        metadata: 'ISO 100 | f/2.0 | 1/800',
        location: 'Jaisalmer'
    },
    {
        id: 5,
        category: 'wedding',
        title: 'Golden Hour',
        layout: 'item-wide',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569976/014_compressed_aridyi.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569976/014_compressed_aridyi.webp'],
        metadata: 'ISO 100 | f/1.8 | 1/2000',
        location: 'Goa'
    },
    {
        id: 6,
        category: 'wedding',
        title: 'The Eternal Vow',
        layout: 'item-large',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1000/v1778569975/013_compressed_yjwy95.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569975/013_compressed_yjwy95.webp'],
        metadata: 'ISO 400 | f/2.8 | 1/100',
        location: 'Jaipur'
    },
    {
        id: 7,
        category: 'wedding',
        title: 'Sacred Threads',
        layout: 'item-portrait',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1000/v1778569974/012_compressed_f0h6n5.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569974/012_compressed_f0h6n5.webp'],
        metadata: 'ISO 800 | f/1.4 | 1/500',
        location: 'Varanasi'
    },
    {
        id: 8,
        category: 'wedding',
        title: 'Highland Tales',
        layout: 'item-wide',
        mainImage: 'https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569972/010_compressed_wnttav.webp',
        gallery: ['https://res.cloudinary.com/dctaobwaj/image/upload/f_auto,q_auto,w_1200/v1778569972/010_compressed_wnttav.webp'],
        metadata: 'ISO 100 | f/5.6 | 1/400',
        location: 'Manali'
    }
];

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
                    const prevImg = images[currentIndex];
                    currentIndex = (currentIndex + 1) % images.length;
                    const nextImg = images[currentIndex];

                    // Smooth GSAP Crossfade
                    gsap.to(prevImg, { opacity: 0, duration: 1.5, ease: "power1.inOut" });
                    gsap.to(nextImg, { opacity: 1, duration: 1.5, ease: "power1.inOut" });

                    // Maintain active class for lightbox logic
                    images.forEach(img => img.classList.remove('active'));
                    nextImg.classList.add('active');
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
                renderEditorialGrid(); // DYNAMIC LOAD
                initExperienceSection(); // Radical New
                initPortfolio();
                initVideoModal();
                initHorizontalFilms(); // Radical New
                initAllScrollTriggersSequentially();
                setTimeout(() => ScrollTrigger.refresh(), 500);
            }
        });
});

/* --- Experience Section Logic --- */
let typingTimeout; // Global to prevent multiple loops
function initExperienceSection() {
    // Parallax Background Image
    gsap.to('.experience-bg-img', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.experience-scrub-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Word Flipper Animation (Replaced Typewriter)
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const phrases = ['DIRECTING EMOTIONS', 'CRAFTING LEGACIES', 'UNSCRIPTED ARTISTRY'];
        let phraseIndex = 0;

        // Set initial state
        typingText.textContent = phrases[0];
        gsap.set(typingText, { opacity: 1, y: 0 });

        function flipWord() {
            gsap.to(typingText, {
                opacity: 0,
                y: -15,
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => {
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typingText.textContent = phrases[phraseIndex];

                    gsap.fromTo(typingText,
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                    );
                }
            });
        }

        // Start cycling
        setInterval(flipWord, 4000);
    }
}





/* --- Dynamic Portfolio Rendering --- */
function renderEditorialGrid() {
    const grid = document.querySelector('.editorial-grid');
    if (!grid) return;

    grid.innerHTML = portfolioData.map(item => `
        <div class="editorial-item ${item.layout} fade-up" data-category="${item.category}" data-title="${item.title}" data-images="${item.gallery.join(',')}">
            <div class="item-inner">
                <img src="${item.mainImage}" alt="${item.title}" loading="lazy">
                <div class="item-meta">
                    <span class="meta-data">${item.metadata}</span>
                    <h3>${item.title}</h3>
                    <span class="location">${item.location}</span>
                </div>
            </div>
        </div>
    `).join('');
}

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

        if (section.classList.contains('criss-cross-marquee')) {
            const rows = section.querySelectorAll('.marquee-row');
            rows.forEach((row, index) => {
                const content = row.querySelector('.marquee-content');
                const firstSpan = content.querySelector('span');
                if (firstSpan) {
                    for (let i = 0; i < 4; i++) {
                        content.appendChild(firstSpan.cloneNode(true));
                    }
                }
                const singleSetWidth = content.scrollWidth / 2;
                const direction = index % 2 === 0 ? -1 : 1;
                
                gsap.fromTo(content, 
                    { x: direction === -1 ? 0 : -singleSetWidth }, 
                    { x: direction === -1 ? -singleSetWidth : 0, ease: 'none', duration: 40, repeat: -1 }
                );
            });
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
// Replace with your actual Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbywGaY3RDH_4YzjJIq77HyiNzZSOdMX_deCAI2fYqI0iudsfAc3G9ojvlKLwcTPLP4/exec';

const contactForm = document.getElementById('contactForm');


// =========================
// Budget Slider Logic
// =========================

const budgetRange = document.getElementById('budget-range');
const budgetValue = document.getElementById('budget-value');

if (budgetRange && budgetValue) {

    budgetRange.addEventListener('input', (e) => {

        const val = parseInt(e.target.value);

        budgetValue.innerText = `₹${val.toLocaleString('en-IN')}`;

    });

}


// =========================
// Modal Budget Logic
// =========================

const modalRange = document.querySelector('.budget-modal-range');
const modalValue = document.querySelector('.budget-modal-val');

if (modalRange && modalValue) {

    modalRange.addEventListener('input', (e) => {

        const val = parseInt(e.target.value);

        modalValue.innerText = `₹${val.toLocaleString('en-IN')}`;

    });

}


// =========================
// Contact Form Submission
// =========================

// Contact Form Submission (Multiple Forms)
const bookingForms = document.querySelectorAll('.elegant-form');

bookingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.submit-btn');
        const orig = btn.innerText;

        btn.innerText = "Sending...";
        btn.disabled = true;

        const formData = new FormData(form);

        fetch(scriptURL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
            .then(() => {
                btn.innerText = "Thank you! We'll be in touch.";
                btn.style.background = "transparent";
                btn.style.color = "var(--gold)";
                btn.style.border = "1px solid var(--gold)";

                form.reset();

                setTimeout(() => {
                    btn.innerText = orig;
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.style.border = "";
                    btn.disabled = false;
                }, 5000);
            })
            .catch((error) => {
                btn.innerText = "Oops! Try again.";
                btn.style.background = "#ff3b30";
                btn.style.color = "#fff";

                setTimeout(() => {
                    btn.innerText = orig;
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.style.border = "";
                    btn.disabled = false;
                }, 3000);
            });
    });
});
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
        const content = text.innerHTML;
        // Split by HTML tags but keep the tags in the result
        const parts = content.split(/(<[^>]*>)/g);
        
        text.innerHTML = parts.map(part => {
            if (part.startsWith('<')) return part; // Return tags as is
            // Only split the actual text content
            return part.split('').map(char => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        }).join('');

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
