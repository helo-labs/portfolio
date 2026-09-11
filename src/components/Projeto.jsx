import { useEffect, useRef, useState } from 'react'
import Revela from './Revela.jsx'
import { SEM_PRINT, CONVITE } from '../dados.js'
import { caminhosDosPrints, esperaDoPrint, numeroDeCapa } from '../lib/prints.js'

// Uma página dupla de revista. O lado da imagem alterna a cada projeto, que é
// o que impede a sequência de virar uma lista.
export default function Projeto({ projeto, idioma, indice, invertido }) {
  const [ativo, setAtivo] = useState(0)
  const [dentro, setDentro] = useState(false)
  // print que existe no dados.js mas não no disco vira imagem quebrada.
  // guardar quais falharam e pular elas mantém o passeio funcionando.
  const [quebrados, setQuebrados] = useState(() => new Set())
  // metade do peso das imagens é de print que só aparece no hover. eles ficam
  // fora do documento até o primeiro hover, e depois disso o navegador cuida
  // do cache. medido: 395 KB de 794 KB poupados em 10/09/2026.
  const [jaPassou, setJaPassou] = useState(false)
  const figura = useRef(null)

  const todos = caminhosDosPrints(projeto.slug, projeto.prints, import.meta.env.BASE_URL)
  const disponiveis = todos.filter((caminho) => !quebrados.has(caminho))
  const prints = jaPassou ? disponiveis : disponiveis.slice(0, 1)

  // com mais de um print, o hover passeia por eles. o intervalo só existe
  // enquanto o ponteiro está em cima, então nada roda sozinho na página.
  useEffect(() => {
    const espera = esperaDoPrint(ativo, disponiveis.length)
    if (!dentro || espera === null) return undefined
    const t = setTimeout(() => setAtivo((n) => (n + 1) % disponiveis.length), espera)
    return () => clearTimeout(t)
  }, [dentro, ativo, disponiveis.length])

  useEffect(() => {
    if (!dentro) setAtivo(0)
  }, [dentro])

  // deslocamento suave conforme entra na tela, o bastante pra dar profundidade
  useEffect(() => {
    const no = figura.current
    if (!no || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let quadro
    const mover = () => {
      const r = no.getBoundingClientRect()
      const meio = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      no.style.setProperty('--desloca', `${(-meio * 26).toFixed(2)}px`)
      quadro = null
    }
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(mover)
    }
    mover()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
      if (quadro) cancelAnimationFrame(quadro)
    }
  }, [])

  return (
    <article className={`projeto ${invertido ? 'invertido' : ''}`}>
      <Revela className="projeto-figura" como="figure">
        <div
          ref={figura}
          className={`quadro ${dentro ? 'aceso' : ''}`}
          onMouseEnter={() => {
            setJaPassou(true)
            setDentro(true)
          }}
          onMouseLeave={() => setDentro(false)}
        >
          {prints.length ? (
            prints.map((caminho, i) => (
              <img
                key={caminho}
                src={caminho}
                alt={i === 0 ? projeto.nome : ''}
                loading="lazy"
                className={i === ativo ? 'visivel' : ''}
                onError={() => {
                  setQuebrados((antes) => new Set(antes).add(caminho))
                  setAtivo(0)
                }}
              />
            ))
          ) : (
            <span className="aguardando">{SEM_PRINT[idioma]}</span>
          )}
          <span className="quadro-num">{numeroDeCapa(indice)}</span>
          {prints.length ? (
            <span className="convite" aria-hidden="true">
              {disponiveis.length > 1
                ? CONVITE.varias[idioma](disponiveis.length)
                : CONVITE.uma[idioma]}
            </span>
          ) : null}
          {disponiveis.length > 1 ? (
            <span className="quadro-pontos" aria-hidden="true">
              {disponiveis.map((c, i) => (
                <i key={c} className={i === ativo ? 'aceso' : ''} />
              ))}
            </span>
          ) : null}
        </div>
      </Revela>

      <Revela className="projeto-texto" atraso={90}>
        <h3>{projeto.nome}</h3>
        <p>{projeto.texto[idioma]}</p>
        <ul className="etiquetas">
          {projeto.etiquetas.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <a href={projeto.link} target="_blank" rel="noreferrer" className="link">
          {projeto.linkRotulo[idioma]}
          <span aria-hidden="true">↗</span>
        </a>
      </Revela>
    </article>
  )
}
