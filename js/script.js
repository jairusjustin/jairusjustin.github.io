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

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

/* ================= THEME ================= */
(function () {
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');

    // Load saved theme
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
        if (theme === 'dark') {
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>';
        } else {
            icon.innerHTML = '<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>';
        }
    }

    /* ================= REVEAL ANIMATIONS ================= */
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }

    /* ================= NAVIGATION HIGHLIGHT ================= */
    function initNavHighlight() {
        const navLinks = document.querySelectorAll('nav.main-nav a');
        const sections = {};

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(n => n.classList.remove('active'));
                link.classList.add('active');
            });
        });

        const sectionObserver = new IntersectionObserver((entries) => {
            let foundActive = false;
            
            entries.forEach(entry => {
                const sectionId = entry.target.getAttribute('id');
                const link = sections[sectionId];
                
                if (entry.isIntersecting && !foundActive) {
                    navLinks.forEach(n => n.classList.remove('active'));
                    if (link) {
                        link.classList.add('active');
                        foundActive = true;
                    }
                }
            });
        }, { 
            rootMargin: '-25% 0px -40% 0px',
            threshold: 0.1
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    sections[sectionId] = link;
                    sectionObserver.observe(section);
                }
            }
        });
    }

    /* ================= HOVER CAROUSELS ================= */
    function initHoverCarousels() {
        document.querySelectorAll('.hover-carousel').forEach(carousel => {
            const images = carousel.querySelectorAll('img');
            let index = 0;
            let timer;

            function showNextImage() {
                images.forEach((img, i) => img.classList.toggle('active', i === index));

                timer = setTimeout(() => {
                    index = (index + 1) % images.length;
                    showNextImage();
                }, 2500);
            }

            carousel.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                index = 0;
                showNextImage();
            });

            carousel.addEventListener('mouseleave', () => {
                clearTimeout(timer);
                images.forEach(img => img.classList.remove('active'));
                images[0].classList.add('active');
            });
        });
    }

    /* ================= CERTIFICATIONS CONFIG ================= */
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

    /* ================= EDGE-AWARE CERTIFICATIONS CAROUSEL ================= */
    class EdgeAwareCertificationsCarousel {
        constructor() {
            this.track = document.getElementById('carouselContainer');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            this.dotsWrap = document.getElementById('carouselDots');
            
            if (!this.track) return;
            
            // Use the external certifications data
            this.certifications = CERTIFICATIONS_DATA;
            
            // State variables
            this.currentIndex = 1; // Start with card 2 in the middle (index 1)
            this.isAnimating = false;
            this.autoSlideInterval = null;
            this.cardWidth = CAROUSEL_CONFIG.cardWidths.largeDesktop;
            this.visibleCards = 3;
            this.padding = 0;
            this.slideDirection = 'next'; // Start sliding to the right
            
            // Drag/swipe variables
            this.isDragging = false;
            this.startX = 0;
            this.currentTranslate = 0;
            this.prevTranslate = 0;
            
            this.init();
        }
        
        init() {
            this.generateCards();
            this.calculateDimensions();
            this.setupEventListeners();
            this.generateDots();
            this.centerCarousel(); // Center the second card initially
            this.updateNavigationButtons();
            this.startAutoSlide();
        }
        
        generateCards() {
            this.track.innerHTML = '';
            
            // Only generate the original cards (no clones)
            this.certifications.forEach((cert, idx) => {
                this.track.appendChild(this.createCard(cert, idx));
            });
            
            this.allCards = Array.from(this.track.children);
            this.totalCards = this.certifications.length;
        }
        
        createCard(cert, originalIndex) {
            const card = document.createElement('article');
            card.className = 'certification-card';
            card.dataset.id = cert.id;
            card.dataset.index = originalIndex;
            
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
            
            // Add symmetric padding to track for centering
            this.track.style.padding = `10px ${this.padding}px`;
        }
        
        centerCarousel() {
            // Calculate position to show current card in the middle
            const centerOffset = Math.floor(this.visibleCards / 2);
            let targetPosition = 0;
            
            // For card 2 (index 1) in middle: show cards 1, 2, 3
            if (this.currentIndex < centerOffset) {
                // For early cards (card 1, 2) when we're near the start
                targetPosition = 0;
            } else if (this.currentIndex > this.totalCards - 1 - centerOffset) {
                // For last cards when we're near the end
                targetPosition = this.totalCards - this.visibleCards;
            } else {
                // For middle cards
                targetPosition = this.currentIndex - centerOffset;
            }
            
            const translateX = -(targetPosition * this.cardWidth) + this.padding;
            this.track.style.transition = 'none';
            this.track.style.transform = `translateX(${translateX}px)`;
            
            // Force reflow
            this.track.offsetHeight;
            
            this.updateActiveStates();
        }
        
        slide(direction) {
            if (this.isAnimating || this.isDragging) return;
            
            const newIndex = direction === 'next' 
                ? this.currentIndex + 1 
                : this.currentIndex - 1;
            
            // Check bounds - REVERSE direction at edges for auto-slide
            let actualDirection = direction;
            if (newIndex < 0) {
                // At first card and trying to go prev
                if (this.autoSlideInterval) {
                    // Auto-slide: reverse direction
                    this.slideDirection = 'next';
                    return this.slide('next');
                } else {
                    // Manual click: do nothing
                    return;
                }
            } else if (newIndex >= this.totalCards) {
                // At last card and trying to go next
                if (this.autoSlideInterval) {
                    // Auto-slide: reverse direction
                    this.slideDirection = 'prev';
                    return this.slide('prev');
                } else {
                    // Manual click: do nothing
                    return;
                }
            }
            
            this.isAnimating = true;
            this.stopAutoSlide();
            
            this.currentIndex = newIndex;
            
            // Animate to new position
            this.track.style.transition = `transform ${CAROUSEL_CONFIG.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            
            // Calculate new position
            const centerOffset = Math.floor(this.visibleCards / 2);
            let targetPosition = 0;
            
            if (this.currentIndex < centerOffset) {
                targetPosition = 0;
            } else if (this.currentIndex > this.totalCards - 1 - centerOffset) {
                targetPosition = this.totalCards - this.visibleCards;
            } else {
                targetPosition = this.currentIndex - centerOffset;
            }
            
            const translateX = -(targetPosition * this.cardWidth) + this.padding;
            this.track.style.transform = `translateX(${translateX}px)`;
            
            this.updateActiveStates();
            this.updateNavigationButtons();
            
            // Reset animation state
            setTimeout(() => {
                this.isAnimating = false;
                this.startAutoSlide();
            }, CAROUSEL_CONFIG.transitionDuration);
        }
        
        updateActiveStates() {
            // Highlight the centered card
            this.allCards.forEach((card, index) => {
                const isCenter = index === this.currentIndex;
                card.classList.toggle('middle-card', isCenter);
                
                // Add faded class to adjacent cards (if they exist)
                if (this.visibleCards > 1) {
                    const isAdjacent = Math.abs(index - this.currentIndex) === 1;
                    card.classList.toggle('faded', isAdjacent);
                }
            });
            
            // Update dots
            const dots = this.dotsWrap.children;
            Array.from(dots).forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        updateNavigationButtons() {
            // Manual buttons still disabled at edges
            if (this.prevBtn) {
                const isAtStart = this.currentIndex === 0;
                this.prevBtn.style.opacity = isAtStart ? '0.3' : '1';
                this.prevBtn.style.pointerEvents = isAtStart ? 'none' : 'all';
                this.prevBtn.setAttribute('aria-disabled', isAtStart);
            }
            
            if (this.nextBtn) {
                const isAtEnd = this.currentIndex === this.totalCards - 1;
                this.nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
                this.nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'all';
                this.nextBtn.setAttribute('aria-disabled', isAtEnd);
            }
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
            if (this.isAnimating || this.isDragging || targetIndex === this.currentIndex) return;
            this.isAnimating = true;
            this.stopAutoSlide();
            
            this.currentIndex = targetIndex;
            
            // Update slide direction based on where we're going
            if (targetIndex > this.currentIndex) {
                this.slideDirection = 'next';
            } else if (targetIndex < this.currentIndex) {
                this.slideDirection = 'prev';
            }
            
            // Animate to target
            this.track.style.transition = `transform ${CAROUSEL_CONFIG.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            
            // Calculate position
            const centerOffset = Math.floor(this.visibleCards / 2);
            let targetPosition = 0;
            
            if (this.currentIndex < centerOffset) {
                targetPosition = 0;
            } else if (this.currentIndex > this.totalCards - 1 - centerOffset) {
                targetPosition = this.totalCards - this.visibleCards;
            } else {
                targetPosition = this.currentIndex - centerOffset;
            }
            
            const translateX = -(targetPosition * this.cardWidth) + this.padding;
            this.track.style.transform = `translateX(${translateX}px)`;
            
            this.updateActiveStates();
            this.updateNavigationButtons();
            
            setTimeout(() => {
                this.isAnimating = false;
                this.startAutoSlide();
            }, CAROUSEL_CONFIG.transitionDuration);
        }
        
        /* ================= DRAG/SWIPE METHODS ================= */
        dragStart(e) {
            if (this.isAnimating) return;
            
            this.stopAutoSlide();
            this.isDragging = true;
            
            // Get initial position
            if (e.type === 'touchstart') {
                this.startX = e.touches[0].clientX;
            } else {
                this.startX = e.clientX;
                e.preventDefault(); // Prevent text selection
            }
            
            // Get current translate value
            const style = window.getComputedStyle(this.track);
            const matrix = new DOMMatrix(style.transform);
            this.currentTranslate = matrix.m41; // Get translateX value
            this.prevTranslate = this.currentTranslate;
            
            // Add transition none during drag
            this.track.style.transition = 'none';
            this.track.style.cursor = 'grabbing';
        }
        
        drag(e) {
            if (!this.isDragging) return;
            
            let currentX;
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
            } else {
                currentX = e.clientX;
            }
            
            const diff = currentX - this.startX;
            const newTranslate = this.prevTranslate + diff;
            
            // Apply the drag translation
            this.track.style.transform = `translateX(${newTranslate}px)`;
            this.currentTranslate = newTranslate;
        }
        
        dragEnd(e) {
            if (!this.isDragging) return;
            
            this.isDragging = false;
            this.track.style.cursor = 'grab';
            this.track.style.transition = `transform ${CAROUSEL_CONFIG.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            
            // Calculate how far we dragged
            let endX;
            if (e.type === 'touchend') {
                endX = e.changedTouches[0].clientX;
            } else {
                endX = e.clientX;
            }
            
            const diff = endX - this.startX;
            const threshold = this.cardWidth * 0.3; // 30% of card width
            
            // Determine if drag was significant enough to change slide
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Dragged right = go to previous
                    this.slide('prev');
                } else {
                    // Dragged left = go to next
                    this.slide('next');
                }
            } else {
                // Not enough drag, snap back to current position
                this.snapBack();
            }
            
            this.startAutoSlide();
        }
        
        snapBack() {
            // Calculate proper position for current index
            const centerOffset = Math.floor(this.visibleCards / 2);
            let targetPosition = 0;
            
            if (this.currentIndex < centerOffset) {
                targetPosition = 0;
            } else if (this.currentIndex > this.totalCards - 1 - centerOffset) {
                targetPosition = this.totalCards - this.visibleCards;
            } else {
                targetPosition = this.currentIndex - centerOffset;
            }
            
            const translateX = -(targetPosition * this.cardWidth) + this.padding;
            this.track.style.transform = `translateX(${translateX}px)`;
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
                    this.updateNavigationButtons();
                }, 100);
            });
            
            // ================= DRAG/SWIPE SUPPORT =================
            // Prevent image drag behavior
            this.track.querySelectorAll('img').forEach(img => {
                img.addEventListener('dragstart', (e) => e.preventDefault());
            });
            
            // Mouse events for desktop drag
            this.track.addEventListener('mousedown', this.dragStart.bind(this));
            this.track.addEventListener('mousemove', this.drag.bind(this));
            this.track.addEventListener('mouseup', this.dragEnd.bind(this));
            this.track.addEventListener('mouseleave', this.dragEnd.bind(this));
            
            // Touch events for mobile swipe
            this.track.addEventListener('touchstart', this.dragStart.bind(this), { passive: false });
            this.track.addEventListener('touchmove', this.drag.bind(this), { passive: false });
            this.track.addEventListener('touchend', this.dragEnd.bind(this));
            
            // Prevent context menu on drag
            this.track.addEventListener('contextmenu', (e) => e.preventDefault());
            
            // Set initial cursor
            this.track.style.cursor = 'grab';
        }
        
        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => {
                // Auto-slide will reverse direction at edges
                this.slide(this.slideDirection);
            }, CAROUSEL_CONFIG.autoSlideInterval);
        }
        
        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize certifications carousel
        new EdgeAwareCertificationsCarousel();
        
        // Initialize other features
        initRevealAnimations();
        initNavHighlight();
        initHoverCarousels();
    });
})();