import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { caminhosDosPrints, esperaDoPrint, numeroDeCapa, RITMO } from './prints.js'

test('o primeiro print não leva sufixo, os seguintes levam', () => {
  assert.deepEqual(caminhosDosPrints('alo', 3), [
    '/shots/alo.jpg',
    '/shots/alo-2.jpg',
    '/shots/alo-3.jpg',
  ])
})

test('projeto sem print devolve lista vazia, não um caminho quebrado', () => {
  assert.deepEqual(caminhosDosPrints('meu-hacktown', 0), [])
  assert.deepEqual(caminhosDosPrints('x', -1), [])
})

test('servido de subpasta, todo caminho leva a base junto', () => {
  const caminhos = caminhosDosPrints('hipnos', 2, '/portfolio/')
  assert.ok(caminhos.every((c) => c.startsWith('/portfolio/shots/')))
  assert.equal(caminhos[1], '/portfolio/shots/hipnos-2.jpg')
})

test('base sem barra no fim não gruda o nome do arquivo', () => {
  assert.equal(caminhosDosPrints('alo', 1, '/sub')[0], '/sub/shots/alo.jpg')
})

test('com um print só não existe passeio', () => {
  assert.equal(esperaDoPrint(0, 1), null)
  assert.equal(esperaDoPrint(0, 0), null)
})

test('dois prints esperam mais que quatro, senão viram pisca-pisca', () => {
  assert.ok(esperaDoPrint(1, 2) > esperaDoPrint(1, 4))
})

test('o primeiro print sempre fica mais tempo que os outros', () => {
  for (const quantos of [2, 3, 4]) {
    assert.ok(
      esperaDoPrint(0, quantos) > esperaDoPrint(1, quantos),
      `com ${quantos} prints o primeiro devia durar mais`,
    )
    assert.equal(esperaDoPrint(0, quantos) - esperaDoPrint(1, quantos), RITMO.respiroDoPrimeiro)
  }
})

test('o número de capa tem sempre dois dígitos', () => {
  assert.equal(numeroDeCapa(1), '01')
  assert.equal(numeroDeCapa(10), '10')
})

// Este é o teste que importa de verdade: o dados.js promete um número de prints
// por projeto, e o disco precisa cumprir. Sem ele, um número errado só aparece
// como imagem quebrada no ar.
test('todo print prometido no dados.js existe em public/shots', async () => {
  const { CAPITULOS } = await import('../dados.js')
  const faltando = []
  for (const capitulo of CAPITULOS) {
    for (const projeto of capitulo.projetos) {
      for (const caminho of caminhosDosPrints(projeto.slug, projeto.prints)) {
        const arquivo = new URL(`../../public${caminho}`, import.meta.url)
        if (!existsSync(arquivo)) faltando.push(caminho)
      }
    }
  }
  assert.deepEqual(faltando, [], `prints prometidos e ausentes: ${faltando.join(', ')}`)
})

test('nenhum print sobrando no disco sem estar declarado', async () => {
  const { CAPITULOS } = await import('../dados.js')
  const declarados = new Set(
    CAPITULOS.flatMap((c) => c.projetos).flatMap((p) => caminhosDosPrints(p.slug, p.prints)),
  )
  const pasta = new URL('../../public/shots/', import.meta.url)
  const { readdirSync } = await import('node:fs')
  const orfaos = readdirSync(pasta)
    .filter((n) => n.endsWith('.jpg'))
    .map((n) => `/shots/${n}`)
    .filter((c) => !declarados.has(c))
  assert.deepEqual(orfaos, [], `arquivos sem dono: ${orfaos.join(', ')}`)
})

// Os links são conteúdo, mas errar um deles só aparece quando alguém clica.
test('todo link secundário aponta para um repositório do helo-labs', async () => {
  const { CAPITULOS } = await import('../dados.js')
  const projetos = CAPITULOS.flatMap((c) => c.projetos)
  const torto = projetos
    .filter((p) => p.repo)
    .filter((p) => !p.repo.startsWith('https://github.com/helo-labs/'))
    .map((p) => `${p.slug}: ${p.repo}`)
  assert.deepEqual(torto, [], `repo fora do padrão: ${torto.join(', ')}`)
})

test('nenhum projeto repete o mesmo endereço nos dois links', async () => {
  const { CAPITULOS } = await import('../dados.js')
  const repetidos = CAPITULOS.flatMap((c) => c.projetos)
    .filter((p) => p.repo && p.repo === p.link)
    .map((p) => p.slug)
  assert.deepEqual(repetidos, [], `link principal e repo iguais em: ${repetidos.join(', ')}`)
})

// Etiqueta acrescentada só num idioma passa despercebida até alguém trocar o
// botão. Este teste transforma isso em falha de build.
test('cada projeto tem a mesma quantidade de etiquetas nos dois idiomas', async () => {
  const { CAPITULOS } = await import('../dados.js')
  const desiguais = CAPITULOS.flatMap((c) => c.projetos)
    .filter((p) => p.etiquetas.pt.length !== p.etiquetas.en.length)
    .map((p) => `${p.slug}: ${p.etiquetas.pt.length} pt vs ${p.etiquetas.en.length} en`)
  assert.deepEqual(desiguais, [], desiguais.join(', '))
})

test('nenhum texto visível ficou sem o par em inglês', async () => {
  const dados = await import('../dados.js')
  const temPar = (o) => o && typeof o === 'object' && 'pt' in o && 'en' in o && o.pt && o.en
  const faltando = []
  for (const projeto of dados.CAPITULOS.flatMap((c) => c.projetos)) {
    for (const campo of ['texto', 'linkRotulo', 'etiquetas']) {
      if (!temPar(projeto[campo])) faltando.push(`${projeto.slug}.${campo}`)
    }
  }
  for (const item of dados.DESENVOLVIMENTO.itens) {
    for (const campo of ['estado', 'texto']) {
      if (!temPar(item[campo])) faltando.push(`${item.nome}.${campo}`)
    }
  }
  for (const item of dados.ACADEMICO.itens) {
    for (const campo of ['tipo', 'meta', 'texto', 'nome']) {
      if (!temPar(item[campo])) faltando.push(`pesquisa.${campo}`)
    }
  }
  assert.deepEqual(faltando, [], `sem par pt/en: ${faltando.join(', ')}`)
})

// Um replace descuidado já apagou os nomes de "em desenvolvimento" em produção:
// o campo é texto puro ali e objeto bilíngue na pesquisa, e tratar os dois
// igual devolve undefined em silêncio.
test('os nomes em desenvolvimento são texto puro e não vazio', async () => {
  const { DESENVOLVIMENTO } = await import('../dados.js')
  for (const item of DESENVOLVIMENTO.itens) {
    assert.equal(typeof item.nome, 'string', `${JSON.stringify(item.nome)} devia ser string`)
    assert.ok(item.nome.trim().length > 0, 'nome vazio em desenvolvimento')
  }
})

test('os nomes da pesquisa são bilíngues e não vazios', async () => {
  const { ACADEMICO } = await import('../dados.js')
  for (const item of ACADEMICO.itens) {
    for (const lingua of ['pt', 'en']) {
      assert.equal(typeof item.nome?.[lingua], 'string', `nome.${lingua} devia ser string`)
      assert.ok(item.nome[lingua].trim().length > 0, `nome.${lingua} vazio`)
    }
  }
})
