// ============================================================
//  EDITE AQUI O CONTEÚDO DO SEU PORTFÓLIO
//  Troque textos, links e imagens sem mexer no resto do código.
// ============================================================

const CONTENT = {
  // Projetos: "media" pode ser uma imagem (.jpg/.png/.webp) ou vídeo (.mp4).
  // Deixe vazio ("") para mostrar um bloco colorido de exemplo.
  projects: [
    { title: "Lançamento de produto", tag: "3D / Motion", media: "", size: "wide", color: "#1fb6ff" },
    { title: "Intro para canal",      tag: "Branding",    media: "", size: "",     color: "#e5322d" },
    { title: "Documentário",          tag: "Edição",      media: "", size: "",     color: "#c9822b" },
    { title: "Vinheta animada",       tag: "2D",          media: "", size: "tall", color: "#14a3a3" },
    { title: "Infográfico",           tag: "Data motion", media: "", size: "",     color: "#f5a524" },
    { title: "Short form",            tag: "Reels",       media: "", size: "wide", color: "#6c5ce7" },
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

  // Clientes / criadores. "avatar" = caminho de uma imagem (opcional).
  creators: [
    { name: "Cliente Um",    followers: "120K", avatar: "", color: "#1fb6ff" },
    { name: "Cliente Dois",  followers: "540K", avatar: "", color: "#22c55e" },
    { name: "Marca Três",    followers: "88K",  avatar: "", color: "#e5322d" },
    { name: "Criador Quatro",followers: "1.2M", avatar: "", color: "#f5a524" },
    { name: "Studio Cinco",  followers: "32K",  avatar: "", color: "#6c5ce7" },
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
      menuWork: "Trabalhos", menuWhy: "Diferenciais", menuCreators: "Clientes", menuContact: "Fale Comigo",
      heroTag: "MOTION & VFX STUDIO", heroTitle: "MOTION DESIGN",
      heroText: "Animações sob medida para marcas e criadores que querem ser lembrados. Intros, vinhetas e transições pensadas quadro a quadro.",
      heroCta: "VER MEU TRABALHO ↓", heroCta2: "Pedir um orçamento",
      workEyebrow: "TRABALHOS SELECIONADOS", workTitle: "PROJETOS DE MOTION",
      whyTitle: "POR QUE ME ESCOLHER", whySub: "FEITO PARA IMPACTO VISUAL", featured: "DESTAQUE",
      creatorsEyebrow: "CRIADORES QUE CONFIARAM", followers: "seguidores",
      ctaTitle: "PRONTO PARA ELEVAR SUA MARCA?", ctaText: "Vamos criar um motion que faz as pessoas pararem de rolar.", ctaBtn: "COMEÇAR UM PROJETO",
      contactEyebrow: "CONTATO", contactA: "Vamos", contactB: "Conversar", contactText: "Tem um projeto em mente? Me chama.",
    },
    en: {
      studio: "YOUR STUDIO",
      menuWork: "Work", menuWhy: "Why me", menuCreators: "Clients", menuContact: "Contact",
      heroTag: "MOTION & VFX STUDIO", heroTitle: "MOTION DESIGN",
      heroText: "Custom animation for brands and creators who want to be remembered. Intros, idents and transitions crafted frame by frame.",
      heroCta: "SEE MY WORK ↓", heroCta2: "Request a quote",
      workEyebrow: "SELECTED WORKS", workTitle: "MOTION PROJECTS",
      whyTitle: "WHY CHOOSE ME", whySub: "BUILT FOR VISUAL IMPACT", featured: "FEATURED",
      creatorsEyebrow: "CREATORS WHO TRUSTED ME", followers: "followers",
      ctaTitle: "READY TO ELEVATE YOUR BRAND?", ctaText: "Let's create motion that makes people stop scrolling.", ctaBtn: "START A PROJECT",
      contactEyebrow: "CONTACT", contactA: "Let's", contactB: "Talk", contactText: "Got a project in mind? Reach out.",
    },
  },
};
