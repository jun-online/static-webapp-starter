import { useWelcome } from './data/hooks/useWelcome'
import './App.css'

const loginUrl = '/.auth/login/aad?post_login_redirect_uri=/'
const logoutUrl = '/.auth/logout?post_logout_redirect_uri=/'

const App = () => {
  const { data, error, isLoading, isError } = useWelcome()

  const isUnauthorized = isError && error instanceof Error && error.message === 'UNAUTHORIZED'

  if (isLoading) {
    return (
      <div className="app-container">
        <p>Lädt...</p>
      </div>
    )
  }

  if (isUnauthorized) {
    return (
      <div className="app-container">
        <h1>Anmeldung erforderlich</h1>
        <p>Bitte melden Sie sich an, um fortzufahren.</p>
        <button 
          onClick={() => window.location.assign(loginUrl)}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#0078d4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Mit Microsoft anmelden
        </button>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="app-container">
        <h1>Fehler</h1>
        <p>Fehler beim Laden der Willkommensnachricht</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      <h1>{data?.message}</h1>
      <button 
        onClick={() => window.location.assign(logoutUrl)}
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          fontSize: '0.9rem',
          backgroundColor: '#d13438',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Abmelden
      </button>
    </div>
  )
}

export default App
