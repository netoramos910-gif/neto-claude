// ============================================================
//  EDITE AQUI O CONTEÚDO DO SEU PORTFÓLIO
//  Troque textos, links e imagens sem mexer no resto do código.
// ============================================================

const CONTENT = {
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

  features: {
    pt: [
      { title: "ACABAMENTO DE CINEMA", text: "Cor, contraste e composição ajustados como numa cena de filme. Cada entrega passa por um tratamento final cuidadoso." },
      { title: "MOTION COM IDENTIDADE", text: "Sua tipografia, suas cores e seu tom de voz definem como tudo se move. Nada de animação genérica." },
      { title: "RITMO & SINCRONIA", text: "Cortes e transições casados com a trilha e o som. É esse encaixe que prende quem está assistindo." },
    ],
    en: [
      { title: "CINEMATIC FINISH", text: "Color, contrast and composition tuned like a film scene. Every delivery gets a careful finishing pass." },
      { title: "MOTION WITH IDENTITY", text: "Your typography, colors and voice define how everything moves. No generic animation." },
      { title: "RHYTHM & SYNC", text: "Cuts and transitions locked to the music and sound design. That fit is what keeps people watching." },
    ],
  },

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
      studio: "SEU STUDIO",
      menuWork: "Trabalhos", menuWhy: "Diferenciais", menuCreators: "Cases", menuContact: "Fale Comigo",
      heroTag: "MOTION & VFX STUDIO", heroTitle: "MOTION DESIGN",
      heroText: "Animações sob medida para marcas e criadores que querem ser lembrados. Intros, vinhetas e transições pensadas quadro a quadro.",
      heroCta: "VER MEU TRABALHO ↓", heroCta2: "Pedir um orçamento",
      workEyebrow: "TRABALHOS SELECIONADOS", workTitle: "CORTES QUE EU EDITEI",
      whyTitle: "POR QUE ME ESCOLHER", whySub: "FEITO PARA IMPACTO VISUAL", featured: "DESTAQUE",
      creatorsEyebrow: "CASES", creatorsTitle: "QUEM JÁ CONFIOU NO MEU TRABALHO", followers: "seguidores", watch: "Ver vídeo",
      ctaTitle: "PRONTO PARA ELEVAR SUA MARCA?", ctaText: "Vamos criar um motion que faz as pessoas pararem de rolar.", ctaBtn: "COMEÇAR UM PROJETO",
      contactEyebrow: "CONTATO", contactA: "Vamos", contactB: "Conversar", contactText: "Tem um projeto em mente? Me chama.",
    },
    en: {
      studio: "YOUR STUDIO",
      menuWork: "Work", menuWhy: "Why me", menuCreators: "Cases", menuContact: "Contact",
      heroTag: "MOTION & VFX STUDIO", heroTitle: "MOTION DESIGN",
      heroText: "Custom animation for brands and creators who want to be remembered. Intros, idents and transitions crafted frame by frame.",
      heroCta: "SEE MY WORK ↓", heroCta2: "Request a quote",
      workEyebrow: "SELECTED WORKS", workTitle: "CLIPS I EDITED",
      whyTitle: "WHY CHOOSE ME", whySub: "BUILT FOR VISUAL IMPACT", featured: "FEATURED",
      creatorsEyebrow: "CASES", creatorsTitle: "WHO HAS TRUSTED MY WORK", followers: "followers", watch: "Watch video",
      ctaTitle: "READY TO ELEVATE YOUR BRAND?", ctaText: "Let's create motion that makes people stop scrolling.", ctaBtn: "START A PROJECT",
      contactEyebrow: "CONTACT", contactA: "Let's", contactB: "Talk", contactText: "Got a project in mind? Reach out.",
    },
  },
};
