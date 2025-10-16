(() => {
  const modal = document.getElementById('catalog-modal');
  const dialog = modal.querySelector('.pr-modal__dialog');
  const img    = modal.querySelector('.pr-modal__image');
  const title  = modal.querySelector('.pr-modal__title');
  const sub    = modal.querySelector('.pr-modal__subtitle');
  const body   = modal.querySelector('.pr-modal__body');

  let lastActive = null;

  function openFromCard(card, trigger) {
    lastActive = trigger || document.activeElement;

    const cover = card.querySelector('.product__image');
    const h3    = card.querySelector('.product__title');
    const desc  = card.querySelector('.product__description');
    const details = card.querySelector('.product__details');

    img.src = cover?.src || '';
    img.alt = cover?.alt || '';
    title.textContent = h3?.textContent?.trim() || 'Проект';
    sub.textContent   = desc?.textContent?.trim() || '';
    body.innerHTML    = details ? details.innerHTML : '<p>Нет подробной информации.</p>';

    document.body.classList.add('body--lock');
    modal.hidden = false;
    requestAnimationFrame(() => modal.setAttribute('data-open', '1'));

    const focusable = getFocusable(dialog);
    (focusable[0] || dialog).focus();
  }

  function closeModal() {
    modal.removeAttribute('data-open');
    document.body.classList.remove('body--lock');

    setTimeout(() => {
      modal.hidden = true;
      body.innerHTML = '';
      if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
    }, 200);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-open-modal');
    if (btn) {
      const card = btn.closest('.product');
      if (card) openFromCard(card, btn);
    }
    if (e.target.closest('[data-close]')) {
      closeModal();
    }
  });

  modal.querySelector('.pr-modal__overlay').addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(e);
  });

  function getFocusable(root) {
    return Array.from(root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null || el === root);
  }
  function trapFocus(e) {
    const list = getFocusable(dialog);
    if (!list.length) return;
    const first = list[0];
    const last  = list[list.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      last.focus(); e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus(); e.preventDefault();
    }
  }
})();