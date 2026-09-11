import { useEffect, useState } from 'react'
import { SOBRE, STACKS, CAPITULOS, DESENVOLVIMENTO, ACADEMICO, RODAPE } from './dados.js'
import Revela from './components/Revela.jsx'
import Projeto from './components/Projeto.jsx'
import Stacks from './components/Stacks.jsx'

export default function App() {
  const [idioma, setIdioma] = useState('pt')
  let contador = 0

  // sem atualizar o lang, o leitor de tela lê o inglês como se fosse português
  useEffect(() => {
    document.documentElement.lang = idioma === 'pt' ? 'pt-BR' : 'en'
  }, [idioma])


  return (
    <>
      <header className="topo">
        <span className="marca">
          Helo<span className="marca-ponto" aria-hidden="true" />Labs
        </span>
        <div className="idioma">
          {['pt', 'en'].map((codigo) => (
            <button
              key={codigo}
              type="button"
              aria-pressed={idioma === codigo}
              onClick={() => setIdioma(codigo)}
            >
              {codigo}
            </button>
          ))}
        </div>
      </header>

      {/* capítulo 00, a abertura. o nome é o gesto principal da página */}
      <section className="abertura" id="sobre">
        <h1 className="nome" aria-label={SOBRE.nome}>
          {SOBRE.nome.split(' ').map((palavra, p) => (
            <span className="nome-palavra" key={palavra}>
              {[...palavra].map((letra, i) => (
                <span
                  className="nome-letra"
                  key={`${palavra}-${i}`}
                  style={{ animationDelay: `${p * 260 + i * 42}ms` }}
                  aria-hidden="true"
                >
                  {letra}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="chamada">
          {SOBRE.chamada[idioma].map((linha, i) => (
            <Revela como="span" className="linha-chamada" key={linha} atraso={700 + i * 110}>
              {linha}
            </Revela>
          ))}
        </p>

        <Revela className="abertura-corpo" atraso={1000}>
          {SOBRE.corpo[idioma].map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
          <p className="abertura-contatos">
            {SOBRE.contatos.map((c, i) => (
              <span key={c.rotulo}>
                {i > 0 ? <i aria-hidden="true"> · </i> : null}
                <a href={c.href} target="_blank" rel="noreferrer">
                  {c.rotulo}
                </a>
              </span>
            ))}
          </p>
        </Revela>
      </section>

      <Stacks stacks={STACKS} idioma={idioma} />

      <main>
        {CAPITULOS.map((capitulo) => (
          <section className="capitulo" id={capitulo.id} key={capitulo.id}>
            <Revela className="capitulo-topo">
              <span className="capitulo-num">{capitulo.numero}</span>
              <h2>{capitulo.titulo[idioma]}</h2>
            </Revela>
            {capitulo.projetos.map((projeto) => {
              contador += 1
              return (
                <Projeto
                  key={projeto.slug}
                  projeto={projeto}
                  idioma={idioma}
                  indice={contador}
                  invertido={contador % 2 === 0}
                />
              )
            })}
          </section>
        ))}

        {/* capítulo 04, o que ainda está de pé */}
        <section className="capitulo" id="desenvolvimento">
          <Revela className="capitulo-topo">
            <span className="capitulo-num">{DESENVOLVIMENTO.numero}</span>
            <h2>{DESENVOLVIMENTO.titulo[idioma]}</h2>
          </Revela>
          <div className="colunas">
            {DESENVOLVIMENTO.itens.map((item, i) => (
              <Revela className="verbete" key={item.nome.pt} atraso={i * 80}>
                <h3>{item.nome[idioma]}</h3>
                <span className="estado">{item.estado[idioma]}</span>
                <p>{item.texto[idioma]}</p>
              </Revela>
            ))}
          </div>
        </section>

        {/* capítulo 05, pesquisa */}
        <section className="capitulo" id="pesquisa">
          <Revela className="capitulo-topo">
            <span className="capitulo-num">{ACADEMICO.numero}</span>
            <h2>{ACADEMICO.titulo[idioma]}</h2>
          </Revela>
          {ACADEMICO.itens.map((item, i) => (
            <Revela className="artigo" key={item.nome.pt} atraso={i * 80}>
              <span className="artigo-tipo">{item.tipo[idioma]}</span>
              <h3>{item.nome[idioma]}</h3>
              <span className="artigo-meta">{item.meta[idioma]}</span>
              <p>{item.texto[idioma]}</p>
            </Revela>
          ))}
        </section>
      </main>

      <footer className="rodape">
        <span>{RODAPE[idioma]}</span>
        <span>
          {SOBRE.contatos.map((c, i) => (
            <span key={c.rotulo}>
              {i > 0 ? ' · ' : ''}
              <a href={c.href} target="_blank" rel="noreferrer">
                {c.rotulo}
              </a>
            </span>
          ))}
        </span>
      </footer>
    </>
  )
}
