(function () {
  
  var hero = document.getElementById('inicio');
  var video = document.getElementById('adVideo');
  var soundBtn = document.getElementById('soundBtn');

  function semVideo() {
    hero.classList.add('no-video');
    soundBtn.hidden = true;
  }
  video.querySelector('source').addEventListener('error', semVideo);
  video.addEventListener('error', semVideo);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  } else {
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  soundBtn.addEventListener('click', function () {
    video.muted = !video.muted;
    soundBtn.textContent = video.muted ? 'Ativar som' : 'Desativar som';
    soundBtn.setAttribute('aria-pressed', String(!video.muted));
    if (video.paused) video.play().catch(function () {});
  });

  
  document.querySelectorAll('.shot img, .logo-slot img').forEach(function (img) {
    var box = img.closest('.shot, .logo-slot');
    function vazio() { box.classList.add('empty'); }
    img.addEventListener('error', vazio);
    if (img.complete && img.naturalWidth === 0) vazio();
  });

 
  var menuBtn = document.getElementById('menuBtn');
  var panel = document.getElementById('menuPanel');

  function fechaMenu() {
    panel.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menu');
  }
  menuBtn.addEventListener('click', function () {
    var abrir = panel.hidden;
    panel.hidden = !abrir;
    menuBtn.setAttribute('aria-expanded', String(abrir));
    menuBtn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  });
  panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fechaMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechaMenu(); });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !document.getElementById('nav').contains(e.target)) fechaMenu();
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 960) fechaMenu(); });

  
  var sticky = document.getElementById('stickyCta');
  var alvo = document.getElementById('baixar');
  function atualizaSticky() {
    var passouHero = window.scrollY > hero.offsetHeight * 0.7;
    var r = alvo.getBoundingClientRect();
    var noDownload = r.top < window.innerHeight && r.bottom > 0;
    sticky.classList.toggle('show', passouHero && !noDownload);
  }
  window.addEventListener('scroll', atualizaSticky, { passive: true });
  window.addEventListener('resize', atualizaSticky);
  atualizaSticky();
})();
