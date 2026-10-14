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
  function renderVideos() {
    const item = (v) => `
      <button class="reel" data-video="${v.src}" aria-label="${v.name || "Vídeo"}">
        <video src="${v.src}" poster="${v.poster}" muted loop playsinline preload="none"></video>
        <span class="reel__play">▶</span>
        ${v.name || v.tag ? `<span class="reel__info"><b>${v.name}</b>${v.tag ? `<small>${v.tag}</small>` : ""}</span>` : ""}
      </button>`;
    // repete até encher telas largas, depois duplica para o loop infinito
    let vids = CONTENT.videos;
    while (vids.length && vids.length < 9) vids = vids.concat(CONTENT.videos);
    const list = vids.map(item).join("");
    $("#projects").innerHTML = `<div class="reels__track">${list + list}</div>`;

    // só toca (sem som) o que está aparecendo na tela, para não pesar no celular
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const vid = e.target;
      if (e.isIntersecting) vid.play().catch(() => {}); else vid.pause();
    }), { threshold: 0.4 });
    document.querySelectorAll(".reel video").forEach((v) => io.observe(v));
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

  // efeito motion nos cases: o card que passa pelo centro cresce e brilha
  function caseFocus() {
    const box = document.querySelector("#creators .marquee");
    if (box) {
      const r = box.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const mid = r.left + r.width / 2;
        document.querySelectorAll("#creatorsTrack .creator__avatar").forEach((el) => {
          const c = el.getBoundingClientRect();
          const d = Math.min(Math.abs(c.left + c.width / 2 - mid) / (r.width / 2), 1);
          el.style.setProperty("--f", (1 - d).toFixed(3));
        });
      }
    }
    requestAnimationFrame(caseFocus);
  }
  requestAnimationFrame(caseFocus);

  // player de vídeo dos cases
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = '<button class="modal__close" aria-label="Fechar">✕</button><div class="modal__box"></div>';
  document.body.appendChild(modal);
  const closeModal = () => { modal.classList.remove("open"); modal.querySelector(".modal__box").innerHTML = ""; };
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.classList.contains("modal__close")) closeModal(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-video]");
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

  // foto de perfil: usa a imagem de CONTENT.profile.photo ou um ícone neutro
  const PERSON = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>';
  document.querySelectorAll("[data-avatar]").forEach((el) => {
    el.innerHTML = CONTENT.profile && CONTENT.profile.photo ? `<img src="${CONTENT.profile.photo}" alt="" />` : PERSON;
  });

  // ---------- init ----------
  renderVideos();
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

  // faixa de vídeos sobe ao aparecer
  gsap.from("#projects", { y: 60, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: "#projects", start: "top 85%" } });


  gsap.from(".contact__item", {
    y: 30, opacity: 0, stagger: .1, duration: .6,
    scrollTrigger: { trigger: "#contacts", start: "top 88%" },
  });
})();
