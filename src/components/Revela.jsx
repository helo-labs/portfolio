import { useEffect, useRef, useState } from 'react'

// Entra quando aparece na tela. O prefers-reduced-motion é tratado no CSS.
export default function Revela({ children, className = '', atraso = 0, como = 'div' }) {
  const alvo = useRef(null)
  const [dentro, setDentro] = useState(false)
  const Tag = como

  useEffect(() => {
    const no = alvo.current
    if (!no) return undefined
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setDentro(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(no)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={alvo}
      className={`revela ${dentro ? 'dentro' : ''} ${className}`}
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
