import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [nameSearch, setNameSearch] = useState(() => localStorage.getItem('nameSearch') || '');
  const [speciesSearch, setSpeciesSearch] = useState(() => localStorage.getItem('speciesSearch') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://api.sampleapis.com/futurama/characters');

        if (!response.ok) {
          throw new Error('Error al obtener los personajes');
        }

        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const results = characters.filter(character => {
      const fullName = `${character.name.first} ${character.name.last}`.toLowerCase();
      const species = character.species ? character.species.toLowerCase() : '';
      return (
        fullName.includes(nameSearch.toLowerCase()) &&
        species.includes(speciesSearch.toLowerCase())
      );
    });
    setFilteredCharacters(results);
  }, [nameSearch, speciesSearch, characters]);

  // Modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
    window.location.reload();
  };

  if (loading) {
    return <div className={`loading ${darkMode ? 'dark-mode' : ''}`}>Cargando personajes...</div>;
  }

  if (error) {
    return <div className={`error ${darkMode ? 'dark-mode' : ''}`}>Error: {error}</div>;
  }

  return (
    <div className={`character-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <h1>Personajes de Futurama</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
          {/* Nombre de usuario con menú */}
          {localStorage.getItem('username') && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#3563E9'
                }}
              >
                ¡Welcome! {localStorage.getItem('username').charAt(0).toUpperCase() + localStorage.getItem('username').slice(1)}
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  backgroundColor: darkMode ? '#333' : '#fff',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  zIndex: 1000
                }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: darkMode ? '#444' : '#f8f8f8',
                      border: '1px solid #ff5555',
                      borderRadius: '6px',
                      color: '#ff5555',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff5555';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = darkMode ? '#444' : '#f8f8f8';
                      e.currentTarget.style.color = '#ff5555';
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Barra de búsqueda mejorada */}
      <div className="search-container">
        <div className="search-row">
          <div className="search-field">
            <label htmlFor="nameSearch">Nombre:</label>
            <input
              id="nameSearch"
              type="text"
              placeholder="Buscar por nombre"
              value={nameSearch}
              onChange={(e) => {
                setNameSearch(e.target.value);
                localStorage.setItem('nameSearch', e.target.value);
              }}
              className={`search-input ${darkMode ? 'dark-mode' : ''}`}
            />
          </div>

          <div className="search-field">
            <label htmlFor="speciesSearch">Especie:</label>
            <input
              id="speciesSearch"
              type="text"
              placeholder="Buscar por especie"
              value={speciesSearch}
              onChange={(e) => {
                setSpeciesSearch(e.target.value);
                localStorage.setItem('speciesSearch', e.target.value);
              }}
              className={`search-input ${darkMode ? 'dark-mode' : ''}`}
            />
          </div>
        </div>

        <div className="button-container">
          <button
            onClick={() => {
              setNameSearch('');
              setSpeciesSearch('');
              localStorage.removeItem('nameSearch');
              localStorage.removeItem('speciesSearch');
            }}
            className="clear-button"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Grid de personajes */}
      <div className="character-grid">
        {filteredCharacters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            darkMode={darkMode}
            onHover={setHoveredCharacter}
          />
        ))}
      </div>

      {/* Hover de personaje */}
      {hoveredCharacter && (
        <div
          className={`hover-info ${darkMode ? 'dark-mode' : ''}`}
          style={{
            position: 'fixed',
            top: '80px',
            right: '30px',
            backgroundColor: darkMode ? '#333' : 'white',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 2000,
            color: darkMode ? '#f0f0f0' : '333'
          }}
        >
          <h3 style={{ color: darkMode ? '#ffffff' : '#333' }}>{hoveredCharacter.name.first} {hoveredCharacter.name.last}</h3>
          <p><strong style={{ color: darkMode ? '#f0f0f0' : '#333' }}>Especie:</strong> <span style={{ color: darkMode ? '#ccc' : '#666' }}>{hoveredCharacter.species}</span></p>
          <p><strong style={{ color: darkMode ? '#f0f0f0' : '#333' }}>Ocupación:</strong> <span style={{ color: darkMode ? '#ccc' : '#666' }}>{hoveredCharacter.occupation}</span></p>
        </div>
      )}

      {/* Si no se encuentran personajes */}
      {filteredCharacters.length === 0 && (
        <div className={`no-results ${darkMode ? 'dark-mode' : ''}`}>
          No se encontraron personajes
        </div>
      )}
    </div>
  );
}

export default CharacterList;