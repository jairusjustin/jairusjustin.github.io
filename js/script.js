// Email Modal Functions - ADD THESE AT THE TOP
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

(function(){
    const root = document.getElementById('page');
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');

    // load saved theme
    const saved = localStorage.getItem('jj_theme') || 'light';
    root.setAttribute('data-theme', saved);
    updateToggle(saved);

    toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('jj_theme', next);
        updateToggle(next);
    });

    function updateToggle(theme){
        // accessibility
        toggle.setAttribute('aria-pressed', theme === 'dark');
        // swap simple icon: sun for light, moon for dark
        if(theme === 'dark'){
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>';
        } else {
            icon.innerHTML = '<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>';
        }
    }

    // Improved Reveal on scroll (IntersectionObserver)
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Don't unobserve to allow re-animation if needed
                } else {
                    // Optional: remove show class when element leaves viewport
                    // entry.target.classList.remove('show');
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

    // Fixed active nav highlight using Intersection Observer
    function initNavHighlight() {
        const navLinks = document.querySelectorAll('nav.main-nav a');
        const sections = {};

        // Create a map of section IDs to their nav links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    sections[sectionId] = link;
                }
            }
        });

        const sectionObserver = new IntersectionObserver((entries) => {
            let foundActive = false;
            
            // First pass: find the most relevant section
            entries.forEach(entry => {
                const sectionId = entry.target.getAttribute('id');
                const link = sections[sectionId];
                
                if (entry.isIntersecting && !foundActive) {
                    // Remove active from all links
                    navLinks.forEach(n => n.classList.remove('active'));
                    // Add active to current section's link
                    if (link) {
                        link.classList.add('active');
                        foundActive = true;
                    }
                }
            });
        }, { 
            // More balanced margins for better detection
            rootMargin: '-25% 0px -40% 0px',
            threshold: 0.1
        });

        // Observe all sections
        Object.keys(sections).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) sectionObserver.observe(section);
        });
    }

    // Hover carousel functionality
    function initHoverCarousels() {
        document.querySelectorAll('.hover-carousel').forEach(carousel => {
            const images = carousel.querySelectorAll('img');
            let index = 0;
            let timer;

            function showNextImage() {
                images.forEach((img, i) => img.classList.toggle('active', i === index));

                // Wait for fade duration (1.2s) + visible duration (4.8s)
                timer = setTimeout(() => {
                    index = (index + 1) % images.length;
                    showNextImage();
                }, 2500); // total ~6 seconds per image
            }

            carousel.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                index = 0;
                showNextImage();
            });

            carousel.addEventListener('mouseleave', () => {
                clearTimeout(timer);
                images.forEach(img => img.classList.remove('active'));
                images[0].classList.add('active'); // reset to first image
            });
        });
    }

    // Certifications Carousel
    function initCertificationsCarousel() {
        const carouselContainer = document.getElementById('carouselContainer');
        if (!carouselContainer) return; // Exit if carousel doesn't exist

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carouselDots = document.getElementById('carouselDots');
        
        const cards = document.querySelectorAll('.certification-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        let cardsPerView = 3;
        let autoScrollInterval;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        // Auto-scroll configuration
        const AUTO_SCROLL_DELAY = 4000; // 4 seconds

        // Start auto-scroll
        function startAutoScroll() {
            stopAutoScroll(); // Clear any existing interval first
            autoScrollInterval = setInterval(() => {
                nextBtn.click();
            }, AUTO_SCROLL_DELAY);
        }

        // Stop auto-scroll
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Restart auto-scroll (reset the timer completely)
        function restartAutoScroll() {
            stopAutoScroll();
            startAutoScroll();
        }

        // Touch/Mouse events for swiping
        function setupSwipe() {
            carouselContainer.addEventListener('mousedown', handleDragStart);
            carouselContainer.addEventListener('touchstart', handleDragStart);
            
            carouselContainer.addEventListener('mousemove', handleDragMove);
            carouselContainer.addEventListener('touchmove', handleDragMove);
            
            carouselContainer.addEventListener('mouseup', handleDragEnd);
            carouselContainer.addEventListener('touchend', handleDragEnd);
            carouselContainer.addEventListener('mouseleave', handleDragEnd);
        }

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
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swiped left - go to next
                    handleNext();
                } else {
                    // Swiped right - go to previous
                    handlePrev();
                }
            }
            
            restartAutoScroll();
        }

        // Clone cards to create infinite loop effect
        function cloneCards() {
            // Clear existing clones first
            const existingClones = carouselContainer.querySelectorAll('.certification-card.clone');
            existingClones.forEach(clone => clone.remove());
            
            // Clone first few cards and append to end
            for (let i = 0; i < cardsPerView; i++) {
                const clone = cards[i].cloneNode(true);
                clone.classList.add('clone');
                carouselContainer.appendChild(clone);
            }
            
            // Clone last few cards and prepend to beginning
            for (let i = totalCards - cardsPerView; i < totalCards; i++) {
                const clone = cards[i].cloneNode(true);
                clone.classList.add('clone');
                carouselContainer.insertBefore(clone, carouselContainer.firstChild);
            }
            
            // Set initial position to show first original cards
            currentIndex = cardsPerView;
            updateCarousel();
        }
        
        // Calculate cards per view based on screen size
        function updateCardsPerView() {
            if (window.innerWidth <= 768) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
            cloneCards();
            updateCardFocus();
        }
        
        // Simple function to make middle card bigger
        function updateCardFocus() {
            const allCards = document.querySelectorAll('.certification-card');
            
            allCards.forEach((card, index) => {
                card.classList.remove('middle-card');
                
                // Only apply middle card styling for 3-card view on desktop
                if (cardsPerView === 3) {
                    const relativeIndex = (index - currentIndex + allCards.length) % allCards.length;
                    if (relativeIndex === 1) {
                        card.classList.add('middle-card');
                    }
                }
            });
        }
        
        // Create dots for carousel navigation
        function createDots() {
            carouselDots.innerHTML = '';
            
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    // Adjust for the prepended clones
                    currentIndex = i + cardsPerView;
                    updateCarousel();
                    restartAutoScroll();
                });
                
                carouselDots.appendChild(dot);
            }
        }
        
        // Update carousel position and dots
        function updateCarousel() {
            const allCards = document.querySelectorAll('.certification-card');
            const cardWidth = allCards[0].offsetWidth + 24;
            const translateX = -currentIndex * cardWidth;
            carouselContainer.style.transform = `translateX(${translateX}px)`;
            
            // Update dots
            const dots = document.querySelectorAll('.carousel-dot');
            const actualIndex = (currentIndex - cardsPerView + totalCards) % totalCards;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === actualIndex);
            });
            
            // Make middle card bigger
            updateCardFocus();
            
            // Handle seamless looping
            const totalAllCards = allCards.length;
            
            if (currentIndex >= totalAllCards - cardsPerView) {
                setTimeout(() => {
                    carouselContainer.style.transition = 'none';
                    currentIndex = cardsPerView;
                    carouselContainer.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
                    setTimeout(() => {
                        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
            
            if (currentIndex <= 0) {
                setTimeout(() => {
                    carouselContainer.style.transition = 'none';
                    currentIndex = totalAllCards - (2 * cardsPerView);
                    carouselContainer.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
                    setTimeout(() => {
                        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
        }
        
        // Navigation handlers
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
        
        // Event listeners for navigation
        prevBtn.addEventListener('click', handlePrev);
        nextBtn.addEventListener('click', handleNext);
        
        // Pause auto-scroll on hover
        carouselContainer.addEventListener('mouseenter', stopAutoScroll);
        carouselContainer.addEventListener('mouseleave', startAutoScroll);
        
        // Initialize
        updateCardsPerView();
        createDots();
        setupSwipe();
        startAutoScroll();
        
        // Update on resize
        window.addEventListener('resize', () => {
            updateCardsPerView();
            createDots();
        });
    }

    // Initialize everything
    initRevealAnimations();
    initNavHighlight();
    initHoverCarousels();
    initCertificationsCarousel();
})();