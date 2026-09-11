import { useEffect, useState } from 'react'

// Capacidade do ponteiro, não largura de tela: tablet com teclado acoplado tem
// hover, notebook com tela sensível ao toque tem mouse. Reage se isso mudar.
const CONSULTA = '(hover: hover) and (pointer: fine)'

export function useTemHover() {
  const [tem, setTem] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(CONSULTA).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(CONSULTA)
    const mudou = (evento) => setTem(evento.matches)
    mq.addEventListener('change', mudou)
    setTem(mq.matches)
    return () => mq.removeEventListener('change', mudou)
  }, [])

  return tem
}
