const firmPeople = [
  { name: 'CA Nikunj Malde', role: 'Partner' },
  { name: 'CA Kunj Malde', role: 'Partner' },
  { name: 'Disha Karani', role: 'Team contact' },
];

const services = [
  { id: 'auditing', title: 'Auditing Services', items: ['Statutory Audit', 'Income Tax Audit', 'GST Audit', 'Internal Audit'] },
  { id: 'income-tax', title: 'Income Tax Services', href: 'income-tax.html', items: ['Income Tax Return Filing', 'Tax Planning & Advisory', 'Tax Compliance'] },
  { id: 'gst', title: 'GST Compliance & Advisory', items: ['GST Registration & Compliance', 'Return Filing', 'GST Audit', 'Advisory Services'] },
  { id: 'litigation', title: 'Litigation Support', items: ['Income Tax Litigation', 'GST Litigation', 'Expert Representations'] },
  { id: 'certification', title: 'Certification Services', items: ['Professional Certifications', 'Auditor Certifications'] },
  { id: 'roc', title: 'ROC & Company Law', items: ['ROC Compliance', 'Company Law Advisory', 'Statutory Compliance'] },
];

class NMMSiteHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';
    const navItems = [
      ['expertise', 'EXPERTISE', 'expertise.html'],
      ['firm', 'THE FIRM', 'firm.html'],
      ['contact', 'CONTACT', 'contact.html'],
      ['client-desk', 'CLIENT DESK', 'client-desk.html'],
    ];
    this.innerHTML = `
      <header class="site-header">
        <a class="brand" href="index.html" aria-label="NM Malde and Associates home">NMM <span>/</span></a>
        <button class="menu-button" type="button" aria-expanded="false" aria-label="Open navigation">MENU</button>
        <nav class="nav" aria-label="Main navigation">
          ${navItems.map(([key, label, href]) => `<a href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
      </header>`;
    const button = this.querySelector('.menu-button');
    const nav = this.querySelector('.nav');
    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.textContent = isOpen ? 'CLOSE' : 'MENU';
    });
  }
}

class NMMSiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div><div class="brand">NMM <span>/</span></div><p>Professional accounting and tax advisory services for your business success.</p><p class="footer-fine">Independent website concept prepared for NM Malde & Associates.</p></div>
        <div><strong>Explore</strong><a href="expertise.html">Expertise</a><a href="firm.html">The Firm</a><a href="contact.html">Contact</a></div>
        <div><strong>Connect</strong><a href="contact.html">Contact the team</a><a href="request.html">Start a request</a><a href="client-desk.html">Client Desk</a></div>
      </footer>`;
  }
}

class NMMServiceCatalog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section class="catalog">${services.map((service, index) => `
      <article class="catalog-item" id="${service.id}">
        <span class="catalog-num">${String(index + 1).padStart(2, '0')}</span>
        <h2>${service.href ? `<a href="${service.href}">${service.title}</a>` : service.title}</h2>
        <ul>${service.items.map(item => `<li>${item}</li>`).join('')}</ul>
      </article>`).join('')}</section>`;
  }
}

class NMMFirmPeople extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="people-list">${firmPeople.map((person, index) => `
      <article class="person-row">
        <span class="person-num">${String(index + 1).padStart(2, '0')}</span>
        <div><small>${person.role.toUpperCase()}</small><h3>${person.name}</h3></div>
        <a href="contact.html">CONTACT <span>→</span></a>
      </article>`).join('')}</div>`;
  }
}

class NMMAppSidebar extends HTMLElement {
  connectedCallback() {
    const mode = this.getAttribute('mode') || 'client';
    const current = this.getAttribute('current') || 'overview';
    const isAssociate = mode === 'associate';
    const links = isAssociate
      ? [['overview', 'OVERVIEW', 'associate.html'], ['clients', 'CLIENTS', '#queue'], ['engagements', 'ENGAGEMENTS', '#queue'], ['templates', 'TEMPLATES', '#'], ['team', 'TEAM', '#']]
      : [['overview', 'OVERVIEW', 'client-dashboard.html'], ['engagements', 'ENGAGEMENTS', '#engagement'], ['documents', 'DOCUMENTS', '#documents'], ['profile', 'PROFILE', '#profile']];
    this.innerHTML = `<aside class="sidebar"><a class="brand" href="index.html">NMM <span>/</span></a>${links.map(([key, label, href]) => `<a${key === current ? ' class="active"' : ''} href="${href}">${label}</a>`).join('')}<a class="signout" href="${isAssociate ? 'index.html' : 'client-desk.html'}">${isAssociate ? 'WEBSITE' : 'SIGN OUT'}</a></aside>`;
  }
}

customElements.define('nmm-site-header', NMMSiteHeader);
customElements.define('nmm-site-footer', NMMSiteFooter);
customElements.define('nmm-service-catalog', NMMServiceCatalog);
customElements.define('nmm-firm-people', NMMFirmPeople);
customElements.define('nmm-app-sidebar', NMMAppSidebar);
