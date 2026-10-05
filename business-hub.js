(() => {
  const grid = document.getElementById('hub-grid');
  if (!grid) return;
  const search = document.getElementById('hub-search');
  const filter = document.getElementById('hub-category');
  const empty = document.getElementById('hub-empty');
  const count = document.getElementById('hub-count');
  const dialog = document.getElementById('business-dialog');
  const detail = document.getElementById('business-detail');
  const companies = Array.isArray(window.EIC_BUSINESSES) ? window.EIC_BUSINESSES.filter(c => c && c.name) : [];
  const ar = () => document.documentElement.lang === 'ar';
  const text = value => typeof value === 'string' ? value : (value?.[ar() ? 'ar' : 'en'] || value?.en || value?.ar || '');
  const el = (tag, content, className) => { const node = document.createElement(tag); node.textContent = content; if (className) node.className = className; return node; };
  const safeWeb = url => { try { const u = new URL(url); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
  const addLogo = (parent, company) => {
    if (typeof company.logo !== 'string' || !/^(assets\/|https:\/\/)/.test(company.logo)) return;
    const img = document.createElement('img'); img.src = company.logo; img.alt = text(company.name); img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); parent.append(img);
  };
  const link = (label, href, external = false) => { const a = el('a', label, 'btn btn-ghost'); a.href = href; if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } return a; };
  let selected = null;
  function showCompany(company, open = true) {
    selected = company; detail.replaceChildren(); addLogo(detail, company);
    const title = el('h2', text(company.name)); title.id = 'business-title';
    detail.append(title, el('p', [text(company.category), text(company.location)].filter(Boolean).join(' · ')), el('p', text(company.description)));
    if (company.details) detail.append(el('p', text(company.details)));
    const actions = el('div', '', 'eic-actions');
    const web = safeWeb(company.website); if (web) actions.append(link(ar() ? 'زيارة الموقع' : 'Visit Website', web, true));
    const phone = String(company.phone || '').replace(/[^+\d]/g, '');
    if (phone && /^\+?\d{7,15}$/.test(phone)) actions.append(link(String(company.phone), 'tel:' + phone));
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email || '')) actions.append(link(company.email, 'mailto:' + company.email));
    detail.append(actions); if (open) dialog.showModal();
  }
  function render(rebuildCategories = false) {
    if (rebuildCategories) {
      const chosen = filter.value;
      filter.replaceChildren(new Option(ar() ? 'جميع المجالات' : 'All categories', ''));
      const unique = new Map();
      for (const c of companies) { const key = typeof c.category === 'string' ? c.category : (c.category?.en || c.category?.ar || ''); if (key) unique.set(key, text(c.category)); }
      for (const [key, name] of unique) filter.add(new Option(name, key));
      filter.value = chosen;
      search.placeholder = ar() ? 'اسم الشركة، المجال أو الموقع' : 'Company name, category or location';
    }
    const query = search.value.trim().toLocaleLowerCase();
    const matches = companies.filter(c => {
      const haystack = JSON.stringify([c.name,c.description,c.category,c.location]).toLocaleLowerCase();
      const key = typeof c.category === 'string' ? c.category : (c.category?.en || c.category?.ar || '');
      return (!query || haystack.includes(query)) && (!filter.value || filter.value === key);
    });
    grid.replaceChildren();
    for (const company of matches) {
      const article = el('article', '', 'eic-card hub-company'); addLogo(article, company);
      article.append(el('span', [text(company.category),text(company.location)].filter(Boolean).join(' · '), 'company-meta'), el('h3', text(company.name)), el('p', text(company.description)));
      const button = el('button', ar() ? 'عرض معلومات الشركة' : 'View Company', 'btn btn-solid'); button.type = 'button'; button.addEventListener('click', () => showCompany(company)); article.append(button); grid.append(article);
    }
    count.textContent = ar() ? `${matches.length} شركة` : `${matches.length} ${matches.length === 1 ? 'business' : 'businesses'}`;
    empty.hidden = matches.length > 0;
    if (!companies.length) {
      empty.querySelector('h3 .lang-en').textContent = 'The directory is ready for our first business listings.';
      empty.querySelector('h3 .lang-ar').textContent = 'الدليل جاهز لإضافة الشركات الأولى.';
    } else {
      empty.querySelector('h3 .lang-en').textContent = 'No matching businesses.';
      empty.querySelector('h3 .lang-ar').textContent = 'لا توجد شركات مطابقة.';
      empty.querySelector('p .lang-en').textContent = 'Try another search or choose a different category.';
      empty.querySelector('p .lang-ar').textContent = 'جرّب بحثاً آخر أو اختر مجالاً مختلفاً.';
    }
  }
  search.addEventListener('input', () => render()); filter.addEventListener('change', () => render());
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  new MutationObserver(() => { render(true); if (dialog.open && selected) showCompany(selected, false); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render(true);
})();
