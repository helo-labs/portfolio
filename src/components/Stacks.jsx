import Revela from './Revela.jsx'

export default function Stacks({ stacks, idioma }) {
  return (
    <section className="capitulo stacks" id="stacks">
      <Revela className="capitulo-topo">
        <span className="capitulo-num">00</span>
        <h2>{stacks.titulo[idioma]}</h2>
      </Revela>

      <Revela className="faixa">
        {stacks.faixa.map((palavra, i) => (
          <span key={palavra}>
            {palavra}
            {i < stacks.faixa.length - 1 ? <i aria-hidden="true">·</i> : null}
          </span>
        ))}
      </Revela>

      <div className="stack-grade">
        {stacks.grupos.map((grupo, i) => (
          <Revela className="stack-grupo" key={grupo.rotulo.pt} atraso={i * 60}>
            <h4>{grupo.rotulo[idioma]}</h4>
            <ul>
              {grupo.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Revela>
        ))}
      </div>
    </section>
  )
}
