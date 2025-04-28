import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  let username = localStorage.getItem('username');
  if (username) {
    username = username.charAt(0).toUpperCase() + username.slice(1);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          <Link to="/characters">
            <span className="logo-text">FUTURAMA</span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Links */}
          <div className="navbar-links">
            <Link
              to="/characters"
              className={location.pathname === '/characters' ? 'active' : ''}
            >
              Personajes
            </Link>
            <Link
              to="/form"
              className={location.pathname === '/form' ? 'active' : ''}
            >
              Formulario
            </Link>
            
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              Sobre Nosotros
            </Link>
          </div>

          {/* Botón de modo oscuro */}
          <button
            className="dark-mode-toggle"
            onClick={() => {
              document.body.classList.toggle('dark-mode');
            }}
            style={{ fontSize: '1.5rem', background: 'none', border: '1px solid black', borderRadius: '8px', padding: '0.5rem' }}
          >
            🌙
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;

