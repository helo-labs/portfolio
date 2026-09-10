# Portfólio

Revista em capítulos: sobre, stacks, automação e IA, dados, web, em desenvolvimento
e pesquisa. Interface neutra, cor só nas imagens e só no hover. Português e inglês
no mesmo arquivo, trocando pelo botão do topo.

```bash
npm install
npm run dev
```

## Prints

Vão em `public/shots/`, na proporção dos originais (1854x941).

```
<slug>.jpg      primeiro, é o que fica parado
<slug>-2.jpg    os seguintes entram no passeio do hover
<slug>-3.jpg
```

O número de prints de cada projeto fica em `prints:` no `src/dados.js`. Projeto com
`prints: 0` mostra uma moldura escrita "print a caminho" em vez de imagem quebrada.

Falta o do **meu hacktown**, que é mobile first.

## Conteúdo

Tudo em `src/dados.js`: ordem dos capítulos, projetos, stacks, em desenvolvimento e
pesquisa, nos dois idiomas. Nenhum texto está espalhado pelos componentes.
