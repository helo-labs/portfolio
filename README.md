# Portfólio

Meu portfólio. Uma página só, em português e inglês, organizada em capítulos:
quem eu sou, com o que eu construo, os projetos por área, o que está em
desenvolvimento e a pesquisa.

**No ar:** [helo-labs.pages.dev](https://helo-labs.pages.dev)

As imagens ficam em preto e branco e ganham cor quando você passa o mouse. Projeto
com mais de um print passeia por eles enquanto o ponteiro está em cima.

## Rodar

```bash
npm install
npm run dev
```

`npm test` roda os testes do módulo de prints, incluindo dois que conferem se todo
print prometido no código existe no disco.

## Mexer

- **Conteúdo** (capítulos, projetos, textos nos dois idiomas): `src/dados.js`
- **Prints**: `public/shots/<slug>.jpg`, e `-2`, `-3` para os seguintes. O número de
  cada projeto é o campo `prints` no `src/dados.js`, e `prints: 0` mostra uma
  moldura escrita "print a caminho"
- **Cores**: os tokens no topo do `src/styles.css`. Cada acento tem uma versão viva
  para display e uma fechada para texto pequeno, todas acima de 4,2:1 de contraste

## Publicar

Cloudflare Pages serve da raiz, GitHub Pages serve de `/portfolio/`. A base entra
por `BASE_PATH` no build, então o mesmo código atende aos dois:

```bash
npm run build                      # raiz, para o Cloudflare
BASE_PATH=/portfolio/ npm run build   # subpasta, para o GitHub Pages
```

O workflow `.github/workflows/pages.yml` faz isso sozinho a cada push na `main`.
