// Regras dos prints, puras e sem React, para poderem ser testadas sem navegador.

// O primeiro print não leva sufixo, os seguintes levam -2, -3 e por aí.
// A base entra por parâmetro porque o site pode ser servido da raiz, no
// Cloudflare, ou de uma subpasta, no GitHub Pages. Caminho absoluto cravado
// com "/" quebra silenciosamente no segundo caso.
export function caminhosDosPrints(slug, quantos, base = '/') {
  const prefixo = base.endsWith('/') ? base : `${base}/`
  return Array.from({ length: Math.max(0, quantos) }, (_, i) =>
    i === 0 ? `${prefixo}shots/${slug}.jpg` : `${prefixo}shots/${slug}-${i + 1}.jpg`,
  )
}

// Quanto tempo cada print fica antes de passar pro próximo, durante o hover.
// Com dois prints a troca precisa ser mais lenta, senão vira pisca-pisca, e o
// primeiro ganha um respiro a mais porque é o que a pessoa está olhando quando
// encosta o mouse.
export const RITMO = {
  parDePrints: 1450,
  muitosPrints: 1050,
  respiroDoPrimeiro: 420,
}

export function esperaDoPrint(indiceAtivo, quantos) {
  if (quantos < 2) return null
  const base = quantos === 2 ? RITMO.parDePrints : RITMO.muitosPrints
  return indiceAtivo === 0 ? base + RITMO.respiroDoPrimeiro : base
}

// Rótulo do contador de capa, sempre com dois dígitos.
export function numeroDeCapa(indice) {
  return String(indice).padStart(2, '0')
}
