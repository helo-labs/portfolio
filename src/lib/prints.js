// Puro, sem React, para poder ser testado sem navegador.

// A base entra por parâmetro porque o site é servido da raiz no Cloudflare e
// de uma subpasta no GitHub Pages. Caminho cravado com "/" quebra no segundo,
// e quebra calado.
export function caminhosDosPrints(slug, quantos, base = '/') {
  const prefixo = base.endsWith('/') ? base : `${base}/`
  return Array.from({ length: Math.max(0, quantos) }, (_, i) =>
    i === 0 ? `${prefixo}shots/${slug}.jpg` : `${prefixo}shots/${slug}-${i + 1}.jpg`,
  )
}

// Com dois prints a troca precisa ser mais lenta, senão vira pisca-pisca. O
// primeiro dura mais porque é o que já estava na tela quando o mouse chegou.
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

export function numeroDeCapa(indice) {
  return String(indice).padStart(2, '0')
}
