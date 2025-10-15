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

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        ent.target.classList.add('show');
        // optionally unobserve to avoid repeated triggers
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  // Fixed active nav highlight using Intersection Observer
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
    entries.forEach(entry => {
      const sectionId = entry.target.getAttribute('id');
      const link = sections[sectionId];
      
      if (entry.isIntersecting) {
        // Remove active from all links
        navLinks.forEach(n => n.classList.remove('active'));
        // Add active to current section's link
        if (link) link.classList.add('active');
      }
    });
  }, { 
    rootMargin: '-25% 0px -70% 0px',
    threshold: 0.1
  });

  // Observe all sections
  Object.keys(sections).forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) sectionObserver.observe(section);
  });

  // Hover carousel functionality
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
})();