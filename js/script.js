window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('pageLoader').classList.add('fade-out');
    }, 1000);
});

// Modal functionality
function openModal(e) {
    e.preventDefault();
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
});

// Theme toggle functionality
(function() {
    const root = document.getElementById('page');
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');

    // Load saved theme
    const saved = localStorage.getItem('jj_theme') || 'light';
    root.setAttribute('data-theme', saved);
    updateToggle(saved);

    toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('jj_theme', next);
        updateToggle(next);
    });

    function updateToggle(theme) {
        toggle.setAttribute('aria-pressed', theme === 'dark');
        
        if (theme === 'dark') {
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>';
        } else {
            icon.innerHTML = '<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>';
        }
    }

    // Scroll reveal animations
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

    // Navigation highlight
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

    // Hover carousels
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

    // Certifications carousel
    function initCertificationsCarousel() {
        const carouselContainer = document.getElementById('carouselContainer');
        if (!carouselContainer) return;

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carouselDots = document.getElementById('carouselDots');
        
        const originalCards = Array.from(document.querySelectorAll('.certification-card:not(.clone)'));
        const totalRealCards = originalCards.length;
        let currentIndex = 3;
        let autoScrollInterval;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        const AUTO_SCROLL_DELAY = 4000;
        const TRANSITION_DURATION = 500;
        
        let CONTAINER_WIDTH, CARD_WIDTH, VISIBLE_CARDS;

        function startAutoScroll() {
            stopAutoScroll();
            if (VISIBLE_CARDS === 1) return;
            
            autoScrollInterval = setInterval(() => {
                handleNext();
            }, AUTO_SCROLL_DELAY);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        function restartAutoScroll() {
            stopAutoScroll();
            startAutoScroll();
        }

        function updateDimensions() {
            if (window.innerWidth >= 1041) {
                CONTAINER_WIDTH = 1020;
                CARD_WIDTH = 300 + 32;
                VISIBLE_CARDS = 3;
            } else if (window.innerWidth >= 809) {
                CONTAINER_WIDTH = 800;
                CARD_WIDTH = 240 + 24;
                VISIBLE_CARDS = 3;
            } else if (window.innerWidth >= 668) {
                CONTAINER_WIDTH = 640;
                CARD_WIDTH = 200 + 16;
                VISIBLE_CARDS = 3;
            } else {
                CONTAINER_WIDTH = 344;
                CARD_WIDTH = 320 + 24;
                VISIBLE_CARDS = 1;
            }
        }

function cloneCards() {
    const existingClones = carouselContainer.querySelectorAll('.certification-card.clone');
    existingClones.forEach(clone => clone.remove());
    
    if (VISIBLE_CARDS === 1) {
        // SINGLE MODE: Create proper infinite scroll structure
        // [LAST_CLONE] + [ALL_REAL_CARDS] + [FIRST_CLONE]
        
        // Add last card as clone at beginning
        const firstClone = originalCards[totalRealCards - 1].cloneNode(true);
        firstClone.classList.add('clone');
        carouselContainer.appendChild(firstClone);
        
        // Add all original cards
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
            carouselContainer.appendChild(clone);
        });
        
        // Add first card as clone at end  
        const lastClone = originalCards[0].cloneNode(true);
        lastClone.classList.add('clone');
        carouselContainer.appendChild(lastClone);
        
        currentIndex = 1; // Start at first real card
    } else {
        // Multi-card mode: existing clone logic
        const beginningCards = [6, 0, 1];
        for (let i = 0; i < beginningCards.length; i++) {
            const clone = originalCards[beginningCards[i]].cloneNode(true);
            clone.classList.add('clone');
            carouselContainer.insertBefore(clone, carouselContainer.firstChild);
        }
        
        for (let i = 0; i < 3; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            carouselContainer.appendChild(clone);
        }
        currentIndex = 3;
    }
    
    centerCarousel();
}
        
        function getAllCards() {
            return document.querySelectorAll('.certification-card');
        }
        
