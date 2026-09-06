(function(){
  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  window.addEventListener('scroll', function(){
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  navToggle.addEventListener('click', function(){
    var isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Count-up stats
  var counters = document.querySelectorAll('.stat-num');
  var countersDone = false;
  function animateCounters(){
    if (countersDone) return;
    countersDone = true;
    counters.forEach(function(el){
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var start = 0;
      var duration = 1200;
      var startTime = null;
      function step(ts){
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.floor(progress * (target - start) + start).toLocaleString('fr-FR');
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('fr-FR');
      }
      requestAnimationFrame(step);
    });
  }

  // Reveal on scroll
  var revealTargets = document.querySelectorAll('.value-card, .activity-card, .about-compare, .product-info, .partners-frame, .challenges, .contact-form');
  revealTargets.forEach(function(el){ el.setAttribute('data-reveal', ''); });

  var statsStrip = document.querySelector('.stats-strip');

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        if (entry.target === statsStrip) animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach(function(el){ observer.observe(el); });
  if (statsStrip) observer.observe(statsStrip);

  // Contact form submits directly to formsubmit.co (see form action) — no JS interception needed.
})();
