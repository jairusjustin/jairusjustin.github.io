/* ================= LOADER ================= */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('pageLoader')?.classList.add('fade-out');
    }, 1000);
});

/* ================= MODAL ================= */
function openModal(e) {
    e.preventDefault();
    const modal = document.getElementById('emailModal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('emailModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

/* ================= THEME ================= */
(function () {
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');

    const saved = localStorage.getItem('jj_theme') || 'light';
    body.dataset.theme = saved;
    update(saved);

    toggle?.addEventListener('click', () => {
        const next = body.dataset.theme === 'light' ? 'dark' : 'light';
        body.dataset.theme = next;
        localStorage.setItem('jj_theme', next);
        update(next);
    });

    function update(theme) {
        toggle?.setAttribute('aria-pressed', theme === 'dark');
        icon.innerHTML =
            theme === 'dark'
                ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.4"/>'
                : '<path d="M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="1.4"/>';
    }

    /* ================= REVEAL ================= */
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('show')),
        { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ================= CERTIFICATIONS CONFIG ================= */
    // Add/remove certifications here
    const CERTIFICATIONS_DATA = [
        {
            id: 'data-analyst-associate',
            title: "Data Analyst Associate",
            issuer: "DataCamp",
            date: "Nov 2025",
            desc: "Entry-level data analysis skills in data management, exploratory analysis, statistics, and data visualization.",
            logo: "https://cdn.brandfetch.io/idou89mSUh/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1680282023371",
            link: "https://www.datacamp.com/certificate/DAA0018323980754"
        },
        {
            id: 'sql-associate',
            title: "SQL Associate",
            issuer: "DataCamp",
            date: "Sep 2025",
            desc: "SQL-based data analysis skills covering data management and exploratory analysis.",
            logo: "https://cdn.brandfetch.io/idou89mSUh/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1680282023371",
            link: "https://www.datacamp.com/certificate/SQA0010871924279"
        },
        {
            id: 'it-specialist-data-analytics',
            title: "IT Specialist - Data Analytics",
            issuer: "Certiport - Pearson VUE",
            date: "May 2024",
            desc: "Applied data analysis techniques, statistical methods, and business intelligence concepts.",
            logo: "https://cdn.brandfetch.io/idTP8ahOXq/w/1800/h/431/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1753779876783",
            link: "https://www.credly.com/badges/1cd55d9b-3c51-4563-a32c-03b4633d8ad3/public_url"
        },
        {
            id: 'google-data-analytics',
            title: "Google Data Analytics",
            issuer: "Google Career Certificates",
            date: "Jun 2024",
            desc: "Practical data cleaning, analysis, programming, and data visualization skills.",
            logo: "google", 
            link: "https://coursera.org/share/3be08ed910054b1a5ed9e0c09b8e4d46"
        },
        {
            id: 'it-passport-exam',
            title: "Information Technology Passport Exam",
            issuer: "PhilNITS",
            date: "Nov 2024",
            desc: "Japanese IT certification covering technology strategy, management, and business fundamentals.",
            logo: "https://upload.wikimedia.org/wikipedia/en/c/cb/Philnitslogo.png",
            link: "https://www.itpec.org/statsandresults/all-passers-information/Philippines/2024A_IP.pdf"
        },
        {
            id: 'data-analytics-essentials',
            title: "Data Analytics Essentials",
            issuer: "Cisco",
            date: "Nov 2023",
            desc: "Foundational data analytics concepts, visualization techniques, and analytical thinking.",
            logo: "https://cdn.brandfetch.io/idqG-yHws9/w/400/h/400/theme/dark/icon.jpeg",
            link: "https://www.credly.com/badges/7a46ecf0-e3d9-466a-9765-6772976c49cd/linked_in_profile"
        },
        {
            id: 'intro-data-science',
            title: "Introduction to Data Science",
            issuer: "Cisco",
            date: "Dec 2023",
            desc: "Introduction to data science principles, statistical analysis, and machine learning basics.",
            logo: "https://cdn.brandfetch.io/idqG-yHws9/w/400/h/400/theme/dark/icon.jpeg",
            link: "https://www.credly.com/badges/86413651-8344-469b-a2cc-bfc79128b4fd"
        },
        {
            id: 'it-specialist-databases',
            title: "IT Specialist - Databases",
            issuer: "Certiport - Pearson VUE",
            date: "May 2023",
            desc: "Database design and SQL querying skills",
            logo: "https://cdn.brandfetch.io/idTP8ahOXq/w/1800/h/431/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1753779876783",
            link: "https://www.credly.com/badges/748f592d-a4ad-4acc-a9d9-8ed5fb853e4e/linked_in_profile"
        }
        //  ADD NEW CERTIFICATIONS HERE:
        // {
        //     id: 'unique-id',
        //     title: "New Certification",
        //     issuer: "Issuer Name",
        //     date: "Month Year",
        //     desc: "Description here",
        //     logo: "logo-url-or-google",
        //     link: "verification-link"
        // }
    ];

    /* ================= CAROUSEL CONFIG ================= */
    const CAROUSEL_CONFIG = {
        autoSlideInterval: 4000,      // Time between auto-slides (ms)
        transitionDuration: 500,      // Animation duration (ms)
        cloneSets: 3,                 // Number of clone sets for infinite scroll
        breakpoints: {                // Responsive breakpoints
            mobile: 668,              // ≤ 667px
            tablet: 809,              // 668-808px
            smallDesktop: 1041,       // 809-1040px
            largeDesktop: 1041        // ≥ 1041px
        },
        cardWidths: {                 // Card widths per breakpoint
            mobile: 344,
            tablet: 216,
            smallDesktop: 264,
            largeDesktop: 332
        }
    };

    /* ================= CERTIFICATIONS CAROUSEL ================= */
    class InfiniteCertificationsCarousel {
        constructor() {
            this.track = document.getElementById('carouselContainer');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            this.dotsWrap = document.getElementById('carouselDots');
            
            if (!this.track) return;
            
            // Use the external certifications data
            this.certifications = CERTIFICATIONS_DATA;
            
            // State variables
            this.currentPosition = 0;
            this.isAnimating = false;
            this.autoSlideInterval = null;
            this.cardWidth = CAROUSEL_CONFIG.cardWidths.largeDesktop;
            this.visibleCards = 3;
            this.padding = 0;
            
            this.init();
        }
        
        init() {
            this.generateCards();
            this.calculateDimensions();
            this.setupEventListeners();
            this.generateDots();
            this.centerCarousel();
            this.startAutoSlide();
        }
        
        generateCards() {
            this.track.innerHTML = '';
            
            const { cloneSets } = CAROUSEL_CONFIG;
            
            // Clone sets BEFORE original
            for (let set = cloneSets; set >= 1; set--) {
                this.certifications.forEach((cert, idx) => {
                    this.track.appendChild(this.createCard(cert, idx, `clone-before-${set}`));
                });
            }
            
            // Original set
            this.certifications.forEach((cert, idx) => {
                this.track.appendChild(this.createCard(cert, idx, 'original'));
            });
            
            // Clone sets AFTER original
            for (let set = 1; set <= cloneSets; set++) {
                this.certifications.forEach((cert, idx) => {
                    this.track.appendChild(this.createCard(cert, idx, `clone-after-${set}`));
                });
            }
            
            this.allCards = Array.from(this.track.children);
            this.uniqueCardsCount = this.certifications.length;
            this.cloneCount = this.uniqueCardsCount * cloneSets;
            this.totalCards = this.allCards.length;
            
            // Start in the middle (original section)
            this.currentPosition = this.cloneCount;
        }
        
        createCard(cert, originalIndex, type) {
            const card = document.createElement('article');
            card.className = 'certification-card';
            card.dataset.id = cert.id;
            card.dataset.originalIndex = originalIndex;
            card.dataset.type = type;
            
            // Handle Google logo (special case)
            let logoHTML = '';
            if (cert.logo === 'google') {
                logoHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                `;
            } else {
                logoHTML = `<img src="${cert.logo}" alt="${cert.issuer}" width="32" height="32" loading="lazy">`;
            }
            
            card.innerHTML = `
                <div class="certification-visual">
                    <div class="cert-logo">
                        ${logoHTML}
                    </div>
                    <div class="cert-ornament"></div>
                </div>
                <div class="certification-content">
                    <div class="cert-meta">
                        <span class="cert-issuer">${cert.issuer}</span>
                        <span class="cert-date">${cert.date}</span>
                    </div>
                    <h4 class="cert-title">${cert.title}</h4>
                    <p class="cert-desc">${cert.desc}</p>
                    <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-link">
                        <span>View credential</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            `;
            
            return card;
        }
        
        calculateDimensions() {
            const containerWidth = this.track.parentElement.offsetWidth;
            const { breakpoints, cardWidths } = CAROUSEL_CONFIG;
            
            if (window.innerWidth < breakpoints.mobile) {
                this.visibleCards = 1;
                this.cardWidth = cardWidths.mobile;
                this.padding = (containerWidth - this.cardWidth) / 2;
            } else if (window.innerWidth < breakpoints.tablet) {
                this.visibleCards = 3;
                this.cardWidth = cardWidths.tablet;
                this.padding = (containerWidth - (this.cardWidth * this.visibleCards)) / 2;
            } else if (window.innerWidth < breakpoints.smallDesktop) {
                this.visibleCards = 3;
                this.cardWidth = cardWidths.smallDesktop;
                this.padding = (containerWidth - (this.cardWidth * this.visibleCards)) / 2;
            } else {
                this.visibleCards = 3;
                this.cardWidth = cardWidths.largeDesktop;
                this.padding = (containerWidth - (this.cardWidth * this.visibleCards)) / 2;
            }
            
            // Add padding to track for centering
            this.track.style.padding = `10px ${this.padding}px`;
        }
        
        centerCarousel() {
            const translateX = -((this.currentPosition * this.cardWidth) - this.padding);
            this.track.style.transition = 'none';
            this.track.style.transform = `translateX(${translateX}px)`;
            
            // Force reflow
            this.track.offsetHeight;
            
            this.updateActiveStates();
        }
        
        slide(direction) {
            if (this.isAnimating) return;
            this.isAnimating = true;
            
            this.stopAutoSlide();
            
            const step = direction === 'next' ? 1 : -1;
            const targetPosition = this.currentPosition + step;
            
            // Pre-check if we need to jump before animating
            const isCrossingBoundary = direction === 'next' ? 
                targetPosition >= this.cloneCount + this.uniqueCardsCount - Math.floor(this.visibleCards/2) :
                targetPosition < this.cloneCount - Math.floor(this.visibleCards/2);
            
            if (isCrossingBoundary) {
                // INSTANT jump to opposite side (no animation)
                const jumpAmount = direction === 'next' ? -this.uniqueCardsCount : this.uniqueCardsCount;
                this.currentPosition += jumpAmount;
                
                this.track.style.transition = 'none';
                const translateX = -((this.currentPosition * this.cardWidth) - this.padding);
                this.track.style.transform = `translateX(${translateX}px)`;
                this.track.offsetHeight;
            }
            
            // Now do the smooth slide animation
            this.track.style.transition = `transform ${CAROUSEL_CONFIG.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            this.currentPosition += step;
            
            const translateX = -((this.currentPosition * this.cardWidth) - this.padding);
            this.track.style.transform = `translateX(${translateX}px)`;
            
            this.updateActiveStates();
            
            // Reset animation state after transition
            setTimeout(() => {
                this.isAnimating = false;
                this.startAutoSlide();
            }, CAROUSEL_CONFIG.transitionDuration);
        }
        
        updateActiveStates() {
            // Calculate which card should be centered
            const centerOffset = Math.floor(this.visibleCards / 2);
            const centerIndex = this.currentPosition + centerOffset;
            
            // Update middle-card class on all cards
            this.allCards.forEach((card, index) => {
                const isCenter = index === centerIndex;
                card.classList.toggle('middle-card', isCenter);
            });
            
            // Update dots
            const originalIndex = ((centerIndex - this.cloneCount) % this.uniqueCardsCount + this.uniqueCardsCount) % this.uniqueCardsCount;
            const dots = this.dotsWrap.children;
            
            Array.from(dots).forEach((dot, index) => {
                dot.classList.toggle('active', index === originalIndex);
            });
        }
        
        generateDots() {
            this.dotsWrap.innerHTML = '';
            
            this.certifications.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', `Go to certification ${index + 1}`);
                dot.addEventListener('click', () => {
                    this.goToCertification(index);
                });
                this.dotsWrap.appendChild(dot);
            });
        }
        
        goToCertification(targetIndex) {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.stopAutoSlide();
            
            // Find the target card in the original section
            const targetOriginalIndex = this.cloneCount + targetIndex;
            const currentCenter = this.currentPosition + Math.floor(this.visibleCards / 2);
            
            // Calculate the shortest distance to target
            let distance = targetOriginalIndex - currentCenter;
            
            // Check if going forward or backward is shorter
            const forwardDistance = distance >= 0 ? distance : distance + this.uniqueCardsCount;
            const backwardDistance = distance <= 0 ? Math.abs(distance) : Math.abs(distance - this.uniqueCardsCount);
            
            // Choose shortest path
            if (forwardDistance <= backwardDistance) {
                this.currentPosition += forwardDistance;
            } else {
                this.currentPosition -= backwardDistance;
            }
            
            // Animate to target
            this.track.style.transition = `transform ${CAROUSEL_CONFIG.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            const translateX = -((this.currentPosition * this.cardWidth) - this.padding);
            this.track.style.transform = `translateX(${translateX}px)`;
            
            this.updateActiveStates();
            
            // Handle boundary after animation
            setTimeout(() => {
                // Check if we need to jump to maintain infinite feel
                if (this.currentPosition >= this.cloneCount + this.uniqueCardsCount - 2) {
                    this.currentPosition -= this.uniqueCardsCount;
                    this.track.style.transition = 'none';
                    const newTranslateX = -((this.currentPosition * this.cardWidth) - this.padding);
                    this.track.style.transform = `translateX(${newTranslateX}px)`;
                    this.track.offsetHeight;
                } else if (this.currentPosition <= this.cloneCount + 2) {
                    this.currentPosition += this.uniqueCardsCount;
                    this.track.style.transition = 'none';
                    const newTranslateX = -((this.currentPosition * this.cardWidth) - this.padding);
                    this.track.style.transform = `translateX(${newTranslateX}px)`;
                    this.track.offsetHeight;
                }
                
                this.isAnimating = false;
                this.startAutoSlide();
            }, CAROUSEL_CONFIG.transitionDuration);
        }
        
        setupEventListeners() {
            // Navigation buttons
            this.prevBtn?.addEventListener('click', () => this.slide('prev'));
            this.nextBtn?.addEventListener('click', () => this.slide('next'));
            
            // Pause on hover
            this.track.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.track.addEventListener('mouseleave', () => this.startAutoSlide());
            
            // Handle resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.calculateDimensions();
                    this.centerCarousel();
                }, 100);
            });
            
            // Touch/swipe support
            let startX = 0;
            let isSwiping = false;
            const swipeThreshold = 50;
            
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isSwiping = true;
                this.stopAutoSlide();
            }, { passive: true });
            
            this.track.addEventListener('touchend', (e) => {
                if (!isSwiping) return;
                isSwiping = false;
                
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        this.slide('next');
                    } else {
                        this.slide('prev');
                    }
                } else {
                    this.startAutoSlide();
                }
            }, { passive: true });
        }
        
        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => {
                this.slide('next');
            }, CAROUSEL_CONFIG.autoSlideInterval);
        }
        
        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }
    }

    // Initialize the carousel
    document.addEventListener('DOMContentLoaded', () => {
        new InfiniteCertificationsCarousel();
    });
})();