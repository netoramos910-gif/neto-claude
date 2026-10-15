// ============================================================
//  EDITE AQUI O CONTEÚDO DO SEU PORTFÓLIO
//  Troque textos, links e imagens sem mexer no resto do código.
// ============================================================

const CONTENT = {
  // Sua marca no menu, na abertura e no rodapé: o "NR" brilhante (media/nr-mark.png).
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

  // Seus números (contam subindo quando aparecem na tela).
  //  - value: número inteiro; prefix/suffix: texto antes/depois (ex.: "+", "M").
  stats: [
    { value: 100, prefix: "+", suffix: "M", pt: "visualizações", en: "views" },
    { value: 108, prefix: "", suffix: "K", pt: "seguidores", en: "followers" },
  ],
  // Cortes que viralizaram na sua página (views em milhões: 1.2 = 1,2M).
  virals: [
    { src: "media/kingsman/viral-1.mp4", poster: "media/kingsman/viral-1.jpg", views: 1 },
    { src: "media/kingsman/viral-2.mp4", poster: "media/kingsman/viral-2.jpg", views: 1.1 },
    { src: "media/kingsman/viral-3.mp4", poster: "media/kingsman/viral-3.jpg", views: 1.2 },
    { src: "media/kingsman/viral-4.mp4", poster: "media/kingsman/viral-4.jpg", views: 1.1 },
    { src: "media/kingsman/viral-5.mp4", poster: "media/kingsman/viral-5.jpg", views: 1 },
  ],
  // Sua página. Preencha "url" com o link do Instagram dela para aparecer o botão "Ver a página".
  page: { name: "Kingsman Club", url: "", logo: "media/kingsman.jpg" },

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
    { name: "G4 Business",      followers: "3,2M", avatar: "media/cases/g4.jpg",               video: "", color: "#091e33" },
    { name: "Willian Naor",     followers: "53,2K", avatar: "media/cases/william.jpg",          video: "", color: "#1fb6ff", role: "Founder & VP da Loovi" },
    { name: "Alessandro Cunha", followers: "52,7K", avatar: "media/cases/alessandro-cunha.jpg", video: "", color: "#14a3a3", role: "Fundador do Grupo BC Energia" },
  ],

  contacts: [
    { type: "email",     label: "Email",     value: "seuemail@exemplo.com", href: "mailto:seuemail@exemplo.com" },
    { type: "instagram", label: "Instagram", value: "@seuperfil",           href: "https://instagram.com/seuperfil" },
  ],

  // Textos da página em português (pt) e inglês (en).
  i18n: {
    pt: {
      studio: "NETO RAMOS",
      menuWork: "Cortes", menuCreators: "Cases", menuContact: "Contato",
      menuAbout: "Quem sou eu", menuStats: "Minha página",
      aboutEyebrow: "QUEM SOU EU", aboutTitle: "PRAZER, NETO RAMOS.",
      aboutText1: "Sou editor e estrategista de cortes virais. Pego vídeos longos de empresários e políticos e transformo em cortes que prendem a atenção e geram mais alcance.",
      aboutText2: "Na minha própria página, a Kingsman Club, os cortes já passaram de 100 milhões de visualizações.",
      aboutTag1: "Cortes virais", aboutTag2: "Reels, TikTok e Shorts", aboutTag3: "Estratégia de distribuição",
      heroTag: "DISPONÍVEL PARA NOVOS PROJETOS", heroTitle: "CORTES VIRAIS",
      heroText: "Estratégia de distribuição em cortes virais para empresários, políticos e grandes marcas que querem alcançar milhões de pessoas.",
      heroCta: "CONHEÇA MEU TRABALHO ↓",
      partnerTitleA: "Precisa de distribuição?", partnerTitleB: "Conheça a Komp.", partnerText: "Em parceria com a Komp, seus cortes ganham estratégia e distribuição em escala.", partnerBtn: "CONHEÇA A KOMP ↗",
      workEyebrow: "TRABALHOS SELECIONADOS", workTitle: "CORTES FEITOS POR MIM",
      creatorsEyebrow: "CASES", creatorsTitle: "QUEM JÁ CONFIOU NO MEU TRABALHO", followers: "seguidores", watch: "Ver vídeo",
      stepsEyebrow: "COMO FUNCIONA", stepsTitle: "SIMPLES E RÁPIDO",
      steps: [
        ["Envie o material", "Mande o link do podcast, da live ou do vídeo longo."],
        ["Eu encontro os ganchos", "Assisto tudo, escolho os momentos mais fortes e edito com legenda, ritmo e corte seco."],
        ["Você revisa", "Recebe os cortes para aprovar e pede os ajustes que quiser."],
        ["Pronto para viralizar", "Cortes no formato certo para Reels, TikTok e Shorts, com estratégia de postagem."],
      ],
      faqEyebrow: "PERGUNTAS FREQUENTES", faqTitle: "TUDO O QUE VOCÊ PRECISA SABER", faqBtn: "FAZER UMA PERGUNTA",
      faq: [
        ["Que tipo de vídeo vira corte?", "Podcasts, entrevistas, palestras, lives e aulas. Se tem alguém falando algo forte, dá para virar corte."],
        ["Você também cuida da postagem?", "Sim. Além de editar, monto a estratégia de distribuição: formatos, horários e plataformas."],
        ["Posso pedir ajustes?", "Pode. Você revisa cada corte antes de ir ao ar e pede as mudanças que quiser."],
        ["Qual é o prazo de entrega?", "Depende do volume de material. Combinamos o prazo antes de começar."],
        ["Vocês atendem projetos grandes?", "Sim. Para operações maiores, trabalho junto com a Komp, minha empresa parceira."],
      ],
      viralsLabel: "CORTES QUE VIRALIZARAM NA PÁGINA", statsEyebrow: "MINHA PÁGINA · KINGSMAN CLUB", statsTitle: "RESULTADOS QUE GEREI COM A MINHA PÁGINA",
      howEyebrow: "O QUE EU FAÇO", howTitle: "DO CORTE AO VIRAL",
      how1t: "Corte", how1d: "Encontro os momentos mais fortes do seu conteúdo e transformo em cortes que prendem nos primeiros segundos.",
      how2t: "Distribuição", how2d: "Publico na hora certa e nas plataformas certas: Reels, TikTok e Shorts.",
      how3t: "Viraliza", how3views: "views", how3d: "Gancho forte, ritmo e retenção do início ao fim. É assim que um corte sai do seu perfil e chega a milhões de pessoas.",
      contactEyebrow: "FALE COMIGO", contactA: "Trabalhe", contactB: "comigo", contactText: "Tem um projeto em mente? Me chama.",
    },
    en: {
      studio: "NETO RAMOS",
      menuWork: "Clips", menuCreators: "Cases", menuContact: "Contact",
      menuAbout: "About me", menuStats: "My page",
      aboutEyebrow: "ABOUT ME", aboutTitle: "HI, I'M NETO RAMOS.",
      aboutText1: "I edit and plan viral clips. I take long videos from entrepreneurs and politicians and turn them into clips that hook attention and drive more reach.",
      aboutText2: "On my own page, Kingsman Club, the clips have passed 100 million views.",
      aboutTag1: "Viral clips", aboutTag2: "Reels, TikTok and Shorts", aboutTag3: "Distribution strategy",
      heroTag: "AVAILABLE FOR NEW PROJECTS", heroTitle: "VIRAL CLIPS",
      heroText: "A viral clip distribution strategy for entrepreneurs, politicians and major brands that want to reach millions of people.",
      heroCta: "SEE MY WORK ↓",
      partnerTitleA: "Need distribution?", partnerTitleB: "Meet Komp.", partnerText: "In partnership with Komp, your clips get strategy and distribution at scale.", partnerBtn: "MEET KOMP ↗",
      workEyebrow: "SELECTED WORKS", workTitle: "CLIPS MADE BY ME",
      creatorsEyebrow: "CASES", creatorsTitle: "WHO HAS TRUSTED MY WORK", followers: "followers", watch: "Watch video",
      stepsEyebrow: "HOW IT WORKS", stepsTitle: "SIMPLE AND FAST",
      steps: [
        ["Send your material", "Share the link to your podcast, live or long video."],
        ["I find the hooks", "I watch everything, pick the strongest moments and edit with captions, pacing and tight cuts."],
        ["You review", "You get the clips to approve and ask for any changes you want."],
        ["Ready to go viral", "Clips in the right format for Reels, TikTok and Shorts, with a posting strategy."],
      ],
      faqEyebrow: "FAQ", faqTitle: "EVERYTHING YOU NEED TO KNOW", faqBtn: "ASK A QUESTION",
      faq: [
        ["What kind of video can become a clip?", "Podcasts, interviews, talks, lives and classes. If someone is saying something strong, it can become a clip."],
        ["Do you also handle posting?", "Yes. Besides editing, I build the distribution strategy: formats, timing and platforms."],
        ["Can I ask for changes?", "Yes. You review every clip before it goes live and ask for any changes you want."],
        ["What's the turnaround time?", "It depends on the amount of material. We agree on the timeline before starting."],
        ["Do you take on large projects?", "Yes. For bigger operations, I work together with Komp, my partner company."],
      ],
      viralsLabel: "CLIPS THAT WENT VIRAL ON THE PAGE", statsEyebrow: "MY PAGE · KINGSMAN CLUB", statsTitle: "RESULTS I GENERATED WITH MY PAGE",
      howEyebrow: "WHAT I DO", howTitle: "FROM CLIP TO VIRAL",
      how1t: "Cut", how1d: "I find the strongest moments in your content and turn them into clips that hook viewers in the first seconds.",
      how2t: "Distribution", how2d: "Posted at the right time on the right platforms: Reels, TikTok and Shorts.",
      how3t: "Go viral", how3views: "views", how3d: "A strong hook, pacing and retention from start to finish. That is how a clip leaves your profile and reaches millions of people.",
      contactEyebrow: "TALK TO ME", contactA: "Work", contactB: "with me", contactText: "Got a project in mind? Reach out.",
    },
  },
};
