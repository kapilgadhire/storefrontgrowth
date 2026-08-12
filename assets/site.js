/* Shared behavior for StorefrontGrowth service pages */
(function () {
  var SUPABASE_URL = 'https://zwzgfrbipmmxkqlxqzan.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_y94kDVsRrVLlyfuyPMK1Xw_fswnUQNp';
  var WEB3FORMS_KEY = '09ce496c-f379-49f8-85e8-7bac592dd869';

  // Sticky nav shadow
  var nav = document.getElementById('mainNav');
  if (nav) window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 30); });

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  function toggleMenu(forceClose) {
    if (!mobileMenu) return;
    var open = forceClose ? false : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { toggleMenu(); });
  if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggleMenu(true); }); });

  // Desktop dropdown (click-to-toggle for touch/keyboard; hover handled in CSS)
  document.querySelectorAll('.nav-dd > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = btn.closest('.nav-dd');
      var willOpen = !dd.classList.contains('open');
      document.querySelectorAll('.nav-dd').forEach(function (d) { d.classList.remove('open'); });
      dd.classList.toggle('open', willOpen);
    });
  });
  document.addEventListener('click', function () { document.querySelectorAll('.nav-dd').forEach(function (d) { d.classList.remove('open'); }); });

  // Contact modal
  var modal = document.getElementById('contactModal');
  var modalClose = document.getElementById('modalClose');
  function openModal() { toggleMenu(true); if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(function () { var i = modal.querySelector('input'); if (i) i.focus(); }, 100); } }
  function closeModal() { if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; } }
  document.querySelectorAll('.js-open-modal').forEach(function (b) { b.addEventListener('click', openModal); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // Contact form -> Supabase (store) + Web3Forms (email)
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    if (fd.get('botcheck')) return;
    var lead = {
      first_name: (fd.get('firstName') || '').trim(),
      business_name: (fd.get('businessName') || '').trim(),
      email: (fd.get('email') || '').trim(),
      phone: (fd.get('phone') || '').trim(),
      service: fd.get('service') || null,
      budget: fd.get('budget') || null
    };
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent; btn.disabled = true; btn.textContent = 'Sending…';
    success.classList.remove('show');

    var store = fetch(SUPABASE_URL + '/rest/v1/contact_submissions', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify(lead)
    });
    var email = fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: 'New call-back request — StorefrontGrowth',
        from_name: 'StorefrontGrowth Website',
        'Page': document.title,
        'First name': lead.first_name, 'Business name': lead.business_name,
        'Email': lead.email, 'Phone': lead.phone,
        'Service needed': lead.service || '—', 'Monthly budget': lead.budget || '—'
      })
    });
    Promise.allSettled([store, email]).then(function (r) {
      var ok = (r[0].status === 'fulfilled' && r[0].value.ok) || (r[1].status === 'fulfilled' && r[1].value.ok);
      btn.disabled = false; btn.textContent = label;
      if (ok) {
        success.textContent = "Thanks! We've got your details and will call you back shortly.";
        success.style.background = ''; success.style.color = ''; success.classList.add('show'); form.reset();
      } else {
        success.textContent = 'Sorry — something went wrong. Please email hello@storefrontgrowth.com or try again.';
        success.style.background = 'rgba(237,129,84,0.16)'; success.style.color = '#9a3b1c'; success.classList.add('show');
      }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Year
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
