# Portfólio — Motion Design

Site de portfólio com tema escuro, animações (GSAP) e versão em português/inglês.

## Como editar
Quase tudo fica em **`content.js`**:
- `projects` — seus trabalhos. Em `media`, coloque o caminho de uma imagem ou vídeo (ex.: `"media/projeto1.mp4"`). `size` pode ser `"wide"` (largo), `"tall"` (alto) ou `""`.
- `features` — os 3 cards de diferenciais (PT e EN).
- `creators` — clientes/criadores que você já atendeu. `avatar` aceita uma imagem.
- `contacts` — e-mail e redes sociais.
- `i18n` — todos os textos da página nos dois idiomas.

Coloque imagens e vídeos numa pasta `media/`. Cores e fontes ficam no topo do `style.css` (`--accent` é o azul).

## Ver no computador
```bash
python3 -m http.server 8000
```
Abra http://localhost:8000

## Publicar (grátis)
1. Entre em https://vercel.com com sua conta do GitHub.
2. **Add New → Project** → escolha este repositório → **Deploy**.
3. O site fica em `seunome.vercel.app`. Cada novo commit atualiza o site.

## Arquivos
- `index.html` — estrutura da página
- `style.css` — visual
- `script.js` — animações, menu e troca de idioma
- `content.js` — seu conteúdo
- `vendor/` — biblioteca GSAP (animações)
