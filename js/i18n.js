/* =========================================================
   RVRS — i18n (English / Arabic)
   Usage: <span data-i18n="key">fallback text</span>
          <input data-i18n-ph="key" placeholder="fallback">
   ========================================================= */

const I18N = {
  en: {
    nav_shop: 'Shop', nav_about: 'About', nav_track: 'Track Order', nav_ig: 'Instagram',
    hero_eyebrow: 'CLOTHING (BRAND) · ALGERIA & BEYOND',
    hero_p: "From nothing into everything. Streetwear made for the flip side — order today, pay cash when it lands at your door.",
    scroll: 'SCROLL',
    manifesto_kicker: 'THE PHILOSOPHY',
    manifesto_l1: 'From nothing into everything.',
    manifesto_l2: "No shortcuts. No template drops. Just the flip side of ordinary.",
    trust1_n: '58', trust1_l: 'Wilayas covered — cash on delivery, nationwide.',
    trust2_n: '2–5', trust2_l: 'Days average delivery time, door to door.',
    trust3_n: '0 DZD', trust3_l: "Upfront. You only pay when your order's in hand.",
    cta_h: 'Follow the flip side.',
    cta_p: 'New drops, restocks, and behind-the-scenes — first on Instagram.',
    cta_ig: '@rvrs.cc on Instagram →',
    footer_tagline: 'From nothing into everything. Algerian streetwear, cash on delivery, nationwide.',
    footer_shop: 'SHOP', footer_all: 'All products',
    footer_orders: 'ORDERS', footer_order_cod: 'Order — Cash on Delivery', footer_admin: 'Admin dashboard',
    footer_follow: 'FOLLOW',
    footer_rights: '© 2026 RVRS. ALL RIGHTS RESERVED.',
    footer_note: 'CASH ON DELIVERY · ALGERIA · PRICES IN DZD',
    view_details: 'View details →',
    order_cod_btn: 'Order — Cash on Delivery',
    cod_note: 'No card needed. Pay when it arrives, anywhere in Algeria.',
    cod_title: 'Cash on Delivery',
    cod_sub: "We'll call to confirm before shipping.",
    field_name: 'Full name', ph_name: 'e.g. Yacine Belkacem',
    field_phone: 'Phone number', ph_phone: '05XX XX XX XX',
    field_qty: 'Quantity',
    field_wilaya: 'Wilaya', ph_wilaya: 'Select wilaya',
    field_size: 'Size', ph_size: 'Select size',
    field_method: 'Delivery method',
    method_domicile: 'Home delivery', method_bureau: 'Office pickup',
    field_address: 'Commune & exact address', ph_address: 'Commune, street, landmark for the delivery driver',
    field_address_bureau: 'Nearest office / commune', ph_address_bureau: 'Which commune office is easiest for you?',
    field_notes: 'Notes (optional)', ph_notes: 'e.g. call before arriving',
    row_product: 'Product', row_shipping: 'Shipping', row_total: 'Total — Cash on Delivery',
    submit_cod: 'Confirm Order',
    form_note: 'You pay nothing now. Our team calls to confirm, then your order ships. Payment is collected in cash on delivery.',
    success_title: 'Order confirmed',
    success_p: "Thanks — we've got your order. Our team will call you shortly to confirm before it ships.",
    order_again: 'Order again',
    faq_h: 'Questions before you order',
    faq_q1: 'How does Cash on Delivery work?',
    faq_a1: "Fill in the form with your details. Our team calls to confirm your order, then it ships. You pay in cash when it arrives — no card, no online payment.",
    faq_q2: 'How long does delivery take?',
    faq_a2: 'Most orders arrive within 2–5 business days depending on your wilaya. We cover all 58 wilayas.',
    faq_q3: "What's the difference between home delivery and office pickup?",
    faq_a3: "Home delivery brings the order to your address. Office pickup is cheaper — you collect it from the delivery company's office in your commune.",
    related_h: 'You might also like',
    breadcrumb_home: 'Home'
  },
  ar: {
    nav_shop: 'المتجر', nav_about: 'من نحن', nav_track: 'تتبع الطلب', nav_ig: 'انستغرام',
    hero_eyebrow: 'ملابس (علامة تجارية) · الجزائر وما وراءها',
    hero_p: 'من العدم إلى كل شيء. ملابس ستريت مصممة للوجه الآخر — اطلب اليوم وادفع نقدًا عند الاستلام.',
    scroll: 'مرر للأسفل',
    manifesto_kicker: 'الفلسفة',
    manifesto_l1: 'من العدم إلى كل شيء.',
    manifesto_l2: 'بلا اختصارات. بلا نماذج جاهزة. فقط الوجه الآخر للعادي.',
    trust1_n: '58', trust1_l: 'ولاية مغطاة — الدفع عند الاستلام في كل الجزائر.',
    trust2_n: '5-2', trust2_l: 'أيام متوسط التوصيل، من الباب إلى الباب.',
    trust3_n: '0 دج', trust3_l: 'مقدمًا. لا تدفع إلا عند استلام طلبك.',
    cta_h: 'تابع الوجه الآخر.',
    cta_p: 'إصدارات جديدة وكواليس — أولًا على انستغرام.',
    cta_ig: '@rvrs.cc على انستغرام ←',
    footer_tagline: 'من العدم إلى كل شيء. ملابس ستريت جزائرية، الدفع عند الاستلام، في كل الوطن.',
    footer_shop: 'المتجر', footer_all: 'كل المنتجات',
    footer_orders: 'الطلبات', footer_order_cod: 'اطلب — الدفع عند الاستلام', footer_admin: 'لوحة التحكم',
    footer_follow: 'تابعنا',
    footer_rights: '© 2026 RVRS. جميع الحقوق محفوظة.',
    footer_note: 'الدفع عند الاستلام · الجزائر · الأسعار بالدينار',
    view_details: 'عرض التفاصيل ←',
    order_cod_btn: 'اطلب — الدفع عند الاستلام',
    cod_note: 'بدون بطاقة. ادفع عند الاستلام في أي مكان بالجزائر.',
    cod_title: 'الدفع عند الاستلام',
    cod_sub: 'سنتصل بك للتأكيد قبل الشحن.',
    field_name: 'الاسم الكامل', ph_name: 'مثال: ياسين بلقاسم',
    field_phone: 'رقم الهاتف', ph_phone: '05XX XX XX XX',
    field_qty: 'الكمية',
    field_wilaya: 'الولاية', ph_wilaya: 'اختر الولاية',
    field_size: 'المقاس', ph_size: 'اختر المقاس',
    field_method: 'طريقة التوصيل',
    method_domicile: 'التوصيل للمنزل', method_bureau: 'الاستلام من المكتب',
    field_address: 'البلدية والعنوان الكامل', ph_address: 'البلدية، الشارع، أقرب معلم لسائق التوصيل',
    field_address_bureau: 'أقرب مكتب / بلدية', ph_address_bureau: 'ما هو أقرب مكتب لك؟',
    field_notes: 'ملاحظات (اختياري)', ph_notes: 'مثال: اتصل قبل الوصول',
    row_product: 'المنتج', row_shipping: 'التوصيل', row_total: 'المجموع — الدفع عند الاستلام',
    submit_cod: 'تأكيد الطلب',
    form_note: 'لا تدفع الآن. سيتصل بك فريقنا للتأكيد، ثم يُشحن طلبك. يُجمع الدفع نقدًا عند الاستلام.',
    success_title: 'تم تأكيد الطلب',
    success_p: 'شكرًا — استلمنا طلبك. سيتصل بك فريقنا قريبًا للتأكيد قبل الشحن.',
    order_again: 'اطلب مجددًا',
    faq_h: 'أسئلة قبل الطلب',
    faq_q1: 'كيف يعمل الدفع عند الاستلام؟',
    faq_a1: 'املأ الاستمارة ببياناتك. يتصل بك فريقنا لتأكيد الطلب، ثم يُشحن. تدفع نقدًا عند الاستلام — بدون بطاقة أو دفع إلكتروني.',
    faq_q2: 'كم يستغرق التوصيل؟',
    faq_a2: 'تصل معظم الطلبات خلال 2 إلى 5 أيام عمل حسب ولايتك. نغطي كل الولايات الـ58.',
    faq_q3: 'ما الفرق بين التوصيل للمنزل والاستلام من المكتب؟',
    faq_a3: 'التوصيل للمنزل يجلب الطلب إلى عنوانك. الاستلام من المكتب أرخص — تستلمه من مكتب شركة التوصيل في بلديتك.',
    related_h: 'قد يعجبك أيضًا',
    breadcrumb_home: 'الرئيسية'
  }
};

const I18nCtl = (() => {
  function getLang() {
    return localStorage.getItem('rvrs_lang') || 'en';
  }

  function apply(lang) {
    const dict = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function setLang(lang) {
    localStorage.setItem('rvrs_lang', lang);
    apply(lang);
    document.dispatchEvent(new CustomEvent('rvrs:langchange', { detail: { lang } }));
  }

  function t(key) {
    const dict = I18N[getLang()] || I18N.en;
    return dict[key] !== undefined ? dict[key] : key;
  }

  function init() {
    apply(getLang());
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  return { getLang, setLang, apply, t, init };
})();

document.addEventListener('DOMContentLoaded', I18nCtl.init);