function centerCarousel() {
    updateDimensions();
    
    if (VISIBLE_CARDS === 1) {
        // Use the working formula from earlier
        const visibleContainer = carouselContainer.parentElement.clientWidth;
        const translateX = (visibleContainer) - (CARD_WIDTH / 2) - (currentIndex * CARD_WIDTH);
        carouselContainer.style.transform = `translateX(${translateX}px)`;
    } else {
        const cardsWidth = CARD_WIDTH * 3;
        const offset = (CONTAINER_WIDTH - cardsWidth) / 2;
        const translateX = -((currentIndex * CARD_WIDTH) - offset);
        carouselContainer.style.transform = `translateX(${translateX}px)`;
    }
    
    updateCardFocus();
    updateDots();
}
        
        function updateCardFocus() {
            const allCards = getAllCards();
            
            allCards.forEach((card, index) => {
                card.classList.remove('middle-card');
                
                if (VISIBLE_CARDS === 1) {
                    if (index === currentIndex) {
                        card.classList.add('middle-card');
                    }
                } else {
                    const middleIndex = currentIndex + 1;
                    if (index === middleIndex) {
                        card.classList.add('middle-card');
                    }
                }
            });
        }
        
        function createDots() {
            if (!carouselDots) return;
            
            carouselDots.innerHTML = '';
            
            for (let i = 0; i < totalRealCards; i++) {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (i === 0) dot.classList.add('active');
                
dot.addEventListener('click', () => {
    if (VISIBLE_CARDS === 1) {
        currentIndex = i + 1; // +1 because real cards start at index 1 (clone at 0)
    } else {
        currentIndex = i + 3;
    }
    updateCarousel();
    restartAutoScroll();
});
                
                carouselDots.appendChild(dot);
            }
            
            updateDots();
        }
        
        function updateDots() {
            const dots = document.querySelectorAll('.carousel-dot');
            if (dots.length === 0) return;
            
            let activeDotIndex;
            
            if (VISIBLE_CARDS === 1) {
        activeDotIndex = currentIndex - 1;
        if (activeDotIndex < 0) activeDotIndex = totalRealCards - 1; // Last dot for first clone
        if (activeDotIndex >= totalRealCards) activeDotIndex = 0; // First dot for last clone
            } else {
                const allCards = getAllCards();
                const middleIndex = currentIndex + 1;
                const totalAllCards = allCards.length;
                
                if (middleIndex < 3) {
                    activeDotIndex = totalRealCards - 3 + middleIndex;
                } else if (middleIndex >= totalAllCards - 3) {
                    activeDotIndex = middleIndex - (totalAllCards - 3);
                } else {
                    activeDotIndex = middleIndex - 3;
                }
                
                activeDotIndex = activeDotIndex % totalRealCards;
            }
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        }
        
