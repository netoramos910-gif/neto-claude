// ============================================================
//  EDITE AQUI O CONTEÚDO DO SEU PORTFÓLIO
//  Troque textos, links e imagens sem mexer no resto do código.
// ============================================================

const CONTENT = {
  // Sua marca no menu, na abertura e no rodapé: o "N" brilhante (media/n-mark.svg).
  //  - photo: coloque uma foto (ex.: "media/perfil-rosto.jpg") se preferir foto no lugar do N.
  profile: { photo: "" },

  // Empresa parceira (aparece no botão do topo e no bloco antes do rodapé).
  //  - url: link do site ou Instagram da empresa. Deixe "" enquanto não tiver.
  partner: { name: "Komp", url: "https://kompbr.com/", logo: "media/komp.png" },

  // Vídeos que você editou (faixa "Trabalhos"). Formato vertical (Reels/TikTok).
  //  - name: quem aparece no vídeo / cliente. Deixe "" para não mostrar.
  //  - tag: empresa ou detalhe (ex.: "G4"). Opcional.
  videos: [
    { src: "media/videos/video-6635.mp4", poster: "media/videos/video-6635.jpg", name: "", tag: "" },
    { src: "media/videos/video-6630.mp4", poster: "media/videos/video-6630.jpg", name: "", tag: "" },
    { src: "media/videos/video-6632.mp4", poster: "media/videos/video-6632.jpg", name: "", tag: "" },
    { src: "media/videos/video-6626.mp4", poster: "media/videos/video-6626.jpg", name: "", tag: "" },
    { src: "media/videos/video-6625.mp4", poster: "media/videos/video-6625.jpg", name: "", tag: "" },
  ],

  // Cases: pessoas e empresas que você já atendeu.
  //  - followers: número de seguidores (ex.: "12M"). Deixe "" para esconder.
  //  - video: caminho de um vídeo (ex.: "media/cases/g4.mp4") ou link. Deixe "" se não tiver.
  //  - logo: true para imagens de logo (mostra a imagem inteira, sem cortar).
  //  - role: cargo ou descrição curta embaixo do nome (opcional).
  creators: [
    { name: "Nikolas Ferreira", followers: "23,3M", avatar: "media/cases/nikolas-ferreira.jpg", video: "", color: "#22c55e" },
    { name: "Alfredo Soares",   followers: "1,7M", avatar: "media/cases/alfredo-soares.jpg",   video: "", color: "#6c5ce7" },
    { name: "Vitor Lelis",      followers: "1,6M", avatar: "media/cases/vitor-lelis.jpg",      video: "", color: "#1fb6ff" },
    { name: "Sermota",          followers: "3,9M", avatar: "media/cases/sermota.jpg",          video: "", color: "#c9822b", role: "" },
    { name: "G4 Business",      followers: "3,2M", avatar: "media/cases/g4.jpg",               video: "", color: "#0b1f3a", logo: true },
    { name: "Willian Naor",     followers: "53,2K", avatar: "media/cases/william.jpg",          video: "", color: "#1fb6ff", role: "Founder & VP da Loovi" },
    { name: "Alessandro Cunha", followers: "52,7K", avatar: "media/cases/alessandro-cunha.jpg", video: "", color: "#14a3a3", role: "Fundador do Grupo BC Energia" },
  ],

  contacts: [
    { type: "email",     label: "Email",     value: "seuemail@exemplo.com", href: "mailto:seuemail@exemplo.com" },
    { type: "instagram", label: "Instagram", value: "@seuperfil",           href: "https://instagram.com/seuperfil" },
    { type: "x",         label: "X (Twitter)", value: "@seuperfil",         href: "https://x.com/seuperfil" },
  ],

  // Textos da página em português (pt) e inglês (en).
  i18n: {
    pt: {
      studio: "NETO RAMOS × KOMP",
      menuWork: "Trabalhos", menuCreators: "Cases", menuContact: "Fale Comigo",
      heroTag: "CORTES VIRAIS · DISTRIBUIÇÃO", heroTitle: "CORTES VIRAIS",
      heroText: "Estratégia de distribuição em cortes virais para empresários, especialistas e grandes marcas que querem alcançar milhões de pessoas.",
      heroCta: "TRABALHE COMIGO", heroCta2: "Conheça a Komp ↗",
      partnerEyebrow: "PARCEIRO", partnerTitle: "Prefere uma empresa? Trabalhe com a Komp", partnerText: "Para projetos maiores, trabalho junto com a Komp, minha empresa parceira.", partnerBtn: "CONHECER A KOMP ↗",
      workEyebrow: "TRABALHOS SELECIONADOS", workTitle: "CORTES FEITOS POR MIM",
      creatorsEyebrow: "CASES", creatorsTitle: "QUEM JÁ CONFIOU NO MEU TRABALHO", followers: "seguidores", watch: "Ver vídeo",
      ctaTitle: "PRONTO PARA ELEVAR SUA MARCA?", ctaText: "Vamos criar um motion que faz as pessoas pararem de rolar.", ctaBtn: "COMEÇAR UM PROJETO",
      contactEyebrow: "CONTATO", contactA: "Vamos", contactB: "Conversar", contactText: "Tem um projeto em mente? Me chama.",
    },
    en: {
      studio: "NETO RAMOS × KOMP",
      menuWork: "Work", menuCreators: "Cases", menuContact: "Contact",
      heroTag: "VIRAL CLIPS · DISTRIBUTION", heroTitle: "VIRAL CLIPS",
      heroText: "A viral clip distribution strategy for entrepreneurs, experts and major brands that want to reach millions of people.",
      heroCta: "WORK WITH ME", heroCta2: "Meet Komp ↗",
      partnerEyebrow: "PARTNER", partnerTitle: "Prefer a company? Work with Komp", partnerText: "For larger projects, I work together with Komp, my partner company.", partnerBtn: "MEET KOMP ↗",
      workEyebrow: "SELECTED WORKS", workTitle: "CLIPS MADE BY ME",
      creatorsEyebrow: "CASES", creatorsTitle: "WHO HAS TRUSTED MY WORK", followers: "followers", watch: "Watch video",
      ctaTitle: "READY TO ELEVATE YOUR BRAND?", ctaText: "Let's create motion that makes people stop scrolling.", ctaBtn: "START A PROJECT",
      contactEyebrow: "CONTACT", contactA: "Let's", contactB: "Talk", contactText: "Got a project in mind? Reach out.",
    },
  },
};
