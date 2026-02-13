/* ========================================
   KINGZ OF TWINZ - Main JavaScript
   Roc Nation Inspired Interactions
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeaderScroll();
    initSmoothScroll();
    initScrollReveal();
    initCounterAnimation();
    initRosterFilter();
    initNewsCarousel();
    initContactForm();
    initHeroAnimation();
});

/* ========================================
   Navigation
======================================== */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/* ========================================
   Header Scroll Effect
======================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* ========================================
   Smooth Scroll
======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Scroll Reveal Animation - DRAMATIC
======================================== */
function initScrollReveal() {
    // Section overlap animations
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero
            section.classList.add('section-animate', 'section-overlap');
        }
    });

    // Individual element animations with dramatic effects
    const slideLeftElements = document.querySelectorAll('.about__content, .contact__info');
    const slideRightElements = document.querySelectorAll('.about__visual, .contact__form-wrapper');
    const scaleElements = document.querySelectorAll('.tour-card, .cta__content');
    const rotateElements = document.querySelectorAll('.section__header');

    slideLeftElements.forEach(el => el.classList.add('slide-in-left'));
    slideRightElements.forEach(el => el.classList.add('slide-in-right'));
    scaleElements.forEach(el => el.classList.add('scale-in'));
    rotateElements.forEach(el => el.classList.add('rotate-in'));

    // Stagger items with more dramatic entrance
    const talentCards = document.querySelectorAll('.talent-card');
    const serviceItems = document.querySelectorAll('.service-item');
    const newsCards = document.querySelectorAll('.news-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const statItems = document.querySelectorAll('.stat');

    talentCards.forEach(el => el.classList.add('stagger-item'));
    serviceItems.forEach(el => el.classList.add('stagger-item'));
    newsCards.forEach(el => el.classList.add('stagger-item'));
    filterBtns.forEach(el => el.classList.add('stagger-item'));
    statItems.forEach(el => el.classList.add('stagger-item'));

    // Intersection Observer for all animated elements - dramatic timing
    const animatedElements = document.querySelectorAll(
        '.section-animate, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .clip-reveal, .bounce-in'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add slight delay for dramatic effect
                requestAnimationFrame(() => {
                    entry.target.classList.add('in-view');
                });
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // Separate observer for sections to trigger child animations with drama
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dramatic section entrance
                requestAnimationFrame(() => {
                    entry.target.classList.add('in-view');
                });

                // Trigger stagger animations for children with dramatic timing
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('in-view');
                    }, 150 + (i * 120)); // Longer delays for drama
                });
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Parallax-like effect for sections on scroll (desktop only)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallaxElements();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// Subtle parallax effect for depth (desktop only)
function updateParallaxElements() {
    // Skip on mobile for performance
    if (window.innerWidth < 768) return;

    const sections = document.querySelectorAll('.section-overlap.in-view');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = (sectionCenter - viewportCenter) / windowHeight;

        // Subtle shadow intensity based on scroll position
        const shadowIntensity = Math.max(0.5, 1 - Math.abs(distance) * 0.5);
        section.style.boxShadow = `
            0 -${40 * shadowIntensity}px ${100 * shadowIntensity}px rgba(0, 0, 0, ${0.8 * shadowIntensity}),
            0 -10px 30px rgba(0, 0, 0, ${0.5 * shadowIntensity})
        `;
    });
}

/* ========================================
   Counter Animation
======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat__number[data-count]');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about__stats');
    if (statsSection) observer.observe(statsSection);

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(update);
        });
    }
}

/* ========================================
   Roster Filter
======================================== */
function initRosterFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const talentCards = document.querySelectorAll('.talent-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            talentCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // Initialize card styles
    talentCards.forEach(card => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

/* ========================================
   News Carousel
======================================== */
function initNewsCarousel() {
    const carousel = document.getElementById('newsCarousel');
    const track = carousel?.querySelector('.news__track');
    const prevBtn = document.querySelector('.news__nav-btn--prev');
    const nextBtn = document.querySelector('.news__nav-btn--next');

    if (!carousel || !track) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.news-card');
    const cardCount = cards.length;

    function getVisibleCards() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cardCount - visibleCards);
        currentIndex = Math.min(currentIndex, maxIndex);

        const cardWidth = cards[0]?.offsetWidth || 300;
        const gap = 24; // var(--spacing-lg)
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // Update button states
        prevBtn?.classList.toggle('disabled', currentIndex === 0);
        nextBtn?.classList.toggle('disabled', currentIndex >= maxIndex);
    }

    prevBtn?.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn?.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = cardCount - visibleCards;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Recalculate on resize
    window.addEventListener('resize', debounce(updateCarousel, 200));

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (diff > swipeThreshold) {
            // Swipe left - next
            nextBtn?.click();
        } else if (diff < -swipeThreshold) {
            // Swipe right - prev
            prevBtn?.click();
        }
    }
}

/* ========================================
   Contact Form
======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!validateForm(data)) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#22c55e';
            submitBtn.style.borderColor = '#22c55e';

            form.reset();

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.opacity = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter a valid name', 'error');
        return false;
    }

    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    if (!data.message || data.message.trim().length < 10) {
        showNotification('Please enter a message (at least 10 characters)', 'error');
        return false;
    }

    return true;
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    existing?.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ef4444' : '#22c55e'};
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

/* ========================================
   Hero Slideshow
======================================== */
function initHeroAnimation() {
    const slides = document.querySelectorAll('.hero__slide');
    const contents = document.querySelectorAll('.hero__slides-content .hero__content');
    const navBtns = document.querySelectorAll('.hero__nav-btn');

    let currentSlide = 0;
    const totalSlides = slides.length;
    const autoPlayInterval = 6000; // 6 seconds per slide
    let autoPlayTimer;

    function goToSlide(index) {
        // Remove active from all
        slides.forEach(s => s.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        navBtns.forEach(b => b.classList.remove('active'));

        // Add active to current
        slides[index]?.classList.add('active');
        contents[index]?.classList.add('active');
        navBtns[index]?.classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // Nav button clicks
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });

    // Pause on hover
    const hero = document.querySelector('.hero');
    hero?.addEventListener('mouseenter', stopAutoPlay);
    hero?.addEventListener('mouseleave', startAutoPlay);

    // Start autoplay
    startAutoPlay();

    // Initial animation for first slide
    setTimeout(() => {
        const firstContent = contents[0];
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }, 100);
}

/* ========================================
   Parallax Effect (Optional)
======================================== */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrolled <= heroHeight) {
            const bg = hero.querySelector('.hero__animated-bg');
            if (bg) {
                bg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    }, { passive: true });
}

// Uncomment to enable parallax
// initParallax();

/* ========================================
   Utility Functions
======================================== */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========================================
   Lazy Loading Images (Performance)
======================================== */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images have data-src
document.addEventListener('DOMContentLoaded', initLazyLoad);
