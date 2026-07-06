/* =========================================================
   RVRS — products catalog storage
   All product content lives here so admin.html can add,
   edit, or delete products and have it reflect across the
   whole site (home grid + product.html template page).
   ========================================================= */

const ProductsStore = (() => {
  const KEY = 'rvrs_products';

  function defaults() {
    return [
      {
        id: 'void-tee',
        eyebrow: '01 — TEE',
        name_en: 'Void Tee', name_ar: 'تيشيرت فويد',
        price: 3500, oldPrice: null,
        desc_en: 'Heavyweight 240gsm cotton, boxy fit, garment-dyed for a faded black that only gets better with wear. Reverse-stitched seams inside out — made to be worn both ways.',
        desc_ar: 'قطن ثقيل 240 غرام، قصة مربعة، مصبوغ بطريقة تمنحه أسود متلاشي يتحسن مع الاستخدام. خياطة مقلوبة — يُلبس من الجهتين.',
        badges_en: ['240gsm cotton', 'Boxy fit', 'Reversible seams', 'Made in Algeria'],
        badges_ar: ['قطن 240غ', 'قصة مربعة', 'خياطة قابلة للعكس', 'صنع في الجزائر'],
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop'
        ]
      },
      {
        id: 'from-nothing-hoodie',
        eyebrow: '02 — HOODIE',
        name_en: 'From Nothing Hoodie', name_ar: 'هودي فروم ناثينغ',
        price: 8500, oldPrice: 9800,
        desc_en: "Oversized, brushed-fleece hoodie with reverse-stitched seams — the manifesto isn't printed, it's built into the construction.",
        desc_ar: 'هودي واسع من الصوف المصقول بخياطة مقلوبة — الفلسفة ليست مطبوعة، بل مبنية في التصميم نفسه.',
        badges_en: ['400gsm fleece', 'Oversized fit', 'Reverse seams', 'Made in Algeria'],
        badges_ar: ['صوف 400غ', 'قصة واسعة', 'خياطة معكوسة', 'صنع في الجزائر'],
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop'
        ]
      },
      {
        id: 'reverse-coach-jacket',
        eyebrow: '03 — JACKET',
        name_en: 'Reverse Coach Jacket', name_ar: 'جاكيت ريفرس كوتش',
        price: 13500, oldPrice: null,
        desc_en: "Fully reversible shell — black one side, chalk the other. Snap buttons, drawcord hem, one jacket that's actually two.",
        desc_ar: 'جاكيت قابل للعكس بالكامل — أسود من جهة وأبيض عاجي من الأخرى. أزرار كبس وحزام سحب — قطعة واحدة بقطعتين.',
        badges_en: ['Fully reversible', 'Water-resistant', 'Quilted lining', 'Made in Algeria'],
        badges_ar: ['قابل للعكس بالكامل', 'مقاوم للماء', 'بطانة مبطنة', 'صنع في الجزائر'],
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop'
        ]
      },
      {
        id: 'nothing-cargos',
        eyebrow: '04 — PANTS',
        name_en: 'Nothing Cargos', name_ar: 'كارغو ناثينغ',
        price: 7200, oldPrice: null,
        desc_en: "Relaxed utility cargos in washed black, tunnel waistband, reinforced knees built for actual wear, not just the 'gram.",
        desc_ar: 'سروال كارغو مريح بلون أسود مغسول، حزام نفقي، ركب مقواة مصنوعة للاستخدام الفعلي.',
        badges_en: ['Ripstop cotton', 'Relaxed fit', 'Reinforced knees', 'Made in Algeria'],
        badges_ar: ['قطن ريب ستوب', 'قصة مريحة', 'ركب مقواة', 'صنع في الجزائر'],
        images: [
          'https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=1000&auto=format&fit=crop'
        ]
      }
    ];
  }

  function getAll() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
      const d = defaults();
      localStorage.setItem(KEY, JSON.stringify(d));
      return d;
    } catch (e) {
      console.error('ProductsStore: read failed', e);
      return defaults();
    }
  }

  function getById(id) {
    return getAll().find(p => p.id === id) || null;
  }

  function slugify(str) {
    return str.toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function save(product) {
    const all = getAll();
    if (!product.id) product.id = slugify(product.name_en) + '-' + Date.now().toString(36).slice(-4);
    const idx = all.findIndex(p => p.id === product.id);
    if (idx > -1) all[idx] = product; else all.push(product);
    localStorage.setItem(KEY, JSON.stringify(all));
    return product;
  }

  function deleteProduct(id) {
    const all = getAll().filter(p => p.id !== id);
    localStorage.setItem(KEY, JSON.stringify(all));
  }

  function resetToDefaults() {
    const d = defaults();
    localStorage.setItem(KEY, JSON.stringify(d));
    return d;
  }

  return { getAll, getById, save, deleteProduct, resetToDefaults, slugify };
})();
