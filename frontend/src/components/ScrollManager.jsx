import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Rola para o topo ao trocar de página e para a âncora (#como-funciona) quando existir.
export default function ScrollManager() {
  const { pathname, hash, search } = useLocation()
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) { target.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, search])
  return null
}
