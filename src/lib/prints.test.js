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
