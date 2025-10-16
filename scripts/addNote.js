    // Добавление записи
    (function(){
      const form = document.getElementById('entryForm');
      const list = document.querySelector('.timeline');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const date  = form.querySelector('#date').value;
        const topic = form.querySelector('#topic').value.trim();
        const status= form.querySelector('#status').value;

        if(!date || !topic) return;

        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,'0');
        const monthNames = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
        const mm = monthNames[d.getMonth()];

        const statusIcon = status === 'done' ? '✓' : status === 'progress' ? '⏳' : '•';

        const item = document.createElement('div');
        item.className = 'timeline__item';
        item.innerHTML = `
          <div class="timeline__date">${day} ${mm}</div>
          <div class="timeline__text">${escapeHtml(topic)}</div>
          <div class="timeline__status">${statusIcon}</div>
        `;
        list.insertAdjacentElement('afterbegin', item);

        form.reset();
      });

      function escapeHtml(s){
        const div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
      }
    })();