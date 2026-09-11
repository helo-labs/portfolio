import { useEffect, useState } from 'react'

// Diz se o aparelho tem ponteiro que passa por cima sem clicar. Serve pra
// decidir entre hover e toque, e reage se a resposta mudar no meio, que é o
// caso de tablet com teclado acoplado e desacoplado.
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
