/* =========================================================
   RVRS — shared site behavior (home + product page)
   ========================================================= */

function lang() { return (typeof I18nCtl !== 'undefined') ? I18nCtl.getLang() : 'en'; }
function pname(p) { return lang() === 'ar' ? p.name_ar : p.name_en; }
function pdesc(p) { return lang() === 'ar' ? p.desc_ar : p.desc_en; }
function pbadges(p) { return lang() === 'ar' ? (p.badges_ar || []) : (p.badges_en || []); }
function wname(w) { return lang() === 'ar' ? w.ar : w.en; }

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAV SCROLL STATE ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---------- MOBILE MENU ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { navToggle.classList.remove('open'); mobileMenu.classList.remove('open'); });
    });
  }

  /* ---------- HERO SCRUB ---------- */
  const heroInner = document.getElementById('heroInner');
  if (heroInner) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY, vh = window.innerHeight;
      const progress = Math.min(y / (vh * 0.9), 1);
      heroInner.style.opacity = 1 - progress;
      heroInner.style.transform = `translateY(${progress * 40}px) scale(${1 - progress * 0.08})`;
    }, { passive: true });
  }

  /* ---------- TOAST ---------- */
  window.showToast = function (msg) {
    let toast = document.getElementById('toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast'; document.body.appendChild(toast); }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  /* ---------- CURRENCY ---------- */
  window.formatDZD = function (n) { return Number(n).toLocaleString('fr-FR') + ' DZD'; };

  /* ---------- REVEAL (re-armed after dynamic render) ---------- */
  function armReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal:not(.in-view), .reveal-scale:not(.in-view)').forEach(el => io.observe(el));
  }
  armReveal();

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- WILAYA <select> BUILDER ---------- */
  function fillWilayaSelect(sel) {
    sel.innerHTML = `<option value="" disabled selected>${I18nCtl.t('ph_wilaya')}</option>` +
      WILAYAS.map(w => `<option value="${w.c}">${w.c} — ${wname(w)}</option>`).join('');
  }

  /* =========================================================
     HOME — render shop grid from ProductsStore
     ========================================================= */
  const shopGrid = document.getElementById('shopGrid');
  function renderShopGrid() {
    if (!shopGrid || typeof ProductsStore === 'undefined') return;
    const products = ProductsStore.getAll();
    shopGrid.innerHTML = products.map((p, i) => `
      <div class="product ${i % 2 ? 'reverse' : ''} reveal">
        <div class="p-media"><img src="${p.images[0]}" alt="${pname(p)}" loading="lazy"></div>
        <div class="p-text">
          <div class="eyebrow">${p.eyebrow}</div>
          <h2>${pname(p)}</h2>
          <p class="desc">${pdesc(p)}</p>
          <div class="p-price">${formatDZD(p.price)}${p.oldPrice ? `<span class="old">${formatDZD(p.oldPrice)}</span>` : ''}</div>
          <div class="p-links">
            <a href="products/product.html?id=${p.id}" class="btn-cod" data-i18n="order_cod_btn">Order — Cash on Delivery</a>
            <a href="products/product.html?id=${p.id}" class="view-link" data-i18n="view_details">View details →</a>
          </div>
          <span class="cod-note" data-i18n="cod_note">No card needed.</span>
        </div>
      </div>
    `).join('');
    I18nCtl.apply(lang());
    armReveal();
  }
  renderShopGrid();

  /* ---------- FOOTER SHOP LIST (home + product page) ---------- */
  const footerShopList = document.getElementById('footerShopList');
  function renderFooterShopList() {
    if (!footerShopList || typeof ProductsStore === 'undefined') return;
    const products = ProductsStore.getAll();
    const base = footerShopList.querySelector('li');
    footerShopList.innerHTML = '';
    if (base) footerShopList.appendChild(base);
    const prefix = location.pathname.includes('/products/') ? '' : 'products/';
    products.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${prefix}product.html?id=${p.id}">${pname(p)}</a>`;
      footerShopList.appendChild(li);
    });
  }
  renderFooterShopList();

  /* =========================================================
     PRODUCT PAGE — render from ?id=
     ========================================================= */
  const ppWrap = document.getElementById('ppWrap');
  if (ppWrap && typeof ProductsStore !== 'undefined') {
    const id = new URLSearchParams(location.search).get('id');
    let product = ProductsStore.getById(id) || ProductsStore.getAll()[0];

    function renderProductPage() {
      product = ProductsStore.getById(product.id);
      if (!product) return;
      document.title = pname(product) + ' — RVRS';
      const bc = document.getElementById('bcName'); if (bc) bc.textContent = pname(product);
      const stickyPrice = document.getElementById('stickyPrice');
      if (stickyPrice) stickyPrice.textContent = formatDZD(product.price);

      ppWrap.innerHTML = `
        <div class="pp-gallery">
          <div class="pp-main-img"><img src="${product.images[0]}" alt="${pname(product)}"></div>
          <div class="pp-thumbs">
            ${product.images.map((src, i) => `<div class="pp-thumb ${i === 0 ? 'active' : ''}" data-full="${src}"><img src="${src}" alt="thumb"></div>`).join('')}
          </div>
        </div>
        <div class="pp-info">
          <div class="eyebrow">${product.eyebrow}</div>
          <h1>${pname(product)}</h1>
          <div class="price">${formatDZD(product.price)}${product.oldPrice ? `<span class="old">${formatDZD(product.oldPrice)}</span>` : ''}</div>
          <p class="desc">${pdesc(product)}</p>
          <div class="badge-row">${pbadges(product).map(b => `<span class="badge">${b}</span>`).join('')}</div>

          <div class="order-box" id="orderBox">
            <div class="form-view">
              <h3 data-i18n="cod_title">Cash on Delivery</h3>
              <div class="sub" data-i18n="cod_sub">We'll call to confirm before shipping.</div>
              <form id="orderForm">
                <div class="field">
                  <label data-i18n="field_name">Full name</label>
                  <input type="text" name="fullName" data-i18n-ph="ph_name" placeholder="e.g. Yacine Belkacem" required>
                </div>
                <div class="field-row">
                  <div class="field">
                    <label data-i18n="field_phone">Phone number</label>
                    <input type="tel" name="phone" data-i18n-ph="ph_phone" placeholder="05XX XX XX XX" pattern="0[5-7][0-9]{8}" required>
                  </div>
                  <div class="field">
                    <label data-i18n="field_qty">Quantity</label>
                    <input type="number" name="qty" value="1" min="1" max="10" required>
                  </div>
                </div>

                <div class="field">
                  <label data-i18n="field_method">Delivery method</label>
                  <div class="method-toggle">
                    <button type="button" class="method-btn active" data-method="domicile" data-i18n="method_domicile">Home delivery</button>
                    <button type="button" class="method-btn" data-method="bureau" data-i18n="method_bureau">Office pickup</button>
                  </div>
                  <input type="hidden" name="method" value="domicile">
                </div>

                <div class="field-row">
                  <div class="field">
                    <label data-i18n="field_wilaya">Wilaya</label>
                    <select name="wilaya" class="wilaya-select" required></select>
                  </div>
                  <div class="field">
                    <label data-i18n="field_size">Size</label>
                    <select name="size" required>
                      <option value="" disabled selected data-i18n="ph_size">Select size</option>
                      <option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                    </select>
                  </div>
                </div>

                <div class="field">
                  <label class="addr-label" data-i18n="field_address">Commune &amp; exact address</label>
                  <textarea name="address" class="addr-input" data-i18n-ph="ph_address" placeholder="Commune, street, landmark" required></textarea>
                </div>

                <div class="field">
                  <label data-i18n="field_notes">Notes (optional)</label>
                  <input type="text" name="notes" data-i18n-ph="ph_notes" placeholder="e.g. call before arriving">
                </div>

                <div class="ship-row">
                  <span data-i18n="row_product">Product</span><span class="row-product-amt">${formatDZD(product.price)}</span>
                </div>
                <div class="ship-row">
                  <span data-i18n="row_shipping">Shipping</span><span class="row-shipping-amt">0 DZD</span>
                </div>
                <div class="total-row">
                  <span data-i18n="row_total">Total — Cash on Delivery</span>
                  <span class="amt total-amt">${formatDZD(product.price)}</span>
                </div>
                <button type="submit" class="submit-cod" data-i18n="submit_cod">Confirm Order</button>
                <p class="form-note" data-i18n="form_note">You pay nothing now.</p>
              </form>
            </div>
            <div class="success-view">
              <div class="check"><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6"/></svg></div>
              <h3 data-i18n="success_title">Order confirmed</h3>
              <p data-i18n="success_p">Thanks — we've got your order.</p>
              <div class="os-recap"></div>
              <button class="close-success" data-i18n="order_again">Order again</button>
            </div>
          </div>
        </div>
      `;

      // wilaya select
      const wilayaSel = ppWrap.querySelector('.wilaya-select');
      fillWilayaSelect(wilayaSel);

      // method toggle
      const methodBtns = ppWrap.querySelectorAll('.method-btn');
      const methodHidden = ppWrap.querySelector('input[name="method"]');
      methodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          methodBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          methodHidden.value = btn.dataset.method;
          const addrLabel = ppWrap.querySelector('.addr-label');
          const addrInput = ppWrap.querySelector('.addr-input');
          if (btn.dataset.method === 'bureau') {
            addrLabel.textContent = I18nCtl.t('field_address_bureau');
            addrInput.placeholder = I18nCtl.t('ph_address_bureau');
          } else {
            addrLabel.textContent = I18nCtl.t('field_address');
            addrInput.placeholder = I18nCtl.t('ph_address');
          }
          updateTotals();
        });
      });

      const qtyInput = ppWrap.querySelector('[name="qty"]');
      const rowShippingAmt = ppWrap.querySelector('.row-shipping-amt');
      const rowProductAmt = ppWrap.querySelector('.row-product-amt');
      const totalAmt = ppWrap.querySelector('.total-amt');

      function currentShipping() {
        const w = wilayaSel.value;
        const method = methodHidden.value;
        if (!w || typeof ShippingStore === 'undefined') return 0;
        return ShippingStore.getPrice(w, method);
      }
      function updateTotals() {
        const qty = parseInt(qtyInput.value || '1', 10);
        const shipping = currentShipping();
        const productTotal = product.price * qty;
        rowProductAmt.textContent = formatDZD(productTotal);
        rowShippingAmt.textContent = formatDZD(shipping);
        totalAmt.textContent = formatDZD(productTotal + shipping);
      }
      qtyInput.addEventListener('input', updateTotals);
      wilayaSel.addEventListener('change', updateTotals);
      updateTotals();

      // gallery thumbs
      ppWrap.querySelectorAll('.pp-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          const mainImg = ppWrap.querySelector('.pp-main-img img');
          ppWrap.querySelectorAll('.pp-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          mainImg.src = thumb.dataset.full;
        });
      });

      // submit
      const form = ppWrap.querySelector('#orderForm');
      const orderBox = ppWrap.querySelector('#orderBox') || ppWrap.querySelector('.order-box');
      const formView = ppWrap.querySelector('.form-view');
      const successView = ppWrap.querySelector('.success-view');
      const recapBox = ppWrap.querySelector('.os-recap');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = form.fullName.value;
        const phone = form.phone.value;
        const wilayaVal = form.wilaya.value;
        const wRow = WILAYAS.find(w => w.c === wilayaVal);
        const size = form.size.value;
        const method = form.method.value;
        const address = form.address.value;
        const notes = form.notes.value;
        const qty = parseInt(form.qty.value, 10);
        const shipping = currentShipping();
        const total = product.price * qty + shipping;

        RVRSStore.saveOrder({
          product: pname(product), price: product.price, size, qty,
          method, shipping, total, fullName, phone,
          wilaya: wRow ? `${wRow.c} — ${wRow.en}` : wilayaVal,
          address, notes
        });

        recapBox.innerHTML = `
          <b>${pname(product)}</b> · ${size} · x${qty}<br>
          ${fullName} — ${phone}<br>
          ${wRow ? wRow.en : wilayaVal} · ${method === 'bureau' ? I18nCtl.t('method_bureau') : I18nCtl.t('method_domicile')}<br>
          <b>${formatDZD(total)}</b>
        `;
        formView.classList.add('hidden');
        successView.classList.add('show');
        const path = successView.querySelector('path');
        if (path) { path.style.animation = 'none'; void path.offsetWidth; path.style.animation = null; }
        showToast('✓');
        window.scrollTo({ top: orderBox.offsetTop - 100, behavior: 'smooth' });
      });

      const closeSuccessBtn = ppWrap.querySelector('.close-success');
      if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
          successView.classList.remove('show');
          formView.classList.remove('hidden');
          form.reset();
          updateTotals();
        });
      }

      // sticky buy scrolls to order box
      const stickyBuy = document.getElementById('stickyBuy');
      const newOrderBox = document.getElementById('orderBox');
      if (stickyBuy && newOrderBox) {
        const io2 = new IntersectionObserver(([entry]) => {
          stickyBuy.classList.toggle('show', !entry.isIntersecting && window.scrollY > 200);
        }, { threshold: 0 });
        io2.observe(newOrderBox);
        const stickyBtn = stickyBuy.querySelector('.btn-cod');
        if (stickyBtn) stickyBtn.onclick = () => newOrderBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // related products
      const relatedGrid = document.getElementById('relatedGrid');
      if (relatedGrid) {
        const others = ProductsStore.getAll().filter(p => p.id !== product.id).slice(0, 3);
        relatedGrid.innerHTML = others.map(p => `
          <a href="product.html?id=${p.id}" class="related-card">
            <div class="img"><img src="${p.images[0]}" alt="${pname(p)}"></div>
            <div class="name">${pname(p)}</div>
            <div class="price">${formatDZD(p.price)}</div>
          </a>
        `).join('');
      }

      I18nCtl.apply(lang());
      armReveal();
    }

    renderProductPage();
    document.addEventListener('rvrs:langchange', renderProductPage);
  }

  /* re-render dynamic bits when language changes (home) */
  document.addEventListener('rvrs:langchange', () => {
    renderShopGrid();
    renderFooterShopList();
  });

});
