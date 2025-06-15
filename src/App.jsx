
import './App.css'

export default function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <h1>Kryptika S.A.S</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Kryptika S.A.S</h1>
          <p className="hero-slogan">Por un software más humano</p>
          <p className="hero-description">
            Desarrollamos soluciones tecnológicas que priorizan la experiencia humana, 
            creando software intuitivo y accesible para todos.
          </p>
          <button className="cta-button">Conoce nuestros servicios</button>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>Desarrollo de Software</h3>
              <p>Aplicaciones web y móviles diseñadas con enfoque en la usabilidad y experiencia del usuario.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>UX/UI Design</h3>
              <p>Interfaces intuitivas que conectan la tecnología con las necesidades humanas.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚙️</div>
              <h3>Consultoría Tecnológica</h3>
              <p>Asesoramiento para implementar soluciones tecnológicas centradas en el usuario.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Transformación Digital</h3>
              <p>Modernización de procesos con tecnología que potencia el talento humano.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Sobre Kryptika</h2>
              <p>
                En Kryptika S.A.S creemos que la tecnología debe servir a las personas, 
                no al revés. Nuestro enfoque humanizado del desarrollo de software nos 
                permite crear soluciones que realmente mejoran la vida de nuestros usuarios.
              </p>
              <p>
                Con años de experiencia en el sector tecnológico, nuestro equipo combina 
                expertise técnico con una profunda comprensión de las necesidades humanas 
                para entregar productos excepcionales.
              </p>
            </div>
            <div className="about-values">
              <h3>Nuestros Valores</h3>
              <ul>
                <li>🤝 Enfoque humano en cada proyecto</li>
                <li>💡 Innovación responsable</li>
                <li>🎯 Calidad sin compromisos</li>
                <li>🌱 Crecimiento sostenible</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="contact">
        <div className="container">
          <h2>Contactanos</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Información de Contacto</h3>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>contacto@kryptika.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span>+57 (1) 234-5678</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Bogotá, Colombia</span>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Nombre" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Empresa" />
              <textarea placeholder="Mensaje" rows="5" required></textarea>
              <button type="submit">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>Kryptika S.A.S</h3>
              <p>Por un software más humano</p>
            </div>
            <div className="footer-links">
              <a href="#inicio">Inicio</a>
              <a href="#servicios">Servicios</a>
              <a href="#nosotros">Nosotros</a>
              <a href="#contacto">Contacto</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Kryptika S.A.S. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
