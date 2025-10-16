(function () {
  const checks = {
    html: document.getElementById('HTMLcheck'),
    sql:  document.getElementById('SQLcheck'),
    gl:   document.getElementById('GLcheck')
  };

  const matchers = {
    html: tags => tags.some(t => ['html'].includes(t)),
    sql:  tags => tags.some(t => ['sql'].includes(t)),
    gl:   tags => tags.some(t => ['opengl'].includes(t))
  };

  function tokenize(str='') {
    return str
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\+]+/gu, ' ')
      .split(/\s+/)
      .filter(Boolean);
  }

  function getTags(card) {
    const fromData = (card.dataset.tags || '')
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    if (fromData.length) return fromData;

    return [...new Set([...tokenize(title), ...tokenize(desc)])];
  }

  function activeCategories() {
    return Object.entries(checks)
      .filter(([, el]) => el?.checked)
      .map(([key]) => key);
  }

  function applyFilters() {
    const active = activeCategories();

    document.querySelectorAll('.product').forEach(card => {
      const tags = getTags(card);
      const match = active.some(cat => matchers[cat](tags));

      match;
      card.classList.toggle('is-hidden', !match);
    });
  }

  Object.values(checks).forEach(el => el && el.addEventListener('change', applyFilters));

  applyFilters();
})();