(() => {
  const $ = (s) => document.querySelector(s);
  let lang = "pt";
  const t = (key) => CONTENT.i18n[lang][key];

  const ICONS = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7z"/><path d="M9.2 8.6c.2-.4.5-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .2 0 .5-.4.7-.6.3-1.6.5-3-.2-1.5-.7-2.9-2.1-3.6-3.6-.7-1.4-.5-2.4-.2-3z" fill="currentColor" stroke="none"/></svg>',
  };

  // ---------- render ----------
  // cases girando num anel 3D
  function renderCreators() {
    const list = CONTENT.creators;
    $("#creatorsRing").innerHTML = `<div class="ring__spin" style="--n:${list.length}">${list.map((c, i) => `
      <div class="case-card ${c.logo ? "case-card--logo" : ""}" style="--i:${i};--c:${c.color}">
        <div class="case-card__face">
          ${c.avatar ? `<img src="${c.avatar}" alt="${c.name}" loading="lazy" />` : ""}
          <div class="case-card__info">
            <b class="verified ${c.name.length > 13 ? "is-long" : ""}">${c.name}</b>
            ${c.role ? `<em>${c.role}</em>` : ""}
          </div>
        </div>
        <div class="case-card__face case-card__back" aria-hidden="true">${c.avatar ? `<img src="${c.avatar}" alt="" loading="lazy" />` : ""}</div>
      </div>`).join("")}</div>`;
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
    const btn = e.target.closest("[data-video]");
    if (!btn) return;
    const src = btn.dataset.video;
    modal.querySelector(".modal__box").innerHTML = /\.(mp4|webm|mov)$/i.test(src)
      ? `<video src="${src}" controls autoplay playsinline></video>`
      : `<iframe src="${src}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    modal.classList.add("open");
  });

  // cortes virais passando numa faixa contínua, com as views em destaque
  function renderVirals() {
    const fmtM = (n) => n.toLocaleString(lang === "pt" ? "pt-BR" : "en-US", { maximumFractionDigits: 1 }) + "M";
    let list = CONTENT.virals || [];
    while (list.length && list.length < 8) list = list.concat(CONTENT.virals);
    const html = list.map((v) => `
      <figure class="viral-item">
        <div class="viral viral--flat">
          <video src="${v.src}" poster="${v.poster}" muted loop playsinline preload="none" aria-label="${fmtM(v.views)} views"></video>
        </div>
        <figcaption class="viral__count"><b>${fmtM(v.views)}</b> views</figcaption>
      </figure>`).join("");
    $("#viralsTrack").innerHTML = html + html;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const vid = e.target.querySelector("video");
      if (e.isIntersecting) vid.play().catch(() => {}); else vid.pause();
    }), { threshold: 0.5 });
    document.querySelectorAll("#viralsTrack .viral").forEach((el) => io.observe(el));
  }

  function renderFaq() {
    $("#faqList").innerHTML = t("faq").map(([q, a]) => `
      <details class="faq__item"><summary>${q}<span class="faq__icon" aria-hidden="true"></span></summary><p>${a}</p></details>`).join("");
  }

  function renderContacts() {
    $("#contacts").innerHTML = CONTENT.contacts.map((c) => `
      <a class="contact__item reveal-item" href="${c.href}" target="_blank" rel="noopener">
        ${ICONS[c.type] || ""}<b>${c.label}</b><span>${c.value}</span>
      </a>`).join("");
  }

  const contactBtn = $("#contactBtn"), contactList = $("#contacts");
  contactBtn.addEventListener("click", () => {
    const open = contactList.hidden;
    contactList.hidden = !open;
    contactBtn.setAttribute("aria-expanded", String(open));
    if (open && window.gsap) gsap.from("#contacts .contact__item", { y: 20, opacity: 0, stagger: .08, duration: .45, ease: "power3.out" });
  });

  function applyLang() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v) el.textContent = v;
    });
    renderCreators();
    renderFaq();
    renderVirals();
    if (typeof renderStats === "function" && $("#statsGrid").children.length) renderStatsLabels();
  }

  // ---------- interações ----------
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  const toggleMenu = (open) => {
    menu.classList.toggle("open", open);
    menuBtn.classList.toggle("open", open);
  };
  menuBtn.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
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
    const odo = (n) => String(n).split("").map((d) => `
      <span class="odo" data-d="${d}"><span class="odo__strip">${"0123456789".split("").map((x) => `<span>${x}</span>`).join("")}</span></span>`).join("");
    $("#statsGrid").innerHTML = (CONTENT.stats || []).map((st) => `
      <div class="stat"><b aria-label="${st.prefix || ""}${st.value}${st.suffix || ""}">${st.prefix ? `<i>${st.prefix}</i>` : ""}${odo(st.value)}${st.suffix ? `<i>${st.suffix}</i>` : ""}</b><span>${st[lang]}</span></div>`).join("");
    const pg = CONTENT.page || {};
    const link = $("#statsPage");
    if (pg.url) {
      link.href = pg.url; link.hidden = false;
      link.innerHTML = `${pg.logo ? `<img src="${pg.logo}" alt="" />` : ""}<span>${lang === "pt" ? "Ver a página" : "See the page"} ${pg.name} ↗</span>`;
    }
  }
  renderStats();
  function renderStatsLabels() {
    document.querySelectorAll(".stat > span").forEach((sp, i) => (sp.textContent = CONTENT.stats[i][lang]));
  }
  const statIO = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    statIO.disconnect();
    // cada dígito gira algumas voltas antes de parar no número certo, um depois do outro
    document.querySelectorAll(".odo").forEach((o, i) => {
      o.style.setProperty("--delay", `${i * 0.12}s`);
      o.classList.add("is-rolling");
    });
    setTimeout(() => document.querySelectorAll(".stat").forEach((st) => st.classList.add("is-done")), 2300);
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
  renderContacts();
  applyLang();

  // cases: começa no Nikolas em destaque e desliza suave de um case para o outro.
  // Roda sempre (inclusive no PC com "efeitos de animação" desligados no Windows) e não depende do GSAP.
  (function caseTour() {
    const spin = document.querySelector("#creatorsRing .ring__spin");
    if (!spin) return;
    const cards = [...spin.querySelectorAll(".case-card")];
    const n = cards.length, step = 360 / n;
    let k = 0, timer = null;
    const apply = () => {
      spin.style.transform = `rotateX(-6deg) rotateY(${-step * k}deg)`;
      cards.forEach((c, i) => c.classList.toggle("is-front", i === ((k % n) + n) % n));
    };
    spin.style.transition = "transform 2.2s cubic-bezier(.45,0,.55,1)";
    apply();
    const next = () => { k += 1; apply(); timer = setTimeout(next, 3300); };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) timer = setTimeout(next, 3200); // Nikolas fica um pouco mais em destaque
      if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; }
    }, { threshold: 0.3 });
    io.observe($("#creatorsRing"));
  })();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!window.gsap || reduce) { $("#loader").remove(); return; }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("is-loading");

  // abertura: NR, nome e barra carregando, depois o site aparece
  const intro = gsap.timeline({ onComplete: () => document.body.classList.remove("is-loading") });
  intro
    .from(".loader .avatar", { scale: .7, opacity: 0, filter: "blur(10px)", duration: .8, ease: "power3.out" })
    .from(".loader__name", { opacity: 0, letterSpacing: "1em", duration: .6 }, "-=.3")
    .to(".loader__bar span", { width: "100%", duration: .9, ease: "power2.inOut" })
    .to("#loader", { yPercent: -100, duration: .7, ease: "power4.inOut" })
    .from("#nav", { y: -40, opacity: 0, duration: .6 }, "-=.3")
    .from(".hero__headline", { y: 40, opacity: 0, filter: "blur(8px)", duration: .9, ease: "power3.out" }, "-=.4")
    .from(".hero .reveal", { y: 24, opacity: 0, stagger: .12, duration: .6 }, "-=.5")
    .add(() => $("#loader").remove());

  // parallax do hero
  gsap.to(".hero__bg", { scale: 1.15, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // títulos e textos ao rolar
  gsap.utils.toArray(".section .reveal").forEach((el) => {
    gsap.from(el, { y: 40, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  // faixa de vídeos sobe ao aparecer


  gsap.from(".hero__mark", { scale: .5, opacity: 0, duration: .9, ease: "back.out(2)", delay: 2.6 });
  ScrollTrigger.create({ trigger: "#faqList", start: "top 88%", once: true,
    onEnter: () => gsap.from("#faqList .faq__item", { y: 20, opacity: 0, stagger: .08, duration: .5 }) });

  gsap.from("#creatorsRing", { scale: .7, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#creatorsRing", start: "top 85%" } });
  gsap.from(".hero__word span", { yPercent: 100, opacity: 0, rotateX: -80, stagger: .06, duration: .8, ease: "back.out(1.6)", delay: 2.9 });

  gsap.from(".cases-title span", { yPercent: 110, opacity: 0, rotateX: -80, stagger: .08, duration: .9, ease: "back.out(1.6)",
    scrollTrigger: { trigger: ".cases-title", start: "top 85%" } });

  gsap.from(".contact__item", {
    y: 30, opacity: 0, stagger: .1, duration: .6,
    scrollTrigger: { trigger: "#contacts", start: "top 88%" },
  });
})();
