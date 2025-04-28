import './About.css';
// Importamos las imágenes
import lauraImage from '../Img/Leela.png';
import pedroImage from '../Img/Bender.png';

function About() {
  return (
    <div className="about-container">
      <h1>Sobre Nosotros</h1>
      <div className="about-content">
        <div className="student-card">
          <div className="profile-image-container">
            <img 
              src={lauraImage} 
              alt="Laura Rios Tabares" 
              className="profile-image" 
            />
          </div>
          <h2>Laura Rios Tabares (Ing. Multimedia)</h2>
          <p>🟣 Desarrolladora web (frontend y backend).</p>
          <p>🟣 Redactora de contenidos.</p>
          <p>🟣 Contacto: +57 318 596 2458</p>
        </div>
        <div className="student-card">
          <div className="profile-image-container">
            <img 
              src={pedroImage} 
              alt="Pedro Luis Martínez" 
              className="profile-image" 
            />
          </div>
          <h2>Pedro Luis Martínez (Ing.Multimedia)</h2>
          <p>🟣 Desarrollador web (frontend y backend)</p>
          <p>🟣 Diseñador de medios audiovisuales</p>
          <p>🟣 Contacto: +57 315 899 6352</p>
        </div>
      </div>
    </div>
  );
}

export default About;