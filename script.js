const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

const requestForm = document.querySelector('#request-form');
if (requestForm) {
  const panels = [...requestForm.querySelectorAll('.form-panel')];
  const steps = [...document.querySelectorAll('.form-step')];
  let current = 0;

  const showPanel = (index) => {
    current = Math.max(0, Math.min(index, panels.length - 1));
    panels.forEach((panel, i) => { panel.hidden = i !== current; });
    steps.forEach((step, i) => step.classList.toggle('active', i === current));
  };

  requestForm.addEventListener('click', (event) => {
    const next = event.target.closest('[data-next]');
    const back = event.target.closest('[data-back]');
    if (next) {
      const panel = panels[current];
      const required = [...panel.querySelectorAll('[required]')];
      if (required.some((input) => !input.checkValidity())) {
        required.find((input) => !input.checkValidity())?.reportValidity();
        return;
      }
      showPanel(current + 1);
    }
    if (back) showPanel(current - 1);
  });

  requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showPanel(panels.length - 1);
  });
}

document.querySelector('#login-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = 'client-dashboard.html';
});
