(() => {
  const $ = (s) => document.querySelector(s);
  let lang = "pt";
  const t = (key) => CONTENT.i18n[lang][key];

  const ICONS = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>',
  };

  // ---------- render ----------
  function renderMedia(src, color) {
    if (!src) return `<div class="project__placeholder" style="--c:${color}"></div>`;
    if (/\.(mp4|webm|mov)$/i.test(src)) return `<video src="${src}" muted loop playsinline autoplay></video>`;
    return `<img src="${src}" alt="" loading="lazy" />`;
  }

  function renderProjects() {
    $("#projects").innerHTML = CONTENT.projects.map((p) => `
      <article class="project ${p.size ? "project--" + p.size : ""}">
        <div class="project__media">${renderMedia(p.media, p.color)}</div>
        <div class="project__info"><small>${p.tag}</small><h3>${p.title}</h3></div>
      </article>`).join("");
  }

  function renderFeatures() {
    $("#features").innerHTML = CONTENT.features[lang].map((f) => `
      <article class="card"><small>${t("featured")}</small><h3>${f.title}</h3><p>${f.text}</p></article>`).join("");
  }

  function renderCreators() {
    const item = (c, i) => `
      <div class="creator" style="--d:${(i % 4) * -1.1}s">
        <div class="creator__avatar ${c.logo ? "creator__avatar--logo" : ""}" style="--c:${c.color}">
          ${c.avatar ? `<img src="${c.avatar}" alt="${c.name}" loading="lazy" />` : c.name[0]}
          ${c.video ? `<button class="creator__play" data-video="${c.video}" aria-label="${t("watch")}: ${c.name}">▶</button>` : ""}
        </div>
        <b>${c.name}</b>
        ${c.role ? `<em>${c.role}</em>` : ""}
        ${c.followers ? `<span>${c.followers} ${t("followers")}</span>` : ""}
      </div>`;
    // repete a lista até encher a tela e duplica para o loop infinito do carrossel
    let items = CONTENT.creators;
    while (items.length < 8) items = items.concat(CONTENT.creators);
    const list = items.map(item).join("");
    $("#creatorsTrack").innerHTML = list + list;
  }

  // player de vídeo dos cases
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = '<button class="modal__close" aria-label="Fechar">✕</button><div class="modal__box"></div>';
  document.body.appendChild(modal);
  const closeModal = () => { modal.classList.remove("open"); modal.querySelector(".modal__box").innerHTML = ""; };
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.classList.contains("modal__close")) closeModal(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".creator__play");
    if (!btn) return;
    const src = btn.dataset.video;
    modal.querySelector(".modal__box").innerHTML = /\.(mp4|webm|mov)$/i.test(src)
      ? `<video src="${src}" controls autoplay playsinline></video>`
      : `<iframe src="${src}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    modal.classList.add("open");
  });

  function renderContacts() {
    $("#contacts").innerHTML = CONTENT.contacts.map((c) => `
      <a class="contact__item reveal-item" href="${c.href}" target="_blank" rel="noopener">
        ${ICONS[c.type] || ""}<b>${c.label}</b><span>${c.value}</span>
      </a>`).join("");
  }

  function applyLang() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v) el.textContent = v;
    });
    $("#langBtn").textContent = lang === "pt" ? "EN" : "PT";
    splitTitle();
    renderFeatures();
    renderCreators();
  }

  function splitTitle() {
    const el = $("#heroTitle");
    el.innerHTML = [...el.textContent].map((ch) => `<span class="ch">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
  }

  // ---------- interações ----------
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  const toggleMenu = (open) => {
    menu.classList.toggle("open", open);
    menuBtn.classList.toggle("open", open);
  };
  menuBtn.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  $("#langBtn").addEventListener("click", () => { lang = lang === "pt" ? "en" : "pt"; applyLang(); });
  $("#themeBtn").addEventListener("click", () => document.body.classList.toggle("dim"));
  $("#year").textContent = new Date().getFullYear();

  // ---------- init ----------
  renderProjects();
  renderContacts();
  applyLang();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!window.gsap || reduce) { $("#loader").remove(); return; }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("is-loading");

  // abertura
  const intro = gsap.timeline({ onComplete: () => document.body.classList.remove("is-loading") });
  intro
    .from(".loader__logo", { scale: .6, opacity: 0, duration: .6, ease: "back.out(2)" })
    .from(".loader__name", { opacity: 0, letterSpacing: "1em", duration: .6 }, "-=.3")
    .to(".loader__bar span", { width: "100%", duration: .9, ease: "power2.inOut" })
    .to("#loader", { yPercent: -100, duration: .7, ease: "power4.inOut" })
    .from("#nav", { y: -40, opacity: 0, duration: .6 }, "-=.3")
    .from("#heroTitle .ch", { y: 80, opacity: 0, filter: "blur(8px)", stagger: .04, duration: .8, ease: "power3.out" }, "-=.4")
    .from(".hero .reveal", { y: 24, opacity: 0, stagger: .12, duration: .6 }, "-=.5")
    .add(() => $("#loader").remove());

  // parallax do hero
  gsap.to(".hero__title", { yPercent: 40, opacity: .2, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__bg", { scale: 1.15, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // títulos e textos ao rolar
  gsap.utils.toArray(".section .reveal").forEach((el) => {
    gsap.from(el, { y: 40, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  // projetos entram em cascata
  gsap.from(".project", {
    y: 60, opacity: 0, scale: .94, stagger: .08, duration: .8, ease: "power3.out",
    scrollTrigger: { trigger: "#projects", start: "top 85%" },
  });

  // cards: animação refeita quando o idioma muda, então usa batch no container
  ScrollTrigger.create({
    trigger: "#features", start: "top 85%", once: true,
    onEnter: () => gsap.from("#features .card", { y: 50, opacity: 0, stagger: .15, duration: .8, ease: "power3.out" }),
  });

  gsap.from(".contact__item", {
    y: 30, opacity: 0, stagger: .1, duration: .6,
    scrollTrigger: { trigger: "#contacts", start: "top 88%" },
  });
})();
