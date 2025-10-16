document.querySelectorAll('.skill').forEach(skill => {
    const initial = getComputedStyle(skill).getPropertyValue('--p').trim() || '0%';
    skill.dataset.progress = initial;

    const tip = document.createElement('span');
    tip.className = 'skill__tooltip';
    tip.textContent = initial;
    skill.appendChild(tip);

    skill.addEventListener('mouseenter', () => {
        tip.textContent = skill.dataset.progress;
        skill.dataset.showTooltip = '1';
        skill.style.setProperty('--p', '100%');
        console.log('ok');
    });

    skill.addEventListener('mouseleave', () => {
        skill.removeAttribute('data-show-tooltip');
        skill.style.setProperty('--p', skill.dataset.progress);
    });
});