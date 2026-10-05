/* =========================================================
   EIC — script.js
   i18n (EN/AR + RTL) · sticky header/mobile menu · entrance
   motion (+ fallback) · scroll reveal · works filter ·
   quote modal · form handling · WhatsApp link
   ========================================================= */

/* ---- CONFIG: change these ---- */
const WHATSAPP_NUMBER = window.EIC_CONFIG?.whatsappNumber || "971551934540"; // country code + number, no "+"
const WHATSAPP_TEXT   = "Hello, I'd like to know more about your services.";

/* ---------- 1. Translations ---------- */
const T = {
  en: {
    nav_about:"About Us", nav_hub:"Business Hub", get_offer:"Get an Offer",
    packages_tab:"Packages Pricing",
    separate_tab:"Separate Packages Pricing",
    starting_from:"Starting from",
    special_gift:"🎁 Special Gift: A professionally designed Company Profile & Portfolio.",
    sp1:"Website Development",
    sp1f1:"Complete WhatsApp Business setup & optimization",
    sp1f2:"Google Maps profile creation & verification",
    sp1f3:"Custom smart link page (Linktree) setup",
    sp2:"AI Agents",
    sp2f1:"Everything in the START package",
    sp2f2:"5 professional quick-reply templates for customers",
    sp2f3:"Social media Bio optimization across platforms",
    sp3:"AI Videos and images",
    sp3f1:"Everything in the GROW package",
    sp3f2:"Google Sheets tracker setup for customer data and payments",
    sp3f3:"30-minute monthly strategy call for new offers and ideas",
    sp4:"Video editing and Photography",
    sp4f1:"AI-Generated Visuals: Cutting-edge, custom image creation for your campaigns.",
    sp4f2:"Dynamic Video Content: Highly engaging, futuristic videos designed to stand out.",
    sp4f3:"Conversion Focus: Scroll-stopping ads optimized to grab attention and drive clicks.",
    sp5:"Marketing",
    sp5f1:"Strategic Campaigns: Comprehensive planning and execution across digital platforms.",
    sp5f2:"Targeted Advertising: Reaching your specific ideal audience to maximize ROI.",
    sp5f3:"Growth & Analytics: Continuous optimization, brand awareness building, and lead generation.",
    nav_home:"Home", nav_services:"Services", nav_pricing:"Pricing", nav_works:"Our Works", nav_contact:"Contact", nav_quote:"Get a Quote",
    badge:"Digital · AI · Web Services",
    hero_sub:"Websites, AI agents, video and marketing — built by one team, delivered fast.", hero_cta:"Start Your Project", hero_cta2:"See Our Work",
    explore_title:"Everything Your Business Needs",
    ex1:"Video, photo, AI, web and marketing under one roof.", ex2:"Three clear packages designed to grow with your business.",
    ex3:"Browse projects by web, AI and video.", ex4:"Send a message or ask for a free quote.",
    services_title:"Our Services", services_eyebrow:"CREATIVE THINKING. DIGITAL PRECISION.", services_sub:"From your first idea to your next stage of growth — crafted with care, built for impact.", services_cta:"Have a project in mind? Let’s make it happen.",
    s1:"Video Editing", s1d:"Sharp cuts, motion and sound for reels, ads and brand films.",
    s2:"Photo Editing", s2d:"Retouching, color grading and product photo cleanup.",
    s3:"AI Images", s3d:"Custom AI visuals for campaigns, products and social.",
    s4:"AI Videos", s4d:"AI-generated clips and animations from a simple brief.",
    s5:"Web Development", s5d:"Fast, responsive websites and online stores.",
    s6:"AI Agents", s6d:"Assistants that answer customers and automate your tasks.",
    s7:"Portfolios", s7d:"Clean portfolio sites that show your best work.",
    s8:"Profiles", s8d:"Business profiles with WhatsApp, QR and social links.",
    s9:"Marketing", s9d:"Content and campaigns that bring in real leads.",
    pricing_title:"Pricing Packages", mo:"/month", popular:"Most Popular",
    recommended:"RECOMMENDED", join:"JOIN NOW",
    p1_tag:"Get Seen", p2_tag:"Get Noticed", p3_tag:"Get Leads",
    p1f1:"Complete WhatsApp Business setup & optimization", p1f2:"Google Maps profile creation & verification", p1f3:"Custom smart link page (Linktree) setup", p1f4:"Direct review link with a custom QR Code", p1f5:"Business hours and contact details configuration", p1f6:"Basic product/service catalog setup",
    p2f1:"Everything in the START package", p2f2:"5 professional quick-reply templates for customers", p2f3:"Social media Bio optimization across platforms", p2f4:"Business registration in local online directories", p2f5:"Simplified monthly report on competitors’ offers", p2f6:"Monthly content and engagement ideas",
    p3f1:"Everything in the GROW package", p3f2:"Google Sheets tracker setup for customer data and payments", p3f3:"30-minute monthly strategy call for new offers and ideas", p3f4:"Daily initial response to comments and routing leads to WhatsApp", p3f5:"Monthly list of 3–5 local micro-influencers or partners for collaboration", p3f6:"Continuous WhatsApp catalog updates with new offers",
    works_title:"Our Works", f_all:"All", f_web:"Web", f_ai:"AI", f_video:"Video",
    w1:"Luxury Real Estate Site", w2:"AI Product Visuals", w3:"Brand Reel", w4:"Customer Support Agent",
    w5:"Online Store", w6:"Product Launch Ad", w7:"Designer Portfolio", w8:"AI Video Campaign",
    contact_title:"Contact Us", l_name:"Name", l_email:"Email", l_service:"Service Needed", l_msg:"Message", l_project:"Your project",
    send:"Send Message", info_title:"Let's talk", rights:"All rights reserved.",
    modal_title:"Get a Free Quote", modal_sub:"Tell us what you need. We reply within 24 hours.", modal_send:"Request Quote",
    form_hint:"Send your message directly from this page.", sending:"Sending…", sent:"Your email has been sent successfully. Thank you!", send_error:"We couldn't submit your request. Your details are still here; please try again or contact us on WhatsApp.", setup_error:"Email delivery is not yet configured. Please contact us on WhatsApp.", endpoint_error:"Email delivery is temporarily unavailable. Please contact us on WhatsApp.", hosted_only:"Please use this form on the live website. For local previews, contact us on WhatsApp.", bad:"Please fill in all fields with valid details."
  },
  ar: {
    nav_about:"من نحن", nav_hub:"دليل الشركات", get_offer:"احصل على العرض",
    packages_tab:"أسعار الباقات الرئيسية",
    separate_tab:"أسعار الباقات المنفصلة",
    starting_from:"تبدأ من",
    special_gift:"🎁 هدية خاصة: تصميم احترافي لملف الشركة ومعرض أعمالها.",
    sp1:"تطوير المواقع",
    sp1f1:"إعداد واتساب بزنس بالكامل وتحسينه",
    sp1f2:"إنشاء ملف النشاط على خرائط Google والتحقق منه",
    sp1f3:"إعداد صفحة روابط ذكية مخصصة (Linktree)",
    sp2:"وكلاء الذكاء الاصطناعي",
    sp2f1:"كل ما تتضمنه باقة START",
    sp2f2:"5 قوالب احترافية للردود السريعة على العملاء",
    sp2f3:"تحسين النبذة التعريفية على منصات التواصل الاجتماعي",
    sp3:"فيديوهات وصور بالذكاء الاصطناعي",
    sp3f1:"كل ما تتضمنه باقة GROW",
    sp3f2:"إعداد جدول Google Sheets لتتبع بيانات العملاء والمدفوعات",
    sp3f3:"مكالمة استراتيجية شهرية لمدة 30 دقيقة للعروض والأفكار الجديدة",
    sp4:"مونتاج الفيديو والتصوير",
    sp4f1:"صور مولدة بالذكاء الاصطناعي: إنشاء صور مخصصة لحملاتك باستخدام أحدث التقنيات.",
    sp4f2:"محتوى فيديو ديناميكي: فيديوهات جذابة بطابع مستقبلي مصممة لتتميز.",
    sp4f3:"التركيز على التحويل: إعلانات لافتة تجذب الانتباه وتدفع المشاهدين للنقر.",
    sp5:"التسويق",
    sp5f1:"حملات استراتيجية: تخطيط وتنفيذ شامل عبر المنصات الرقمية.",
    sp5f2:"إعلانات مستهدفة: الوصول إلى جمهورك المثالي لتحقيق أقصى عائد على الاستثمار.",
    sp5f3:"النمو والتحليلات: تحسين مستمر وبناء الوعي بالعلامة التجارية وتوليد العملاء المحتملين.",
    nav_home:"الرئيسية", nav_services:"خدماتنا", nav_pricing:"الأسعار", nav_works:"أعمالنا", nav_contact:"اتصل بنا", nav_quote:"احصل على عرض سعر",
    badge:"رقمي · ذكاء اصطناعي · ويب",
    hero_sub:"مواقع، وكلاء ذكاء اصطناعي، فيديو وتسويق — فريق واحد وتسليم سريع.", hero_cta:"ابدأ مشروعك", hero_cta2:"شاهد أعمالنا",
    explore_title:"كل ما يحتاجه عملك",
    ex1:"فيديو وصور وذكاء اصطناعي وويب وتسويق تحت سقف واحد.", ex2:"ثلاث باقات واضحة مصممة لتنمو مع نشاطك.",
    ex3:"تصفح المشاريع حسب الويب والذكاء الاصطناعي والفيديو.", ex4:"أرسل رسالة أو اطلب عرض سعر مجاني.",
    services_title:"خدماتنا", services_eyebrow:"فكر إبداعي. إتقان رقمي.", services_sub:"من فكرتك الأولى إلى مرحلة نموك القادمة — نصنع بإتقان ونطوّر لنترك أثراً.", services_cta:"عندك مشروع؟ خلينا نحوله لواقع.",
    s1:"مونتاج الفيديو", s1d:"قص احترافي وحركة وصوت للريلز والإعلانات وأفلام العلامة.",
    s2:"تعديل الصور", s2d:"روتوش وتصحيح ألوان وتنظيف صور المنتجات.",
    s3:"صور بالذكاء الاصطناعي", s3d:"صور مخصصة للحملات والمنتجات ومواقع التواصل.",
    s4:"فيديوهات بالذكاء الاصطناعي", s4d:"مقاطع ورسوم متحركة بالذكاء الاصطناعي من فكرة بسيطة.",
    s5:"تطوير المواقع", s5d:"مواقع سريعة ومتجاوبة ومتاجر إلكترونية.",
    s6:"وكلاء الذكاء الاصطناعي", s6d:"مساعدون يردون على العملاء ويؤتمتون مهامك.",
    s7:"المعارض الشخصية", s7d:"مواقع أعمال أنيقة تعرض أفضل ما لديك.",
    s8:"الملفات التعريفية", s8d:"ملف نشاط تجاري مع واتساب ورمز QR وروابط التواصل.",
    s9:"التسويق", s9d:"محتوى وحملات تجلب عملاء حقيقيين.",
    pricing_title:"باقات الأسعار", mo:"/شهرياً", popular:"الأكثر طلباً",
    recommended:"موصى بها", join:"اشترك الآن",
    p1_tag:"كن مرئياً", p2_tag:"كن ملحوظاً", p3_tag:"احصل على عملاء",
    p1f1:"إعداد واتساب بزنس بالكامل وتحسينه", p1f2:"إنشاء ملف النشاط على خرائط Google والتحقق منه", p1f3:"إعداد صفحة روابط ذكية مخصصة (Linktree)", p1f4:"رابط مباشر للتقييمات مع رمز QR مخصص", p1f5:"إعداد ساعات العمل وبيانات التواصل", p1f6:"إعداد كتالوج أساسي للمنتجات والخدمات",
    p2f1:"كل ما تتضمنه باقة START", p2f2:"5 قوالب احترافية للردود السريعة على العملاء", p2f3:"تحسين النبذة التعريفية على منصات التواصل الاجتماعي", p2f4:"تسجيل النشاط في الأدلة المحلية على الإنترنت", p2f5:"تقرير شهري مبسّط عن عروض المنافسين", p2f6:"أفكار شهرية للمحتوى والتفاعل",
    p3f1:"كل ما تتضمنه باقة GROW", p3f2:"إعداد جدول Google Sheets لتتبع بيانات العملاء والمدفوعات", p3f3:"مكالمة استراتيجية شهرية لمدة 30 دقيقة للعروض والأفكار الجديدة", p3f4:"رد أولي يومي على التعليقات وتوجيه العملاء المحتملين إلى واتساب", p3f5:"قائمة شهرية تضم 3–5 مؤثرين محليين صغار أو شركاء للتعاون", p3f6:"تحديث كتالوج واتساب باستمرار بالعروض الجديدة",
    works_title:"أعمالنا", f_all:"الكل", f_web:"ويب", f_ai:"ذكاء اصطناعي", f_video:"فيديو",
    w1:"موقع عقارات فاخر", w2:"صور منتجات بالذكاء الاصطناعي", w3:"ريل للعلامة التجارية", w4:"وكيل دعم العملاء",
    w5:"متجر إلكتروني", w6:"إعلان إطلاق منتج", w7:"معرض أعمال مصمم", w8:"حملة فيديو بالذكاء الاصطناعي",
    contact_title:"اتصل بنا", l_name:"الاسم", l_email:"البريد الإلكتروني", l_service:"الخدمة المطلوبة", l_msg:"الرسالة", l_project:"مشروعك",
    send:"إرسال الرسالة", info_title:"تواصل معنا", rights:"جميع الحقوق محفوظة.",
    modal_title:"احصل على عرض سعر مجاني", modal_sub:"أخبرنا بما تحتاجه. نرد خلال 24 ساعة.", modal_send:"اطلب عرض السعر",
    form_hint:"أرسل رسالتك مباشرة من هذه الصفحة.", sending:"جارٍ الإرسال…", sent:"تم إرسال الإيميل بنجاح. شكراً لتواصلك معنا!", send_error:"تعذّر تقديم الطلب. بياناتك محفوظة في النموذج؛ حاول مجدداً أو تواصل معنا على واتساب.", setup_error:"إرسال البريد لم يتم إعداده بعد. تواصل معنا على واتساب.", endpoint_error:"إرسال البريد غير متاح حالياً. تواصل معنا على واتساب.", hosted_only:"استخدم النموذج من الموقع المنشور. للمعاينة المحلية، تواصل معنا على واتساب.", bad:"يرجى تعبئة جميع الحقول ببيانات صحيحة."
  }
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
let lang = localStorage.getItem("lang") || "en";

function setLang(l) {
  lang = l;
  const html = document.documentElement;
  html.lang = l;
  html.dir  = l === "ar" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach(el => {
    const v = T[l][el.dataset.i18n];
    if (v) el.textContent = v;
  });
  const langBtn = $("#lang");
  if (langBtn) langBtn.textContent = l === "ar" ? "EN" : "AR";
  localStorage.setItem("lang", l);
}
const langBtn = $("#lang");
if (langBtn) langBtn.addEventListener("click", () => setLang(lang === "en" ? "ar" : "en"));

/* ---------- 2. Sticky header + mobile menu ---------- */
const nav = $(".header");
window.addEventListener("scroll", () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
}, { passive:true });

