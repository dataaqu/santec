(function () {
  // Manual choice always wins — do nothing if user already picked a language.
  if (localStorage.getItem('lang')) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500); // fail fast → stay ka

  fetch('https://ipwho.is/?fields=country_code', { signal: controller.signal })
    .then((r) => r.json())
    .then((d) => {
      clearTimeout(timeout);
      // Still respect a choice made during the request.
      if (localStorage.getItem('lang')) return;
      const cc = (d && d.country_code) || '';
      if (cc && cc !== 'GE') window.applyLang('en'); // abroad → English
      // GE or unknown → leave default (ka)
    })
    .catch(() => { /* network/timeout/blocked → stay ka */ });
})();
// Fallback endpoint if ipwho.is is unreliable: https://ipapi.co/country/ (returns country code as plain text)
