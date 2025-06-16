
import { useState } from 'react'
import './App.css'

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <img src="/kryptika-logo.png" alt="Kryptika Logo" className="logo-img" />
            <h1>Kryptika S.A.S</h1>
          </div>
          
          {/* Hamburger Button */}
          <button 
            className="hamburger-menu"
            onClick={toggleMobileMenu}
            aria-label="Menú de navegación"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          </button>

          {/* Desktop Navigation */}
          <ul className="nav-links desktop-nav">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#proceso">Proceso</a></li>
            <li><a href="#negocios">Hagamos Negocios</a></li>
            <li><a href="#fundadores">Fundadores</a></li>
            <li><a href="#testimonios">Testimonios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>

          {/* Mobile Navigation */}
          <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="mobile-nav-links">
              <li><a href="#inicio" onClick={closeMobileMenu}>Inicio</a></li>
              <li><a href="#servicios" onClick={closeMobileMenu}>Servicios</a></li>
              <li><a href="#proceso" onClick={closeMobileMenu}>Proceso</a></li>
              <li><a href="#negocios" onClick={closeMobileMenu}>Hagamos Negocios</a></li>
              <li><a href="#fundadores" onClick={closeMobileMenu}>Fundadores</a></li>
              <li><a href="#testimonios" onClick={closeMobileMenu}>Testimonios</a></li>
              <li><a href="#contacto" onClick={closeMobileMenu}>Contacto</a></li>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        )}
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
          <div className="hero-buttons">
            <button className="cta-button primary">Conoce nuestros servicios</button>
            <button className="cta-button secondary" onClick={() => document.getElementById('negocios').scrollIntoView()}>
              Reservar Proyecto
            </button>
          </div>
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
              <p>Especializados en software hermético y local, primando la seguridad de los sistemas y manteniendo nuestros productos altamente optimizados.</p>
              <ul className="service-features">
                <li>Software Hermético y Seguro</li>
                <li>Aplicaciones Locales Optimizadas</li>
                <li>Sistemas de Alta Seguridad</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>UX/UI Design</h3>
              <p>Interfaces intuitivas que conectan la tecnología con las necesidades humanas.</p>
              <ul className="service-features">
                <li>Diseño de Experiencia de Usuario</li>
                <li>Prototipado Interactivo</li>
                <li>Sistema de Diseño</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">⚙️</div>
              <h3>Consultoría Tecnológica</h3>
              <p>Asesoramiento para implementar soluciones tecnológicas centradas en el usuario.</p>
              <ul className="service-features">
                <li>Auditoría de Sistemas</li>
                <li>Arquitectura de Software</li>
                <li>Estrategia Digital</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Transformación Digital</h3>
              <p>Modernización de procesos con tecnología que potencia el talento humano.</p>
              <ul className="service-features">
                <li>Automatización de Procesos</li>
                <li>Migración a la Nube</li>
                <li>Integración de Sistemas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="process">
        <div className="container">
          <h2>Nuestro Proceso de Trabajo</h2>
          <p className="process-intro">
            Seguimos una metodología ágil y centrada en el usuario para garantizar resultados excepcionales
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Descubrimiento</h3>
              <p>Entendemos tu negocio, objetivos y necesidades específicas a través de sesiones de trabajo colaborativo.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Planificación</h3>
              <p>Diseñamos la arquitectura de la solución y definimos el roadmap del proyecto con hitos claros.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Desarrollo</h3>
              <p>Implementamos la solución usando metodologías ágiles con entregas incrementales y feedback continuo.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Pruebas</h3>
              <p>Realizamos testing exhaustivo incluyendo pruebas de usabilidad con usuarios reales.</p>
            </div>
            <div className="process-step">
              <div className="step-number">05</div>
              <h3>Lanzamiento</h3>
              <p>Desplegamos la solución y proporcionamos soporte completo para una transición exitosa.</p>
            </div>
            <div className="process-step">
              <div className="step-number">06</div>
              <h3>Soporte</h3>
              <p>Ofrecemos mantenimiento continuo y evolución de la solución según las necesidades del negocio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="negocios" className="business">
        <div className="container">
          <div className="business-header">
            <h2>Hagamos Negocios</h2>
            <p>¿Tienes una idea? Nosotros la hacemos realidad</p>
          </div>
          
          <div className="business-content">
            <div className="business-info">
              <h3>¿Cómo trabajamos contigo?</h3>
              <div className="business-options">
                <div className="business-option">
                  <div className="option-icon">🎯</div>
                  <h4>Proyecto Completo</h4>
                  <p>Desde la idea hasta el lanzamiento, nos encargamos de todo el ciclo de desarrollo.</p>
                  <ul>
                    <li>Consultoría inicial gratuita</li>
                    <li>Desarrollo end-to-end</li>
                    <li>Soporte post-lanzamiento</li>
                  </ul>
                </div>
                
                <div className="business-option">
                  <div className="option-icon">⚡</div>
                  <h4>MVP Personalizado</h4>
                  <p>Desarrollamos tu producto mínimo viable adaptándonos al tamaño y complejidad específica de tu proyecto.</p>
                  <ul>
                    <li>Tiempo variable según complejidad</li>
                    <li>Funcionalidades core optimizadas</li>
                    <li>Escalabilidad garantizada</li>
                  </ul>
                </div>
                
                <div className="business-option">
                  <div className="option-icon">🔧</div>
                  <h4>Consultoría Técnica</h4>
                  <p>Asesoramiento especializado para optimizar tus sistemas existentes.</p>
                  <ul>
                    <li>Auditoría de código</li>
                    <li>Mejoras de rendimiento</li>
                    <li>Migración de tecnologías</li>
                  </ul>
                </div>
              </div>
              
              <div className="pricing-info">
                <h3>Modelos de Trabajo</h3>
                <div className="pricing-models">
                  <div className="pricing-model">
                    <h4>💰 Proyecto Fijo</h4>
                    <p>Presupuesto cerrado y alcance definido. Ideal para proyectos con requisitos claros.</p>
                  </div>
                  <div className="pricing-model">
                    <h4>⏰ Time & Materials</h4>
                    <p>Facturación por horas trabajadas. Perfecto para proyectos evolutivos y de largo plazo.</p>
                  </div>
                  <div className="pricing-model">
                    <h4>🤝 Sociedad Tecnológica</h4>
                    <p>Nos convertimos en tu CTO. Ideal para startups que buscan un socio tecnológico.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="project-form">
              <h3>Reserva tu Proyecto</h3>
              <form className="reservation-form">
                <div className="form-row">
                  <input type="text" placeholder="Nombre completo *" required />
                  <input type="email" placeholder="Email corporativo *" required />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="Empresa" />
                  <input type="tel" placeholder="Teléfono" />
                </div>
                <select required>
                  <option value="">Tipo de proyecto *</option>
                  <option value="web">Aplicación Web</option>
                  <option value="mobile">Aplicación Móvil</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="mvp">MVP</option>
                  <option value="consultoria">Consultoría</option>
                  <option value="otro">Otro</option>
                </select>
                <select required>
                  <option value="">Presupuesto estimado *</option>
                  <option value="5-15k">$5,000 - $15,000 USD</option>
                  <option value="15-30k">$15,000 - $30,000 USD</option>
                  <option value="30-50k">$30,000 - $50,000 USD</option>
                  <option value="50k+">$50,000+ USD</option>
                  <option value="consultoria">Solo consultoría</option>
                </select>
                <select>
                  <option value="">Timeline deseado</option>
                  <option value="simple">Proyecto Simple (1-3 meses)</option>
                  <option value="medio">Proyecto Medio (3-6 meses)</option>
                  <option value="complejo">Proyecto Complejo (6-12 meses)</option>
                  <option value="evaluacion">Requiere evaluación detallada</option>
                </select>
                <textarea placeholder="Describe tu proyecto en detalle. ¿Qué problema resuelve? ¿Quién es tu usuario objetivo? *" rows="4" required></textarea>
                <div className="form-check">
                  <input type="checkbox" id="nda" />
                  <label htmlFor="nda">Mi proyecto requiere un acuerdo de confidencialidad (NDA)</label>
                </div>
                <button type="submit" className="submit-btn">
                  Enviar Propuesta de Proyecto
                </button>
                <p className="form-note">
                  📞 Te contactaremos en 24 horas para agendar una consulta gratuita de 30 minutos
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="fundadores" className="founders">
        <div className="container">
          <h2>Nuestros Fundadores</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-avatar">
                <div className="avatar-placeholder">
                  <span>👤</span>
                </div>
              </div>
              <h3>[Nombre del Fundador 1]</h3>
              <p className="founder-title">[CEO & CTO]</p>
              <p className="founder-description">
                [Ingeniero de Software con más de X años de experiencia en desarrollo de productos digitales. 
                Especialista en arquitecturas escalables y metodologías ágiles. Visionario del enfoque humano en tecnología.]
              </p>
              <div className="founder-contact">
                <span>📧 [fundador1@kryptika.com]</span>
                <span>💼 [LinkedIn Profile]</span>
              </div>
            </div>
            
            <div className="founder-card">
              <div className="founder-avatar">
                <div className="avatar-placeholder">
                  <span>👤</span>
                </div>
              </div>
              <h3>[Nombre del Fundador 2]</h3>
              <p className="founder-title">[CPO & UX Director]</p>
              <p className="founder-description">
                [Diseñador UX/UI con enfoque en investigación de usuarios y psicología cognitiva. 
                Experto en crear experiencias digitales que conectan emocionalmente con los usuarios.]
              </p>
              <div className="founder-contact">
                <span>📧 [fundador2@kryptika.com]</span>
                <span>💼 [LinkedIn Profile]</span>
              </div>
            </div>
            
            <div className="founder-card">
              <div className="founder-avatar">
                <div className="avatar-placeholder">
                  <span>👤</span>
                </div>
              </div>
              <h3>[Nombre del Fundador 3]</h3>
              <p className="founder-title">[COO & Business Development]</p>
              <p className="founder-description">
                [Estratega de negocios con experiencia en transformación digital y gestión de proyectos. 
                Especialista en alinear soluciones tecnológicas con objetivos empresariales.]
              </p>
              <div className="founder-contact">
                <span>📧 [fundador3@kryptika.com]</span>
                <span>💼 [LinkedIn Profile]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="testimonials">
        <div className="container">
          <h2>Lo que dicen nuestros clientes</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"Kryptika transformó completamente nuestra visión del software. Su enfoque humano hizo que nuestros usuarios adoptaran la plataforma de forma natural. Increíble trabajo."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">💼</div>
                <div>
                  <h4>[Nombre Cliente]</h4>
                  <span>[CEO, Empresa XYZ]</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"El MVP que desarrollaron nos permitió validar nuestra idea en tiempo récord. Su metodología ágil y comunicación constante fueron clave para el éxito."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">🚀</div>
                <div>
                  <h4>[Nombre Startup]</h4>
                  <span>[Founder, Startup ABC]</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"La consultoría técnica de Kryptika optimizó nuestros sistemas en un 300%. Su expertise y enfoque estratégico superaron nuestras expectativas."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">⚙️</div>
                <div>
                  <h4>[Nombre CTO]</h4>
                  <span>[CTO, TechCorp]</span>
                </div>
              </div>
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
              <div className="about-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Proyectos Completados</p>
                </div>
                <div className="stat">
                  <h3>98%</h3>
                  <p>Satisfacción del Cliente</p>
                </div>
                <div className="stat">
                  <h3>24/7</h3>
                  <p>Soporte Disponible</p>
                </div>
              </div>
            </div>
            <div className="about-values">
              <h3>Nuestros Valores</h3>
              <ul>
                <li>🤝 Enfoque humano en cada proyecto</li>
                <li>💡 Innovación responsable</li>
                <li>🎯 Calidad sin compromisos</li>
                <li>🌱 Crecimiento sostenible</li>
                <li>🔒 Transparencia total</li>
                <li>⚡ Agilidad y adaptabilidad</li>
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
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <span>WhatsApp: +57 300 123 4567</span>
              </div>
              
              <div className="contact-hours">
                <h4>Horarios de Atención</h4>
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p>Sábados: 9:00 AM - 2:00 PM</p>
                <p>Soporte 24/7 para clientes activos</p>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Nombre" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Empresa" />
              <select>
                <option value="">Tipo de consulta</option>
                <option value="proyecto">Nuevo Proyecto</option>
                <option value="consultoria">Consultoría</option>
                <option value="soporte">Soporte</option>
                <option value="otro">Otro</option>
              </select>
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
              <div className="footer-social">
                <span>Síguenos:</span>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">GitHub</a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Servicios</h4>
                <a href="#servicios">Desarrollo Web</a>
                <a href="#servicios">Apps Móviles</a>
                <a href="#servicios">UX/UI Design</a>
                <a href="#servicios">Consultoría</a>
              </div>
              <div className="footer-column">
                <h4>Empresa</h4>
                <a href="#nosotros">Sobre Nosotros</a>
                <a href="#fundadores">Fundadores</a>
                <a href="#proceso">Proceso</a>
                <a href="#testimonios">Testimonios</a>
              </div>
              <div className="footer-column">
                <h4>Contacto</h4>
                <a href="#contacto">Contactanos</a>
                <a href="#negocios">Reservar Proyecto</a>
                <span>📧 contacto@kryptika.com</span>
                <span>📱 +57 (1) 234-5678</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Kryptika S.A.S. Todos los derechos reservados.</p>
            <div className="footer-legal">
              <a href="#">Términos y Condiciones</a>
              <a href="#">Política de Privacidad</a>
              <a href="#">Aviso Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
