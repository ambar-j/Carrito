# MYRODIA | AROMAS

Sitio web de comercio electrónico para un emprendimiento escolar dedicado a la venta de jabones y aromatizantes artesanales.

## Descripción

MYRODIA | AROMAS es un proyecto escolar que ofrece productos de aromaterapia y cuidado personal, incluyendo jabones artesanales y aromatizantes de diversos fragancias. El sitio web permite a los usuarios explorar productos, filtrar por categorías y realizar compras a través de un carrito interactivo.

## Características

- **Catálogo de productos** con sistema de filtrado por categorías
- **Carrito de compras** interactivo con gestión de cantidades
- **Diseño responsive** compatible con dispositivos móviles
- **Interfaz moderna** con gradientes y animaciones suaves
- **Navegación intuitiva** con tres secciones principales
- **Sistema de categorías**: Todos, Jabones, Aromatizantes, Kits y Especiales

## Tecnologías Utilizadas

- **HTML5** - Estructura del sitio
- **CSS3** - Estilos y animaciones
- **JavaScript** - Funcionalidad interactiva
- **Bootstrap 5.3.2** - Framework CSS para diseño responsive

## Estructura del Proyecto

```
myrodia-aromas/
│
├── index.html              # Página principal con catálogo
├── sobre-nosotros.html     # Información del emprendimiento
├── contacto.html           # Formulario de contacto
├── styles.css              # Estilos personalizados
└── script.js               # Lógica de la aplicación
```

## Instalación y Uso

1. **Clonar o descargar** el repositorio
2. **Abrir** `index.html` en un navegador web moderno
3. No requiere instalación de dependencias adicionales

## Funcionalidades Principales

### Catálogo de Productos
- Visualización en cuadrícula de todos los productos
- Filtrado por categorías mediante botones interactivos
- Tarjetas con información detallada de cada producto

### Carrito de Compras
- Agregar productos al carrito
- Ajustar cantidades (+/-)
- Visualización del total de compra
- Modal deslizante para revisar el carrito
- Proceso de finalización de compra

### Navegación
- **Inicio**: Catálogo completo de productos
- **Sobre Nosotros**: Información del emprendimiento
- **Contacto**: Formulario para consultas

## Paleta de Colores

El diseño utiliza una paleta de colores suaves y femeninos:
- Rosa claro: `#ffd6e8`, `#ffe4f0`, `#fff0f8`
- Rosa medio: `#ffb3d9`, `#ffc7e5`
- Rosa intenso: `#ff6bb3`, `#ff8dc7`
- Texto: `#6d4c5c`, `#9d7889`

## Responsive Design

El sitio está optimizado para:
- Dispositivos móviles
- Tablets
- Escritorio

## Personalización

### Agregar Nuevos Productos

Editar el array `products` en `script.js`:

```javascript
{
  id: 6,
  name: 'Nombre del Producto',
  price: 2500,
  category: 'jabones', // jabones, aromatizantes, kits, especiales
  icon: '🧼',
  desc: 'Descripción del producto'
}
```

### Modificar Estilos

Los estilos principales se encuentran en `styles.css` y pueden personalizarse modificando:
- Gradientes de color
- Tamaños de fuente
- Efectos de hover
- Animaciones

## Equipo

Proyecto desarrollado por estudiantes como emprendimiento escolar, con el objetivo de ofrecer productos de calidad priorizando el bienestar de los clientes y la accesibilidad.

## Licencia

Este es un proyecto educativo desarrollado con fines académicos.

## Contacto

Para consultas o pedidos, utiliza el formulario de contacto disponible en el sitio web.

---

**MYRODIA | AROMAS** - Transformando espacios con aromas únicos 🌸
