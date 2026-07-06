/* =========================================================
   RVRS — shipping price storage
   Prices per wilaya, per method (domicile / bureau), in DZD.
   Editable from admin.html > Shipping tab.
   ========================================================= */

const ShippingStore = (() => {
  const KEY = 'rvrs_shipping';

  function defaults() {
    const map = {};
    WILAYAS.forEach(w => {
      // Alger/Oran/Blida/Boumerdès/Tipaza cheaper (close to hub); rest a flat further rate.
      const near = ['16', '31', '09', '35', '42'].includes(w.c);
      map[w.c] = { domicile: near ? 400 : 600, bureau: near ? 300 : 450 };
    });
    return map;
  }

  function getAll() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
      const d = defaults();
      localStorage.setItem(KEY, JSON.stringify(d));
      return d;
    } catch (e) {
      console.error('ShippingStore: read failed', e);
      return defaults();
    }
  }

  function getPrice(wilayaCode, method) {
    const all = getAll();
    const row = all[wilayaCode];
    if (!row) return 0;
    return method === 'bureau' ? row.bureau : row.domicile;
  }

  function setPrice(wilayaCode, method, price) {
    const all = getAll();
    if (!all[wilayaCode]) all[wilayaCode] = { domicile: 0, bureau: 0 };
    all[wilayaCode][method] = Number(price) || 0;
    localStorage.setItem(KEY, JSON.stringify(all));
  }

  function saveAll(map) {
    localStorage.setItem(KEY, JSON.stringify(map));
  }

  function resetToDefaults() {
    const d = defaults();
    localStorage.setItem(KEY, JSON.stringify(d));
    return d;
  }

  return { getAll, getPrice, setPrice, saveAll, resetToDefaults };
})();
