
import { useState } from 'react'
import './App.css'

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'desarrollo', 'uxui', 'consultoria', 'transformacion'
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

  const navigateToPage = (page) => {
    setCurrentPage(page)
    closeMobileMenu()
    window.scrollTo(0, 0)
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

  // Render individual service pages
  if (currentPage !== 'home') {
    return (
      <div className="app">
        {/* Header for service pages */}
        <header className="header">
          <nav className="nav">
            <div className="logo" onClick={() => navigateToPage('home')} style={{ cursor: 'pointer' }}>
              <img src="/kryptika-logo.png" alt="Kryptika Logo" className="logo-img" />
              <h1>Kryptika S.A.S</h1>
            </div>
            
            <div className="service-nav">
              <button onClick={() => navigateToPage('home')} className="back-home-btn">
                ← Volver al Inicio
              </button>
            </div>
          </nav>
        </header>

        {/* Service Content */}
        {currentPage === 'desarrollo' && <DesarrolloSoftwarePage navigateToPage={navigateToPage} />}
        {currentPage === 'uxui' && <UXUIDesignPage navigateToPage={navigateToPage} />}
        {currentPage === 'consultoria' && <ConsultoriaTecnologicaPage navigateToPage={navigateToPage} />}
        {currentPage === 'transformacion' && <TransformacionDigitalPage navigateToPage={navigateToPage} />}
      </div>
    )
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
            <div className="service-card" onClick={() => navigateToPage('desarrollo')}>
              <div className="service-icon">💻</div>
              <h3>Desarrollo de Software</h3>
              <p>Especializados en software hermético y local, primando la seguridad de los sistemas y manteniendo nuestros productos altamente optimizados.</p>
              <ul className="service-features">
                <li>Software Hermético y Seguro</li>
                <li>Aplicaciones Locales Optimizadas</li>
                <li>Sistemas de Alta Seguridad</li>
              </ul>
              <button className="service-learn-more">Ver más detalles →</button>
            </div>
            <div className="service-card" onClick={() => navigateToPage('uxui')}>
              <div className="service-icon">🎨</div>
              <h3>UX/UI Design</h3>
              <p>Interfaces intuitivas que conectan la tecnología con las necesidades humanas.</p>
              <ul className="service-features">
                <li>Diseño de Experiencia de Usuario</li>
                <li>Prototipado Interactivo</li>
                <li>Sistema de Diseño</li>
              </ul>
              <button className="service-learn-more">Ver más detalles →</button>
            </div>
            <div className="service-card" onClick={() => navigateToPage('consultoria')}>
              <div className="service-icon">⚙️</div>
              <h3>Consultoría Tecnológica</h3>
              <p>Asesoramiento especializado para optimizar tus sistemas existentes.</p>
              <ul className="service-features">
                <li>Auditoría de código</li>
                <li>Mejoras de rendimiento</li>
                <li>Migración de tecnologías</li>
              </ul>
              <button className="service-learn-more">Ver más detalles →</button>
            </div>
            <div className="service-card" onClick={() => navigateToPage('transformacion')}>
              <div className="service-icon">🚀</div>
              <h3>Transformación Digital</h3>
              <p>Modernización de procesos con tecnología que potencia el talento humano.</p>
              <ul className="service-features">
                <li>Automatización de Procesos</li>
                <li>Migración a la Nube</li>
                <li>Integración de Sistemas</li>
              </ul>
              <button className="service-learn-more">Ver más detalles →</button>
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
                <button onClick={() => navigateToPage('desarrollo')} className="footer-link">Desarrollo de Software</button>
                <button onClick={() => navigateToPage('uxui')} className="footer-link">UX/UI Design</button>
                <button onClick={() => navigateToPage('consultoria')} className="footer-link">Consultoría</button>
                <button onClick={() => navigateToPage('transformacion')} className="footer-link">Transformación Digital</button>
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

// Individual Service Page Components

function DesarrolloSoftwarePage({ navigateToPage }) {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <div className="service-icon-large">💻</div>
              <h1>Desarrollo de Software</h1>
              <p className="service-subtitle">Especializados en software hermético y local, primando la seguridad de los sistemas</p>
              <p className="service-description">
                Desarrollamos soluciones tecnológicas robustas y seguras, optimizadas para funcionar de manera local y hermética. 
                Nuestro enfoque prioriza la protección de datos y la autonomía de los sistemas, garantizando que tu información 
                permanezca bajo tu control total.
              </p>
              <div className="service-cta">
                <button onClick={() => navigateToPage('home')} className="cta-button primary">
                  Solicitar Cotización
                </button>
                <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                  Ver Casos de Éxito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-details">
        <div className="container">
          <div className="service-features-grid">
            <div className="feature-detail">
              <div className="feature-icon">🔒</div>
              <h3>Software Hermético y Seguro</h3>
              <p>Desarrollamos aplicaciones que funcionan completamente offline, sin dependencias externas. Tus datos nunca salen de tu infraestructura.</p>
              <ul>
                <li>Arquitectura de cero dependencias externas</li>
                <li>Cifrado de extremo a extremo</li>
                <li>Auditorías de seguridad incluidas</li>
                <li>Cumplimiento con normativas internacionales</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">⚡</div>
              <h3>Aplicaciones Locales Optimizadas</h3>
              <p>Software diseñado para máximo rendimiento en entornos locales, con tiempos de respuesta ultrarrápidos.</p>
              <ul>
                <li>Optimización específica para hardware local</li>
                <li>Gestión eficiente de memoria y recursos</li>
                <li>Interfaces nativas de alto rendimiento</li>
                <li>Compatibilidad multiplataforma</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">🛡️</div>
              <h3>Sistemas de Alta Seguridad</h3>
              <p>Implementamos las mejores prácticas de seguridad para proteger tu información crítica.</p>
              <ul>
                <li>Autenticación multifactor avanzada</li>
                <li>Control de acceso granular</li>
                <li>Logs de auditoría completos</li>
                <li>Backups automáticos cifrados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mvp-section">
        <div className="container">
          <div className="mvp-content">
            <div className="mvp-text">
              <div className="mvp-icon">⚡</div>
              <h2>MVP Personalizado</h2>
              <p>Desarrollamos tu producto mínimo viable adaptándonos al tamaño y complejidad específica de tu proyecto.</p>
              <div className="mvp-features">
                <div className="mvp-feature">
                  <span className="feature-arrow">→</span>
                  <span>Tiempo variable según complejidad</span>
                </div>
                <div className="mvp-feature">
                  <span className="feature-arrow">→</span>
                  <span>Funcionalidades core optimizadas</span>
                </div>
                <div className="mvp-feature">
                  <span className="feature-arrow">→</span>
                  <span>Escalabilidad garantizada</span>
                </div>
              </div>
            </div>
            <div className="mvp-visual">
              <div className="mvp-timeline">
                <h4>Timeline Típico por Complejidad:</h4>
                <div className="timeline-item">
                  <span className="timeline-duration">1-3 meses</span>
                  <span>MVP Simple (funcionalidad básica)</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-duration">3-6 meses</span>
                  <span>MVP Intermedio (múltiples módulos)</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-duration">6-12 meses</span>
                  <span>MVP Complejo (sistema empresarial)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tech-stack">
        <div className="container">
          <h2>Tecnologías que Utilizamos</h2>
          <div className="tech-categories">
            <div className="tech-category">
              <h3>Backend</h3>
              <div className="tech-list">
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Python</span>
                <span className="tech-item">Java</span>
                <span className="tech-item">C#/.NET</span>
                <span className="tech-item">Go</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Frontend</h3>
              <div className="tech-list">
                <span className="tech-item">React</span>
                <span className="tech-item">Vue.js</span>
                <span className="tech-item">Angular</span>
                <span className="tech-item">TypeScript</span>
                <span className="tech-item">Electron</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Bases de Datos</h3>
              <div className="tech-list">
                <span className="tech-item">PostgreSQL</span>
                <span className="tech-item">SQLite</span>
                <span className="tech-item">MongoDB</span>
                <span className="tech-item">Redis</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Seguridad</h3>
              <div className="tech-list">
                <span className="tech-item">OpenSSL</span>
                <span className="tech-item">OAuth 2.0</span>
                <span className="tech-item">JWT</span>
                <span className="tech-item">HashiCorp Vault</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para comenzar tu proyecto?</h2>
            <p>Contáctanos para una consulta gratuita y descubre cómo podemos ayudarte</p>
            <div className="cta-buttons">
              <button onClick={() => navigateToPage('home')} className="cta-button primary">
                Solicitar Consulta Gratuita
              </button>
              <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                Ver Más Servicios
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function UXUIDesignPage({ navigateToPage }) {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <div className="service-icon-large">🎨</div>
              <h1>UX/UI Design</h1>
              <p className="service-subtitle">Interfaces intuitivas que conectan la tecnología con las necesidades humanas</p>
              <p className="service-description">
                Creamos experiencias digitales centradas en el usuario, combinando investigación, psicología cognitiva y diseño 
                estético para desarrollar interfaces que no solo son hermosas, sino profundamente funcionales y accesibles.
              </p>
              <div className="service-cta">
                <button onClick={() => navigateToPage('home')} className="cta-button primary">
                  Solicitar Cotización
                </button>
                <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                  Ver Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-details">
        <div className="container">
          <div className="service-features-grid">
            <div className="feature-detail">
              <div className="feature-icon">🔍</div>
              <h3>Diseño de Experiencia de Usuario</h3>
              <p>Investigamos, analizamos y diseñamos experiencias que resuelven problemas reales de tus usuarios.</p>
              <ul>
                <li>Investigación de usuarios y entrevistas</li>
                <li>Mapas de experiencia del usuario</li>
                <li>Arquitectura de información</li>
                <li>Testing de usabilidad</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">📱</div>
              <h3>Prototipado Interactivo</h3>
              <p>Desarrollamos prototipos de alta fidelidad que permiten validar ideas antes del desarrollo.</p>
              <ul>
                <li>Wireframes y mockups detallados</li>
                <li>Prototipos clickeables</li>
                <li>Animaciones y microinteracciones</li>
                <li>Testing iterativo con usuarios</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">🎯</div>
              <h3>Sistema de Diseño</h3>
              <p>Creamos sistemas escalables que mantienen consistencia en toda tu plataforma digital.</p>
              <ul>
                <li>Guías de estilo completas</li>
                <li>Componentes reutilizables</li>
                <li>Tokens de diseño</li>
                <li>Documentación para desarrolladores</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="design-process">
        <div className="container">
          <h2>Nuestro Proceso de Diseño</h2>
          <div className="process-flow">
            <div className="process-stage">
              <div className="stage-number">01</div>
              <h3>Investigación</h3>
              <p>Entendemos a tus usuarios, sus necesidades y comportamientos a través de entrevistas y análisis.</p>
            </div>
            <div className="process-stage">
              <div className="stage-number">02</div>
              <h3>Ideación</h3>
              <p>Generamos conceptos y soluciones creativas basadas en los insights de la investigación.</p>
            </div>
            <div className="process-stage">
              <div className="stage-number">03</div>
              <h3>Prototipado</h3>
              <p>Creamos prototipos interactivos para validar las ideas con usuarios reales.</p>
            </div>
            <div className="process-stage">
              <div className="stage-number">04</div>
              <h3>Testing</h3>
              <p>Realizamos pruebas de usabilidad para refinar y optimizar la experiencia.</p>
            </div>
            <div className="process-stage">
              <div className="stage-number">05</div>
              <h3>Implementación</h3>
              <p>Trabajamos junto al equipo de desarrollo para asegurar una implementación fiel.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="design-tools">
        <div className="container">
          <h2>Herramientas y Metodologías</h2>
          <div className="tools-grid">
            <div className="tool-category">
              <h3>Diseño Visual</h3>
              <div className="tool-list">
                <span className="tool-item">Figma</span>
                <span className="tool-item">Adobe Creative Suite</span>
                <span className="tool-item">Sketch</span>
                <span className="tool-item">Principle</span>
              </div>
            </div>
            <div className="tool-category">
              <h3>Prototipado</h3>
              <div className="tool-list">
                <span className="tool-item">Figma</span>
                <span className="tool-item">InVision</span>
                <span className="tool-item">Marvel</span>
                <span className="tool-item">Framer</span>
              </div>
            </div>
            <div className="tool-category">
              <h3>Investigación</h3>
              <div className="tool-list">
                <span className="tool-item">Maze</span>
                <span className="tool-item">UserTesting</span>
                <span className="tool-item">Hotjar</span>
                <span className="tool-item">Google Analytics</span>
              </div>
            </div>
            <div className="tool-category">
              <h3>Metodologías</h3>
              <div className="tool-list">
                <span className="tool-item">Design Thinking</span>
                <span className="tool-item">Lean UX</span>
                <span className="tool-item">Atomic Design</span>
                <span className="tool-item">Material Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Mejora la experiencia de tus usuarios</h2>
            <p>Conversemos sobre cómo podemos transformar tu producto digital</p>
            <div className="cta-buttons">
              <button onClick={() => navigateToPage('home')} className="cta-button primary">
                Solicitar Auditoría UX Gratuita
              </button>
              <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                Ver Más Servicios
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ConsultoriaTecnologicaPage({ navigateToPage }) {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <div className="service-icon-large">⚙️</div>
              <h1>Consultoría Tecnológica</h1>
              <p className="service-subtitle">Asesoramiento especializado para optimizar tus sistemas existentes</p>
              <p className="service-description">
                Ofrecemos consultoría técnica especializada para empresas que buscan optimizar sus sistemas, 
                mejorar su arquitectura tecnológica y acelerar su crecimiento. Nuestro enfoque combina experiencia 
                técnica profunda con visión estratégica de negocio.
              </p>
              <div className="service-cta">
                <button onClick={() => navigateToPage('home')} className="cta-button primary">
                  Solicitar Consultoría
                </button>
                <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                  Casos de Éxito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-details">
        <div className="container">
          <div className="service-features-grid">
            <div className="feature-detail">
              <div className="feature-icon">🔍</div>
              <h3>Auditoría de Código</h3>
              <p>Análisis exhaustivo de tu código base para identificar problemas de seguridad, rendimiento y mantenibilidad.</p>
              <ul>
                <li>Revisión de arquitectura de software</li>
                <li>Análisis de vulnerabilidades de seguridad</li>
                <li>Evaluación de calidad del código</li>
                <li>Recomendaciones de refactorización</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">🚀</div>
              <h3>Mejoras de Rendimiento</h3>
              <p>Optimización de sistemas para mejorar velocidad, escalabilidad y eficiencia de recursos.</p>
              <ul>
                <li>Análisis de cuellos de botella</li>
                <li>Optimización de bases de datos</li>
                <li>Mejoras en infraestructura</li>
                <li>Implementación de CDN y caching</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">🔄</div>
              <h3>Migración de Tecnologías</h3>
              <p>Facilitamos la transición hacia tecnologías modernas minimizando riesgos y tiempo de inactividad.</p>
              <ul>
                <li>Evaluación de tecnologías legacy</li>
                <li>Planificación de migración</li>
                <li>Implementación gradual</li>
                <li>Training del equipo técnico</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="consultoria-specialties">
        <div className="container">
          <h2>Áreas de Especialización</h2>
          <div className="specialties-grid">
            <div className="specialty-item">
              <div className="specialty-icon">🏗️</div>
              <h3>Arquitectura de Software</h3>
              <p>Diseño de arquitecturas escalables, mantenibles y seguras para aplicaciones empresariales.</p>
              <ul>
                <li>Microservicios y APIs</li>
                <li>Arquitecturas cloud-native</li>
                <li>Patrones de diseño</li>
                <li>Documentación técnica</li>
              </ul>
            </div>
            <div className="specialty-item">
              <div className="specialty-icon">☁️</div>
              <h3>Cloud & DevOps</h3>
              <p>Modernización de infraestructura y automatización de procesos de desarrollo.</p>
              <ul>
                <li>Migración a la nube</li>
                <li>CI/CD pipelines</li>
                <li>Containerización</li>
                <li>Monitoreo y logging</li>
              </ul>
            </div>
            <div className="specialty-item">
              <div className="specialty-icon">🔐</div>
              <h3>Seguridad Informática</h3>
              <p>Evaluación y mejora de la postura de seguridad de tus sistemas y aplicaciones.</p>
              <ul>
                <li>Auditorías de seguridad</li>
                <li>Pentesting aplicaciones</li>
                <li>Compliance (GDPR, SOC2)</li>
                <li>Training en seguridad</li>
              </ul>
            </div>
            <div className="specialty-item">
              <div className="specialty-icon">📊</div>
              <h3>Data & Analytics</h3>
              <p>Implementación de soluciones de datos para generar insights de negocio.</p>
              <ul>
                <li>Data warehousing</li>
                <li>ETL/ELT pipelines</li>
                <li>Business Intelligence</li>
                <li>Machine Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="consultoria-process">
        <div className="container">
          <h2>Metodología de Consultoría</h2>
          <div className="consultation-steps">
            <div className="consultation-step">
              <div className="step-icon">📋</div>
              <h3>Evaluación Inicial</h3>
              <p>Análisis completo de tu situación actual, objetivos y restricciones.</p>
              <span className="step-duration">1-2 semanas</span>
            </div>
            <div className="consultation-step">
              <div className="step-icon">🎯</div>
              <h3>Diagnóstico Técnico</h3>
              <p>Auditoría profunda de sistemas, código, infraestructura y procesos.</p>
              <span className="step-duration">2-4 semanas</span>
            </div>
            <div className="consultation-step">
              <div className="step-icon">📈</div>
              <h3>Plan Estratégico</h3>
              <p>Desarrollo de roadmap técnico alineado con objetivos de negocio.</p>
              <span className="step-duration">1-2 semanas</span>
            </div>
            <div className="consultation-step">
              <div className="step-icon">🚀</div>
              <h3>Implementación</h3>
              <p>Ejecución del plan con soporte continuo y ajustes según sea necesario.</p>
              <span className="step-duration">Variable</span>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Optimiza tu tecnología hoy mismo</h2>
            <p>Agenda una consulta gratuita para evaluar el potencial de mejora de tus sistemas</p>
            <div className="cta-buttons">
              <button onClick={() => navigateToPage('home')} className="cta-button primary">
                Solicitar Evaluación Gratuita
              </button>
              <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                Ver Más Servicios
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TransformacionDigitalPage({ navigateToPage }) {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <div className="service-icon-large">🚀</div>
              <h1>Transformación Digital</h1>
              <p className="service-subtitle">Modernización de procesos con tecnología que potencia el talento humano</p>
              <p className="service-description">
                Ayudamos a las empresas a evolucionar digitalmente, integrando tecnología de vanguardia que amplifica 
                las capacidades humanas y optimiza procesos. Nuestro enfoque garantiza que la transformación sea 
                sostenible y genere valor real para tu organización.
              </p>
              <div className="service-cta">
                <button onClick={() => navigateToPage('home')} className="cta-button primary">
                  Iniciar Transformación
                </button>
                <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                  Ver Casos de Estudio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-details">
        <div className="container">
          <div className="service-features-grid">
            <div className="feature-detail">
              <div className="feature-icon">🤖</div>
              <h3>Automatización de Procesos</h3>
              <p>Identificamos y automatizamos procesos repetitivos para liberar tiempo valioso de tu equipo.</p>
              <ul>
                <li>Análisis de procesos existentes</li>
                <li>RPA (Robotic Process Automation)</li>
                <li>Workflows inteligentes</li>
                <li>Integración con sistemas legacy</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">☁️</div>
              <h3>Migración a la Nube</h3>
              <p>Transición segura y eficiente hacia infraestructuras cloud modernas y escalables.</p>
              <ul>
                <li>Evaluación de readiness para cloud</li>
                <li>Estrategia de migración gradual</li>
                <li>Optimización de costos</li>
                <li>Capacitación del equipo</li>
              </ul>
            </div>
            
            <div className="feature-detail">
              <div className="feature-icon">🔗</div>
              <h3>Integración de Sistemas</h3>
              <p>Conectamos sistemas dispares para crear un ecosistema tecnológico cohesivo y eficiente.</p>
              <ul>
                <li>APIs y microservicios</li>
                <li>Data synchronization</li>
                <li>Single Sign-On (SSO)</li>
                <li>Dashboards unificados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="transformation-areas">
        <div className="container">
          <h2>Áreas de Transformación</h2>
          <div className="transformation-grid">
            <div className="transformation-area">
              <div className="area-icon">📊</div>
              <h3>Datos y Analytics</h3>
              <p>Convertimos tus datos en insights accionables para la toma de decisiones.</p>
              <div className="area-features">
                <span>Business Intelligence</span>
                <span>Data Lakes</span>
                <span>Machine Learning</span>
                <span>Dashboards en tiempo real</span>
              </div>
            </div>
            <div className="transformation-area">
              <div className="area-icon">💼</div>
              <h3>Procesos de Negocio</h3>
              <p>Optimizamos workflows y eliminamos fricción en operaciones críticas.</p>
              <div className="area-features">
                <span>Process Mining</span>
                <span>BPM Platforms</span>
                <span>Document Management</span>
                <span>Approval Workflows</span>
              </div>
            </div>
            <div className="transformation-area">
              <div className="area-icon">👥</div>
              <h3>Experiencia del Cliente</h3>
              <p>Creamos touchpoints digitales que mejoran la satisfacción del cliente.</p>
              <div className="area-features">
                <span>CRM Integration</span>
                <span>Omnichannel Support</span>
                <span>Chatbots Inteligentes</span>
                <span>Customer Portals</span>
              </div>
            </div>
            <div className="transformation-area">
              <div className="area-icon">🏢</div>
              <h3>Cultura Organizacional</h3>
              <p>Facilitamos la adopción de herramientas digitales en toda la organización.</p>
              <div className="area-features">
                <span>Change Management</span>
                <span>Digital Training</span>
                <span>Collaboration Tools</span>
                <span>Remote Work Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="transformation-roadmap">
        <div className="container">
          <h2>Roadmap de Transformación</h2>
          <div className="roadmap-phases">
            <div className="roadmap-phase">
              <div className="phase-header">
                <div className="phase-number">FASE 1</div>
                <h3>Evaluación y Estrategia</h3>
                <span className="phase-duration">4-6 semanas</span>
              </div>
              <div className="phase-content">
                <p>Análisis completo del estado actual y definición de la visión digital futura.</p>
                <ul>
                  <li>Digital maturity assessment</li>
                  <li>Análisis de gaps tecnológicos</li>
                  <li>Definición de KPIs</li>
                  <li>Roadmap estratégico</li>
                </ul>
              </div>
            </div>
            <div className="roadmap-phase">
              <div className="phase-header">
                <div className="phase-number">FASE 2</div>
                <h3>Piloto y Validación</h3>
                <span className="phase-duration">8-12 semanas</span>
              </div>
              <div className="phase-content">
                <p>Implementación de proyectos piloto para validar el enfoque y generar quick wins.</p>
                <ul>
                  <li>Selección de casos de uso prioritarios</li>
                  <li>Desarrollo de MVPs</li>
                  <li>Testing con usuarios reales</li>
                  <li>Refinamiento de la estrategia</li>
                </ul>
              </div>
            </div>
            <div className="roadmap-phase">
              <div className="phase-header">
                <div className="phase-number">FASE 3</div>
                <h3>Escalamiento</h3>
                <span className="phase-duration">6-18 meses</span>
              </div>
              <div className="phase-content">
                <p>Despliegue gradual de la transformación a toda la organización.</p>
                <ul>
                  <li>Rollout por departamentos</li>
                  <li>Capacitación masiva</li>
                  <li>Integración de sistemas</li>
                  <li>Monitoreo continuo</li>
                </ul>
              </div>
            </div>
            <div className="roadmap-phase">
              <div className="phase-header">
                <div className="phase-number">FASE 4</div>
                <h3>Optimización Continua</h3>
                <span className="phase-duration">Ongoing</span>
              </div>
              <div className="phase-content">
                <p>Mejora continua basada en métricas y feedback de usuarios.</p>
                <ul>
                  <li>Análisis de performance</li>
                  <li>Identificación de mejoras</li>
                  <li>Evolución tecnológica</li>
                  <li>Innovation labs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>El futuro digital de tu empresa empieza hoy</h2>
            <p>Descubre cómo podemos acelerar tu transformación digital</p>
            <div className="cta-buttons">
              <button onClick={() => navigateToPage('home')} className="cta-button primary">
                Solicitar Assessment Digital
              </button>
              <button onClick={() => navigateToPage('home')} className="cta-button secondary">
                Ver Más Servicios
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
