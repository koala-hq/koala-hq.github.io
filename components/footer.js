(function () {
  var container = document.getElementById('site-footer');
  if (!container) return;

  fetch('components/footer.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      container.innerHTML = html;
      var root = container.querySelector('#site-footer-root');
      if (root) {
        root.removeAttribute('id');
      }
    })
    .catch(function () {
      container.innerHTML = '<p class="p-4 text-gray-500">Footer could not be loaded.</p>';
    });
})();
