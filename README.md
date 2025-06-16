
# Kryptika S.A.S - Website Corporativo

**"Por un software más humano"**

Sitio web corporativo de Kryptika S.A.S, empresa especializada en desarrollo de software hermético y local, priorizando la seguridad de los sistemas y la optimización de productos.

## 🚀 Características

- **Responsive Design**: Completamente adaptable a cualquier dispositivo y navegador
- **Menu Mobile**: Lista desplegable optimizada para teléfonos móviles
- **Secciones Principales**:
  - Hero con presentación de la empresa
  - Servicios especializados
  - Proceso de trabajo
  - Sección de negocios con reserva de proyectos
  - Información de contacto

## 📋 Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)
- Navegador web moderno

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd kryptika-website
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

El servidor de desarrollo se iniciará en:
- **Local**: `http://localhost:5173/`
- **Red**: `http://[IP_DE_TU_MAQUINA]:5173/`

### 4. Construir para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### 5. Vista Previa de Producción

```bash
npm run preview
```

## 🌐 Deployment en Replit

### Importar el Proyecto

1. Ve a [Replit.com](https://replit.com)
2. Haz clic en "Create Repl"
3. Selecciona "Import from GitHub" o "Upload files"
4. Importa este repositorio

### Configuración Automática

Replit detectará automáticamente que es un proyecto React con Vite y:
- Instalará las dependencias automáticamente
- Configurará el entorno de desarrollo
- Expondrá el puerto 5173 en el puerto 80 para acceso público

### Ejecutar el Proyecto

1. Haz clic en el botón **"Run"** 
2. El proyecto se ejecutará automáticamente
3. Se abrirá una vista previa del sitio web

### Publicar (Deploy)

1. Ve a la pestaña "Deployments" en Replit
2. Haz clic en "Deploy"
3. Tu sitio estará disponible públicamente en una URL de Replit

## 📁 Estructura del Proyecto

```
kryptika-website/
├── public/
│   ├── favicon.svg          # Icono del sitio
│   └── kryptika-logo.png    # Logo de la empresa
├── src/
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos principales
│   └── index.jsx            # Punto de entrada
├── index.html               # Plantilla HTML
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── README.md                # Este archivo
```

## 🎨 Personalización

### Colores Corporativos

Los colores principales del sitio están definidos en `src/App.css`:

```css
/* Verde corporativo */
#4a9b9b - Verde principal
#2d5a5a - Verde oscuro

/* Grises */
#f8f9fa - Fondo claro
#666 - Texto secundario
#333 - Texto principal
```

### Modificar Contenido

1. **Logo**: Reemplaza `public/kryptika-logo.png`
2. **Información de contacto**: Edita la sección de contacto en `src/App.jsx`
3. **Servicios**: Modifica la sección de servicios en `src/App.jsx`
4. **Estilos**: Actualiza `src/App.css`

### Agregar Nuevas Secciones

1. Añade el JSX en `src/App.jsx`
2. Agrega los estilos correspondientes en `src/App.css`
3. Actualiza la navegación si es necesario

## 📱 Responsive Design

El sitio está optimizado para:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Características Mobile

- Menu desplegable en dispositivos móviles
- Grid adaptativo que se ajusta automáticamente
- Tipografía escalable con `clamp()`
- Imágenes responsivas

## 🔧 Tecnologías Utilizadas

- **React 18**: Biblioteca de JavaScript para UI
- **Vite**: Build tool y dev server ultrarrápido
- **CSS3**: Grid, Flexbox, Custom Properties
- **JavaScript ES6+**: Sintaxis moderna

## 📞 Soporte y Contacto

Para preguntas sobre el código o implementación:

- **Email**: contacto@kryptika.com
- **Teléfono**: +57 (1) 234-5678
- **WhatsApp**: +57 300 123 4567

## 📄 Licencia

Este proyecto es propiedad de Kryptika S.A.S. Todos los derechos reservados.

---

**Desarrollado con ❤️ por el equipo de Kryptika S.A.S**

*"Por un software más humano"*
