
import { useState } from 'react'
import './App.css'

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    telefono: '',
    tipoProyecto: '',
    presupuesto: '',
    timeline: '',
    descripcion: '',
    nda: false
  })
  const [contactFormData, setContactFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    tipoConsulta: '',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleInputChange = (e, formType = 'project') => {
    const { name, value, type, checked } = e.target
    const actualValue = type === 'checkbox' ? checked : value
    
    if (formType === 'project') {
      setFormData(prev => ({
        ...prev,
        [name]: actualValue
      }))
    } else {
      setContactFormData(prev => ({
        ...prev,
        [name]: actualValue
      }))
    }
  }

  const sendEmail = async (data, type) => {
    const subject = type === 'project' 
      ? `Nueva Propuesta de Proyecto - ${data.tipoProyecto || 'No especificado'}`
      : `Consulta General - ${data.tipoConsulta || 'No especificado'}`
    
    const body = type === 'project' 
      ? `NUEVA PROPUESTA DE PROYECTO

👤 INFORMACIÓN DEL CLIENTE:
Nombre: ${data.nombre}
Email: ${data.email}
Empresa: ${data.empresa || 'No especificada'}
Teléfono: ${data.telefono || 'No especificado'}

💼 DETALLES DEL PROYECTO:
Tipo de Proyecto: ${data.tipoProyecto}
Presupuesto Estimado: ${data.presupuesto}
Timeline Deseado: ${data.timeline || 'No especificado'}
Requiere NDA: ${data.nda ? 'Sí' : 'No'}

📝 DESCRIPCIÓN:
${data.descripcion}

---
Enviado desde: Kryptika S.A.S Website
Fecha: ${new Date().toLocaleString('es-CO')}
`
      : `NUEVA CONSULTA GENERAL

👤 INFORMACIÓN DEL CLIENTE:
Nombre: ${data.nombre}
Email: ${data.email}
Empresa: ${data.empresa || 'No especificada'}
Tipo de Consulta: ${data.tipoConsulta}

📝 MENSAJE:
${data.mensaje}

---
Enviado desde: Kryptika S.A.S Website
Fecha: ${new Date().toLocaleString('es-CO')}
`

    const mailtoLink = `mailto:contacto@kryptika.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await sendEmail(formData, 'project')
      setSubmitMessage('✅ Propuesta enviada exitosamente. Te contactaremos en 24 horas.')
      setFormData({
        nombre: '',
        email: '',
        empresa: '',
        telefono: '',
        tipoProyecto: '',
        presupuesto: '',
        timeline: '',
        descripcion: '',
        nda: false
      })
      
      setTimeout(() => setSubmitMessage(''), 5000)
    } catch (error) {
      setSubmitMessage('❌ Error al enviar. Por favor intenta nuevamente.')
      setTimeout(() => setSubmitMessage(''), 5000)
    }
    
    setIsSubmitting(false)
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await sendEmail(contactFormData, 'contact')
      setSubmitMessage('✅ Mensaje enviado exitosamente. Te responderemos pronto.')
      setContactFormData({
        nombre: '',
        email: '',
        empresa: '',
        tipoConsulta: '',
        mensaje: ''
      })
      
      setTimeout(() => setSubmitMessage(''), 5000)
    } catch (error) {
      setSubmitMessage('❌ Error al enviar. Por favor intenta nuevamente.')
      setTimeout(() => setSubmitMessage(''), 5000)
    }
    
    setIsSubmitting(false)
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    closeMobileMenu()
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
            <li><button onClick={() => scrollToSection('inicio')} className="nav-button">Inicio</button></li>
            <li><button onClick={() => scrollToSection('servicios')} className="nav-button">Servicios</button></li>
            <li><button onClick={() => scrollToSection('proceso')} className="nav-button">Proceso</button></li>
            <li><button onClick={() => scrollToSection('negocios')} className="nav-button">Hagamos Negocios</button></li>
            <li><button onClick={() => scrollToSection('fundadores')} className="nav-button">Fundadores</button></li>
            <li><button onClick={() => scrollToSection('testimonios')} className="nav-button">Testimonios</button></li>
            <li><button onClick={() => scrollToSection('contacto')} className="nav-button">Contacto</button></li>
          </ul>

          {/* Mobile Navigation */}
          <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="mobile-nav-links">
              <li><button onClick={() => scrollToSection('inicio')} className="nav-button-mobile">Inicio</button></li>
              <li><button onClick={() => scrollToSection('servicios')} className="nav-button-mobile">Servicios</button></li>
              <li><button onClick={() => scrollToSection('proceso')} className="nav-button-mobile">Proceso</button></li>
              <li><button onClick={() => scrollToSection('negocios')} className="nav-button-mobile">Hagamos Negocios</button></li>
              <li><button onClick={() => scrollToSection('fundadores')} className="nav-button-mobile">Fundadores</button></li>
              <li><button onClick={() => scrollToSection('testimonios')} className="nav-button-mobile">Testimonios</button></li>
              <li><button onClick={() => scrollToSection('contacto')} className="nav-button-mobile">Contacto</button></li>
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
            <button className="cta-button primary" onClick={() => scrollToSection('servicios')}>
              Conoce nuestros servicios
            </button>
            <button className="cta-button secondary" onClick={() => scrollToSection('negocios')}>
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
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('✅') ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}
              <form className="reservation-form" onSubmit={handleProjectSubmit}>
                <div className="form-row">
                  <input 
                    type="text" 
                    name="nombre"
                    placeholder="Nombre completo *" 
                    value={formData.nombre}
                    onChange={(e) => handleInputChange(e, 'project')}
                    required 
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email corporativo *" 
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'project')}
                    required 
                  />
                </div>
                <div className="form-row">
                  <input 
                    type="text" 
                    name="empresa"
                    placeholder="Empresa" 
                    value={formData.empresa}
                    onChange={(e) => handleInputChange(e, 'project')}
                  />
                  <input 
                    type="tel" 
                    name="telefono"
                    placeholder="Teléfono" 
                    value={formData.telefono}
                    onChange={(e) => handleInputChange(e, 'project')}
                  />
                </div>
                <select 
                  name="tipoProyecto"
                  value={formData.tipoProyecto}
                  onChange={(e) => handleInputChange(e, 'project')}
                  required
                >
                  <option value="">Tipo de proyecto *</option>
                  <option value="Aplicación Web">Aplicación Web</option>
                  <option value="Aplicación Móvil">Aplicación Móvil</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="MVP Personalizado">MVP Personalizado</option>
                  <option value="Consultoría Técnica">Consultoría Técnica</option>
                  <option value="Sistema Hermético">Sistema Hermético y Local</option>
                  <option value="Otro">Otro</option>
                </select>
                <select 
                  name="presupuesto"
                  value={formData.presupuesto}
                  onChange={(e) => handleInputChange(e, 'project')}
                  required
                >
                  <option value="">Presupuesto estimado *</option>
                  <option value="$5,000 - $15,000 USD">$5,000 - $15,000 USD</option>
                  <option value="$15,000 - $30,000 USD">$15,000 - $30,000 USD</option>
                  <option value="$30,000 - $50,000 USD">$30,000 - $50,000 USD</option>
                  <option value="$50,000+ USD">$50,000+ USD</option>
                  <option value="Solo consultoría">Solo consultoría</option>
                </select>
                <select 
                  name="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange(e, 'project')}
                >
                  <option value="">Timeline deseado</option>
                  <option value="Proyecto Simple (1-3 meses)">Proyecto Simple (1-3 meses)</option>
                  <option value="Proyecto Medio (3-6 meses)">Proyecto Medio (3-6 meses)</option>
                  <option value="Proyecto Complejo (6-12 meses)">Proyecto Complejo (6-12 meses)</option>
                  <option value="Requiere evaluación detallada">Requiere evaluación detallada</option>
                </select>
                <textarea 
                  name="descripcion"
                  placeholder="Describe tu proyecto en detalle. ¿Qué problema resuelve? ¿Quién es tu usuario objetivo? *" 
                  rows="4" 
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange(e, 'project')}
                  required
                ></textarea>
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    id="nda" 
                    name="nda"
                    checked={formData.nda}
                    onChange={(e) => handleInputChange(e, 'project')}
                  />
                  <label htmlFor="nda">Mi proyecto requiere un acuerdo de confidencialidad (NDA)</label>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Propuesta de Proyecto'}
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
                <a href="mailto:contacto@kryptika.com" className="contact-link">contacto@kryptika.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="tel:+5712345678" className="contact-link">+57 (1) 234-5678</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <a 
                  href="https://maps.google.com/?q=Bogotá,Colombia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  Bogotá, Colombia
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <a 
                  href="https://wa.me/573001234567?text=Hola, estoy interesado en sus servicios de desarrollo de software" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  WhatsApp: +57 300 123 4567
                </a>
              </div>
              
              <div className="contact-hours">
                <h4>Horarios de Atención</h4>
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p>Sábados: 9:00 AM - 2:00 PM</p>
                <p>Soporte 24/7 para clientes activos</p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input 
                type="text" 
                name="nombre"
                placeholder="Nombre" 
                value={contactFormData.nombre}
                onChange={(e) => handleInputChange(e, 'contact')}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={contactFormData.email}
                onChange={(e) => handleInputChange(e, 'contact')}
                required 
              />
              <input 
                type="text" 
                name="empresa"
                placeholder="Empresa" 
                value={contactFormData.empresa}
                onChange={(e) => handleInputChange(e, 'contact')}
              />
              <select 
                name="tipoConsulta"
                value={contactFormData.tipoConsulta}
                onChange={(e) => handleInputChange(e, 'contact')}
              >
                <option value="">Tipo de consulta</option>
                <option value="Nuevo Proyecto">Nuevo Proyecto</option>
                <option value="Consultoría Técnica">Consultoría Técnica</option>
                <option value="Soporte Técnico">Soporte Técnico</option>
                <option value="Alianza Estratégica">Alianza Estratégica</option>
                <option value="Información General">Información General</option>
                <option value="Otro">Otro</option>
              </select>
              <textarea 
                name="mensaje"
                placeholder="Mensaje" 
                rows="5" 
                value={contactFormData.mensaje}
                onChange={(e) => handleInputChange(e, 'contact')}
                required
              ></textarea>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
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
                <a href="https://linkedin.com/company/kryptika-sas" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://twitter.com/kryptika_sas" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://github.com/kryptika-sas" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Servicios</h4>
                <button onClick={() => scrollToSection('servicios')} className="footer-link">Desarrollo Web</button>
                <button onClick={() => scrollToSection('servicios')} className="footer-link">Apps Móviles</button>
                <button onClick={() => scrollToSection('servicios')} className="footer-link">UX/UI Design</button>
                <button onClick={() => scrollToSection('servicios')} className="footer-link">Consultoría</button>
              </div>
              <div className="footer-column">
                <h4>Empresa</h4>
                <button onClick={() => scrollToSection('nosotros')} className="footer-link">Sobre Nosotros</button>
                <button onClick={() => scrollToSection('fundadores')} className="footer-link">Fundadores</button>
                <button onClick={() => scrollToSection('proceso')} className="footer-link">Proceso</button>
                <button onClick={() => scrollToSection('testimonios')} className="footer-link">Testimonios</button>
              </div>
              <div className="footer-column">
                <h4>Contacto</h4>
                <button onClick={() => scrollToSection('contacto')} className="footer-link">Contactanos</button>
                <button onClick={() => scrollToSection('negocios')} className="footer-link">Reservar Proyecto</button>
                <a href="mailto:contacto@kryptika.com" className="footer-contact">📧 contacto@kryptika.com</a>
                <a href="tel:+5712345678" className="footer-contact">📱 +57 (1) 234-5678</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Kryptika S.A.S. Todos los derechos reservados.</p>
            <div className="footer-legal">
              <a href="mailto:legal@kryptika.com?subject=Términos y Condiciones">Términos y Condiciones</a>
              <a href="mailto:legal@kryptika.com?subject=Política de Privacidad">Política de Privacidad</a>
              <a href="mailto:legal@kryptika.com?subject=Aviso Legal">Aviso Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