const burger = $("#burger"), siteNav = $("#site-nav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger){ burger.classList.remove("open"); burger.setAttribute("aria-expanded","false"); burger.setAttribute("aria-label","Open menu"); }
}
function openMenu(){
  document.body.classList.add("menu-open");
  if (burger){ burger.classList.add("open"); burger.setAttribute("aria-expanded","true"); burger.setAttribute("aria-label","Close menu"); }
}
if (burger) burger.addEventListener("click", () => document.body.classList.contains("menu-open") ? closeMenu() : openMenu());
if (siteNav) $$("a", siteNav).forEach(a => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
window.addEventListener("resize", () => { if (window.matchMedia("(min-width:901px)").matches) closeMenu(); });

/* ---------- 3. Entrance motion (.appear) + fallback ---------- */
$$(".appear").forEach(el => {
  el.addEventListener("animationend", () => el.classList.add("is-in"), { once:true });
});
requestAnimationFrame(() => requestAnimationFrame(() => {
  $$(".appear").forEach(el => {
    const anims = el.getAnimations ? el.getAnimations() : [];
    const running = anims.some(a => a.playState === "running" || a.playState === "finished");
    if (!running) el.classList.add("is-in");
  });
}));

/* ---------- 4. Scroll reveal for below-the-fold content ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold:.15 });
$$(".reveal").forEach((el,i) => { el.style.transitionDelay = (i % 3) * 90 + "ms"; io.observe(el); });

/* ---------- 5. Works filter ---------- */
$$(".chip").forEach(chip => chip.addEventListener("click", () => {
  $$(".chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  const f = chip.dataset.filter;
  $$(".work").forEach(w => {
    const show = f === "all" || w.dataset.cat === f;
    w.classList.toggle("hide", !show);
    if (show) { w.classList.remove("pop"); void w.offsetWidth; w.classList.add("pop"); }
  });
}));

/* ---------- 6. Quote modal ---------- */
const modal = $("#modal");
function openModal(){ if(!modal) return; modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; setTimeout(()=>{const f=$("#quoteForm input"); if(f) f.focus();},350); }
function closeModal(){ if(!modal) return; modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; }
const quoteBtn = $("#quoteBtn");
if (quoteBtn) quoteBtn.addEventListener("click", () => { closeMenu(); openModal(); });
$$(".join").forEach(b => b.addEventListener("click", openModal));
const closeModalBtn = $("#closeModal");
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- Forms: direct email submission ---------- */
function handleForm(form, note) {
  if (!form) return;
  let sending = false;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (sending) return;
    if (note) { note.textContent = ""; note.dataset.status = ""; }
    let validForm = true;
    $$("input,select,textarea", form).forEach(field => {
      const valid = field.value.trim() && field.checkValidity();
      field.parentElement.classList.toggle("err", !valid);
      if (!valid) validForm = false;
    });
    if (!validForm) { if (note) note.textContent = T[lang].bad; form.reportValidity(); return; }
    if (!/^https?:$/.test(window.location.protocol)) {
      if (note) note.textContent = T[lang].hosted_only;
      return;
    }
    const data = new FormData(form);
    const payload = {
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      message: data.get("message").trim(),
      _replyto: data.get("email").trim(),
      _subject: form.id === "quoteForm" ? "EIC — Request Quote" : "EIC — Contact Request",
      _template: "table",
      _url: window.location.href
    };
    if (data.get("service")) payload.service = data.get("service");
    const button = $('button[type="submit"]', form);
    const originalText = button?.textContent;
    sending = true;
    form.setAttribute("aria-busy", "true");
    if (button) { button.disabled = true; button.textContent = T[lang].sending; }
    if (note) note.textContent = T[lang].sending;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(window.EIC_CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      if (!response.headers.get("content-type")?.includes("application/json")) {
        if (note) { note.textContent = T[lang].endpoint_error; note.dataset.status = "error"; }
        return;
      }
      const result = await response.json();
      if (result.code === "EMAIL_NOT_CONFIGURED") {
        if (note) { note.textContent = T[lang].setup_error; note.dataset.status = "error"; }
        return;
      }
      if (!response.ok || !(result.success === true && typeof result.id === "string" && result.id.length > 0)) throw new Error("Submission rejected");
      if (note) { note.textContent = T[lang].sent; note.dataset.status = "success"; }
      form.reset();
    } catch (error) {
      if (note) { note.textContent = T[lang].send_error; note.dataset.status = "error"; }
    } finally {
      clearTimeout(timer);
      sending = false;
      form.removeAttribute("aria-busy");
      if (button) {
        button.disabled = false;
        button.textContent = T[lang][button.dataset.i18n] || originalText;
      }
    }
  });
}
handleForm($("#contactForm"), $("#formNote"));
handleForm($("#quoteForm"), $("#quoteNote"));
const contactEmail = $("#contactEmail");
if (contactEmail && window.EIC_CONFIG?.contactEmail?.trim()) {
  contactEmail.textContent = window.EIC_CONFIG.contactEmail.trim();
  contactEmail.href = `mailto:${window.EIC_CONFIG.contactEmail.trim()}`;
  $("#contactEmailRow").hidden = false;
}

const heroVideo = $(".hero-video");
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.play().catch(() => {});
}

/* ---------- Pricing group tabs ---------- */
const pricingTabs = $$(".pricing-tab");
function selectPricingTab(tab, focus = false) {
  pricingTabs.forEach(button => {
    const selected = button === tab;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  });
  if (focus) tab.focus();
}
pricingTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectPricingTab(tab));
  tab.addEventListener("keydown", event => {
    const rtl = document.documentElement.dir === "rtl";
    let next;
    if (event.key === "ArrowRight") next = index + (rtl ? -1 : 1);
    if (event.key === "ArrowLeft") next = index + (rtl ? 1 : -1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = pricingTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectPricingTab(pricingTabs[(next + pricingTabs.length) % pricingTabs.length], true);
  });
});

/* ---------- Extras ---------- */
const wa = $("#wa");
if (wa) wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
const yr = $("#yr");
if (yr) yr.textContent = new Date().getFullYear();

setLang(lang); // apply saved language on load
