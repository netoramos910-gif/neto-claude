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
  // cortes flutuando em órbita ao redor do N, com linhas de luz ligando o N a cada vídeo
  function renderVideos() {
    const vids = CONTENT.videos;
    const card = (v, i) => `
      <button class="reel" data-video="${v.src}" data-i="${i}" aria-label="${v.name || "Vídeo"}">
        <video src="${v.src}" poster="${v.poster}" muted loop playsinline preload="none"></video>
        <span class="reel__play">▶</span>
      </button>`;
    $("#projects").innerHTML = `
      <svg class="orbit__lines" aria-hidden="true">
        <defs><linearGradient id="beam" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e9f6ff"/><stop offset="1" stop-color="#1fb6ff"/></linearGradient></defs>
        ${vids.map(() => '<line class="orbit__beam"/><line class="orbit__flow"/>').join("")}
      </svg>
      <div class="orbit__center"><span class="kmark-wrap"><span class="nmark"></span></span></div>
      ${vids.map(card).join("")}`;

    const box = $("#projects");
    const cards = [...box.querySelectorAll(".reel")];
    const beams = [...box.querySelectorAll(".orbit__beam")];
    const flows = [...box.querySelectorAll(".orbit__flow")];
    const svg = box.querySelector("svg");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = -Math.PI / 2, paused = false, last = performance.now();
    cards.forEach((c) => {
      c.addEventListener("mouseenter", () => (paused = true));
      c.addEventListener("mouseleave", () => (paused = false));
    });

    function frame(now) {
      const dt = Math.min(now - last, 50); last = now;
      if (!paused && !still) angle += dt * 0.00012;
      const w = box.clientWidth, h = box.clientHeight;
      const cw = cards[0] ? cards[0].offsetWidth : 0, ch = cards[0] ? cards[0].offsetHeight : 0;
      const cx = w / 2, cy = h / 2;
      const rx = Math.max(w / 2 - cw / 2 - 6, 60), ry = Math.max(h / 2 - ch / 2 - 6, 60);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      box.querySelector("#beam").setAttribute("x1", cx); box.querySelector("#beam").setAttribute("y1", cy);
      cards.forEach((c, i) => {
        const t = angle + (i * 2 * Math.PI) / cards.length;
        const x = cx + rx * Math.cos(t), y = cy + ry * Math.sin(t);
        const depth = (Math.sin(t) + 1) / 2; // 0 = atrás (em cima), 1 = na frente (embaixo)
        c.style.transform = `translate(${x - cw / 2}px, ${y - ch / 2}px) scale(${0.82 + depth * 0.22})`;
        c.style.zIndex = 10 + Math.round(depth * 10);
        c.style.opacity = 0.6 + depth * 0.4;
        [beams[i], flows[i]].forEach((l) => {
          l.setAttribute("x1", cx); l.setAttribute("y1", cy); l.setAttribute("x2", x); l.setAttribute("y2", y);
        });
      });
      box.querySelector("#beam").setAttribute("x2", cx + rx); box.querySelector("#beam").setAttribute("y2", cy);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // toca os vídeos (sem som) só quando a seção está na tela
    const io = new IntersectionObserver(([e]) => cards.forEach((c) => {
      const v = c.querySelector("video");
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { threshold: 0.2 });
    io.observe(box);
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
    if (typeof renderStats === "function" && $("#statsGrid").children.length) renderStatsLabels();
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
  document.querySelectorAll("[data-avatar]").forEach((el) => {
    const pr = CONTENT.profile || {};
    if (pr.photo) { el.innerHTML = `<img src="${pr.photo}" alt="" />`; return; }
    el.classList.add("avatar--mark");
    el.innerHTML = '<span class="kmark-wrap"><span class="nmark"></span></span>';
  });

  // empresa parceira: link e logo vêm de CONTENT.partner
  const partner = CONTENT.partner || {};
  if (partner.url) document.querySelectorAll("[data-partner-link]").forEach((a) => {
    a.href = partner.url; a.target = "_blank"; a.rel = "noopener";
  });
  if (partner.logo) document.querySelectorAll(".kmark").forEach((k) => {
    k.style.webkitMaskImage = k.style.maskImage = `url("${partner.logo}")`;
  });

  // números: contam do zero até o valor quando aparecem na tela
  function renderStats() {
    $("#statsGrid").innerHTML = (CONTENT.stats || []).map((st) => `
      <div class="stat"><b data-to="${st.value}" data-pre="${st.prefix || ""}" data-suf="${st.suffix || ""}">${st.prefix || ""}0${st.suffix || ""}</b><span>${st[lang]}</span></div>`).join("");
    const pg = CONTENT.page || {};
    const link = $("#statsPage");
    if (pg.url) {
      link.href = pg.url; link.hidden = false;
      link.innerHTML = `${pg.logo ? `<img src="${pg.logo}" alt="" />` : ""}<span>${lang === "pt" ? "Ver a página" : "See the page"} ${pg.name} ↗</span>`;
    }
  }
  renderStats();
  function renderStatsLabels() {
    document.querySelectorAll(".stat span").forEach((sp, i) => (sp.textContent = CONTENT.stats[i][lang]));
  }
  const statIO = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    statIO.disconnect();
    document.querySelectorAll(".stat b").forEach((b) => {
      const to = +b.dataset.to, t0 = performance.now(), dur = 1800;
      (function count(now) {
        const k = Math.min((now - t0) / dur, 1), ease = 1 - Math.pow(1 - k, 3);
        b.textContent = b.dataset.pre + Math.round(to * ease) + b.dataset.suf;
        if (k < 1) requestAnimationFrame(count);
      })(t0);
    });
  }, { threshold: 0.4 });
  statIO.observe($("#statsGrid"));

  // "como funciona": desenha as ilustrações e conta as views quando aparecem na tela
  const fmt = (n) => n.toLocaleString(lang === "pt" ? "pt-BR" : "en-US");
  const drawIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-drawn");
    drawIO.unobserve(e.target);
    const c = e.target.querySelector(".how__counter");
    if (c) {
      const to = +c.dataset.to, t0 = performance.now(), dur = 2200;
      (function count(now) {
        const k = Math.min((now - t0) / dur, 1), ease = 1 - Math.pow(1 - k, 3);
        c.textContent = (k === 1 ? "+" : "") + fmt(Math.round(to * ease));
        if (k < 1) requestAnimationFrame(count);
      })(t0);
    }
  }), { threshold: 0.35 });
  document.querySelectorAll(".how__step").forEach((el) => drawIO.observe(el));

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
    .from(".loader .avatar", { x: -70, opacity: 0, duration: .7, ease: "power3.out" })
    .from(".loader .kmark-wrap", { x: 70, opacity: 0, duration: .7, ease: "power3.out" }, "<")
    .from(".loader .collab__x", { scale: 0, rotate: -90, opacity: 0, duration: .5, ease: "back.out(3)" }, "-=.25")
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