function updateCarousel() {
    updateDimensions();
    const allCards = getAllCards();
    const totalAllCards = allCards.length;
    
    let isJumping = false;
    
    if (VISIBLE_CARDS === 1) {
        // SINGLE MODE: Handle infinite scroll with clones
        if (currentIndex >= totalAllCards - 1) {
            // Jump from last clone to first real card
            isJumping = true;
            setTimeout(() => {
                carouselContainer.style.transition = 'none';
                currentIndex = 1; // Jump to first real card
                const visibleContainer = carouselContainer.parentElement.clientWidth;
                const translateX = (visibleContainer) - (CARD_WIDTH / 2) - (currentIndex * CARD_WIDTH);
                carouselContainer.style.transform = `translateX(${translateX}px)`;
                
                requestAnimationFrame(() => {
                    updateCardFocus();
                    updateDots();
                    requestAnimationFrame(() => {
                        carouselContainer.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
                    });
                });
            }, TRANSITION_DURATION);
        } else if (currentIndex <= 0) {
            // Jump from first clone to last real card
            isJumping = true;
            setTimeout(() => {
                carouselContainer.style.transition = 'none';
                currentIndex = totalAllCards - 2; // Jump to last real card
                const visibleContainer = carouselContainer.parentElement.clientWidth;
                const translateX = (visibleContainer) - (CARD_WIDTH / 2) - (currentIndex * CARD_WIDTH);
                carouselContainer.style.transform = `translateX(${translateX}px)`;
                
                requestAnimationFrame(() => {
                    updateCardFocus();
                    updateDots();
                    requestAnimationFrame(() => {
                        carouselContainer.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
                    });
                });
            }, TRANSITION_DURATION);
        }
        
        const visibleContainer = carouselContainer.parentElement.clientWidth;
        const translateX = (visibleContainer) - (CARD_WIDTH / 2) - (currentIndex * CARD_WIDTH);
        carouselContainer.style.transform = `translateX(${translateX}px)`;
        
        if (!isJumping) {
            updateCardFocus();
            updateDots();
        }
    } else {
                const cardsWidth = CARD_WIDTH * 3;
                const offset = (CONTAINER_WIDTH - cardsWidth) / 2;
                
                if (currentIndex >= totalAllCards - 3) {
                    isJumping = true;
                    setTimeout(() => {
                        carouselContainer.style.transition = 'none';
                        currentIndex = 3;
                        const newTranslateX = -((currentIndex * CARD_WIDTH) - offset);
                        carouselContainer.style.transform = `translateX(${newTranslateX}px)`;
                        
                        requestAnimationFrame(() => {
                            updateCardFocus();
                            updateDots();
                            
                            requestAnimationFrame(() => {
                                carouselContainer.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
                            });
                        });
                    }, TRANSITION_DURATION);
                } else if (currentIndex < 3) {
                    isJumping = true;
                    setTimeout(() => {
                        carouselContainer.style.transition = 'none';
                        currentIndex = totalAllCards - 4;
                        const newTranslateX = -((currentIndex * CARD_WIDTH) - offset);
                        carouselContainer.style.transform = `translateX(${newTranslateX}px)`;
                        
                        requestAnimationFrame(() => {
                            updateCardFocus();
                            updateDots();
                            
                            requestAnimationFrame(() => {
                                carouselContainer.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
                            });
                        });
                    }, TRANSITION_DURATION);
                }
                
                const translateX = -((currentIndex * CARD_WIDTH) - offset);
                carouselContainer.style.transform = `translateX(${translateX}px)`;
            }
            
            if (!isJumping) {
                updateCardFocus();
                updateDots();
            }
        }
        
        function handlePrev() {
            currentIndex--;
            updateCarousel();
            restartAutoScroll();
        }
        
        function handleNext() {
            currentIndex++;
            updateCarousel();
            restartAutoScroll();
        }

        function setupSwipe() {
            const threshold = window.innerWidth <= 667 ? 30 : 50;
            
            carouselContainer.addEventListener('mousedown', handleDragStart);
            carouselContainer.addEventListener('touchstart', handleDragStart);
            
            carouselContainer.addEventListener('mousemove', handleDragMove);
            carouselContainer.addEventListener('touchmove', handleDragMove);
            
            carouselContainer.addEventListener('mouseup', handleDragEnd);
            carouselContainer.addEventListener('touchend', handleDragEnd);
            carouselContainer.addEventListener('mouseleave', handleDragEnd);

            function handleDragStart(e) {
                stopAutoScroll();
                isDragging = true;
                carouselContainer.classList.add('grabbing');
                
                startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
                currentX = startX;
            }

            function handleDragMove(e) {
                if (!isDragging) return;
                
                e.preventDefault();
                currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            }

            function handleDragEnd() {
                if (!isDragging) return;
                
                isDragging = false;
                carouselContainer.classList.remove('grabbing');
                
                const diff = startX - currentX;
                
                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        handleNext();
                    } else {
                        handlePrev();
                    }
                }
                
                restartAutoScroll();
            }
        }
        
        function initEventListeners() {
            if (prevBtn) prevBtn.addEventListener('click', handlePrev);
            if (nextBtn) nextBtn.addEventListener('click', handleNext);
            
            if (VISIBLE_CARDS > 1) {
                carouselContainer.addEventListener('mouseenter', stopAutoScroll);
                carouselContainer.addEventListener('mouseleave', startAutoScroll);
            }
        }
        
        function init() {
            updateDimensions();
            cloneCards();
            createDots();
            setupSwipe();
            initEventListeners();
            startAutoScroll();
        }
        
        function handleResize() {
            const oldVisibleCards = VISIBLE_CARDS;
            updateDimensions();
            
            if (oldVisibleCards !== VISIBLE_CARDS) {
                cloneCards();
                createDots();
            }
            
            centerCarousel();
            restartAutoScroll();
        }
        
        init();
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 150);
        });
    }

    // Initialize all components
    initRevealAnimations();
    initNavHighlight();
    initHoverCarousels();
    initCertificationsCarousel();
})();

// Initialize certifications carousel
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initCertificationsCarousel === 'function') {
        initCertificationsCarousel();
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof initCertificationsCarousel === 'function') {
            initCertificationsCarousel();
        }
    });
} else {
    if (typeof initCertificationsCarousel === 'function') {
        initCertificationsCarousel();
    }
}