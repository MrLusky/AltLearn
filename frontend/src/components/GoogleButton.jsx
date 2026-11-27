import { useEffect, useRef, useState } from 'react'

// "Entrar com Google" (Google Identity Services). Precisa de VITE_GOOGLE_CLIENT_ID (veja docs/GOOGLE_LOGIN.md).
// O Google devolve um token (credential); a API Laravel confere o token e cria/entra na conta.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
let scriptPromise

function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve()
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = resolve
    script.onerror = () => { scriptPromise = undefined; reject(new Error('Não foi possível carregar o Google.')) }
    document.head.appendChild(script)
  })
  return scriptPromise
}

export default function GoogleButton({ onCredential }) {
  const slot = useRef(null)
  const handler = useRef(onCredential)
  const [failed, setFailed] = useState(false)
  useEffect(() => { handler.current = onCredential })

  useEffect(() => {
    if (!CLIENT_ID) return
    let cancelled = false
    loadGoogleScript().then(() => {
      if (cancelled || !slot.current) return
      window.google.accounts.id.initialize({ client_id: CLIENT_ID, callback: (response) => handler.current?.(response.credential) })
      window.google.accounts.id.renderButton(slot.current, { theme: 'outline', size: 'large', shape: 'pill', text: 'continue_with', locale: 'pt-BR', width: 280 })
    }).catch(() => setFailed(true))
    return () => { cancelled = true }
  }, [])

  if (!CLIENT_ID) {
    return <button type="button" className="auth-google" disabled title="Falta configurar VITE_GOOGLE_CLIENT_ID">Continuar com Google (não configurado)</button>
  }
  if (failed) return <p className="auth-or">Não foi possível carregar o login do Google. Verifique a conexão.</p>
  return <div className="google-slot" ref={slot} />
}
