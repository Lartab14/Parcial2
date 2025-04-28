import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CharacterDetail.css'; // Asegúrate de crear este archivo

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Detectar si el modo oscuro está activado
    const isDarkMode = document.body.classList.contains('dark-mode');
    setDarkMode(isDarkMode);

    // Añadir un event listener para detectar cambios en el modo oscuro
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(document.body.classList.contains('dark-mode'));
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://api.sampleapis.com/futurama/characters`);
        const data = await response.json();
        const selected = data.find((char) => String(char.id) === id);
        if (!selected) {
          setError('Personaje no encontrado');
        } else {
          setCharacter(selected);
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el personaje');
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <div className={`loading ${darkMode ? 'dark-mode' : ''}`}>Cargando personaje...</div>;
  if (error) return <div className={`error ${darkMode ? 'dark-mode' : ''}`}>{error}</div>;

  return (
    <div className={`character-detail ${darkMode ? 'dark-mode' : ''}`}>
      <h1>{character.name.first} {character.name.last}</h1>
      <div className="character-detail-content">
        <img
          src={character.images.main}
          alt={`${character.name.first} ${character.name.last}`}
          className="character-detail-image"
        />
        <div className="character-detail-info">
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Ocupación:</strong> {character.occupation}</p>
          <p><strong>Género:</strong> {character.gender}</p>
          {character.sayings && character.sayings.length > 0 && (
            <div className="character-sayings">
              <h3>Frases célebres:</h3>
              <p className="quote">"{character.sayings[Math.floor(Math.random() * character.sayings.length)]}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;