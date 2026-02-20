(function () {
  (function injectPostHog() {
    if (window.posthog && window.posthog.__loaded) return;
    var script = document.createElement('script');
    script.src = 'components/posthog.js';
    script.async = true;
    (document.head || document.documentElement).appendChild(script);
  })();

  var container = document.getElementById('site-header');
  if (!container) return;

  var pathname = window.location.pathname;
  var currentPage = 'index';
  if (pathname.endsWith('estate-agents.html') || pathname.includes('estate-agents.html')) {
    currentPage = 'estate-agents';
  } else if (pathname.endsWith('property-investors.html') || pathname.includes('property-investors.html')) {
    currentPage = 'property-investors';
  }

  fetch('components/header.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      container.innerHTML = html;
      var root = container.querySelector('#site-header-root');
      if (root) {
        root.removeAttribute('id');
      }
      var activeLink = container.querySelector('.nav-link[data-page="' + currentPage + '"]');
      if (activeLink) {
        activeLink.setAttribute('aria-current', 'page');
        activeLink.classList.remove('text-gray-700', 'dark:text-gray-400');
        activeLink.classList.add('bg-primary-700', 'text-white', 'lg:bg-transparent', 'lg:text-primary-700', 'dark:text-white');
      }
      var ev = new CustomEvent('flowbite:init');
      document.dispatchEvent(ev);
    })
    .catch(function () {
      container.innerHTML = '<p class="p-4 text-gray-500">Header could not be loaded.</p>';
    });
})();
