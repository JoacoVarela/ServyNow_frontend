# Estructura de Categorías - ServyNow

## Categorías Jerárquicas

Cada categoría principal tiene una colección de subcategorías para permitir búsqueda granular.

---

## 🏠 Hogar

Servicios de reparación, mantenimiento y mejora del hogar.

### Subcategorías:

- 🚰 **Sanitarios** - Instalación y reparación de plomería (grifos, duchas, inodoros)
- ⚡ **Electricidad** - Instalaciones eléctricas, reparación de circuitos
- 🔧 **Plomería** - Tuberías, drenaje, calentadores de agua
- 🎨 **Pintura** - Pintura interior/exterior, decoración
- 🪵 **Carpintería** - Muebles, puertas, estructuras de madera
- 🧹 **Limpieza** - Limpieza profunda, mantenimiento del hogar

---

## 🎉 Eventos

Servicios para celebraciones, bodas, cumpleaños y eventos empresariales.

### Subcategorías:

- ✨ **Decoración** - Arreglos florales, globos, ambientación
- 🍽️ **Catering** - Alimentos, bebidas, servicio de mesa
- 📷 **Fotografía** - Fotos de eventos, videografía
- 🎵 **Música y DJ** - DJ, bandas, sonido
- 📋 **Coordinación** - Planificación y coordinación de eventos

---

## 📚 Educación

Servicios de enseñanza y formación.

### Subcategorías:

- 👨‍🏫 **Tutoría** - Clases particulares, refuerzo académico
- 🌐 **Idiomas** - Clases de idiomas extranjeros
- 🎸 **Música** - Lecciones de instrumentos y canto
- ⚽ **Deporte** - Entrenamiento físico, deportes específicos
- 🖼️ **Arte** - Pintura, escultura, diseño, artesanía

---

## 💅 Belleza

Servicios de cuidado personal y estética.

### Subcategorías:

- 💇 **Peluquería** - Cortes, peinados, coloración
- 💅 **Manicura** - Uñas, esmaltes, diseños
- 🧖 **Masajes** - Relajación, terapéutico, deportivo
- ✨ **Estética** - Faciales, tratamientos de piel, depilación

---

## 🧘 Bienestar

Servicios de salud, fitness y bienestar mental.

### Subcategorías:

- 🧘 **Yoga** - Clases de yoga, meditación
- 💪 **Fitness** - Entrenamiento personal, gym
- 🥗 **Nutrición** - Asesoría dietética, planes de comida
- 🧠 **Salud Mental** - Psicología, coaching, terapia

---

## 💻 Tecnología

Servicios técnicos e informáticos.

### Subcategorías:

- 🔧 **Reparación** - Reparación de celulares, laptops, computadoras
- 👨‍💼 **Asesoría IT** - Consultoría técnica, soporte IT
- 💻 **Desarrollo Web** - Diseño web, apps, e-commerce
- 🔒 **Ciberseguridad** - Seguridad digital, antivirus

---

## Datos de Referencia

**Total de categorías:** 6  
**Total de subcategorías:** 28

**Uso en Frontend:**

- Selector de categoría → Selector de subcategoría
- Filtro de búsqueda en 2 niveles

**Uso en Backend:**

```sql
categories (id, name, slug, icon)
├── 1: Hogar
├── 2: Eventos
├── 3: Educación
├── 4: Belleza
├── 5: Bienestar
└── 6: Tecnología

subcategories (id, category_id, name, slug, icon)
├── 1-1: Sanitarios
├── 1-2: Electricidad
├── ... (etc)
```

---

## Cómo Agregar Nuevas Categorías

1. Editar `src/mocks/data.ts`
2. Agregar objeto a array `categories`:

```typescript
{
  id: '7',
  name: 'Nueva Categoría',
  icon: '🎯',
  subcategories: [
    { id: '7-1', name: 'Sub 1', icon: '📌' },
    { id: '7-2', name: 'Sub 2', icon: '📌' },
  ],
}
```

3. Actualizar este documento

---

## Icono Emoji Guide

| Categoría  | Ícono | Subcategoría   | Ícono |
| ---------- | ----- | -------------- | ----- |
| Hogar      | 🏠    | Sanitarios     | 🚰    |
|            |       | Electricidad   | ⚡    |
|            |       | Plomería       | 🔧    |
|            |       | Pintura        | 🎨    |
|            |       | Carpintería    | 🪵    |
|            |       | Limpieza       | 🧹    |
| Eventos    | 🎉    | Decoración     | ✨    |
|            |       | Catering       | 🍽️    |
|            |       | Fotografía     | 📷    |
|            |       | Música y DJ    | 🎵    |
|            |       | Coordinación   | 📋    |
| Educación  | 📚    | Tutoría        | 👨‍🏫    |
|            |       | Idiomas        | 🌐    |
|            |       | Música         | 🎸    |
|            |       | Deporte        | ⚽    |
|            |       | Arte           | 🖼️    |
| Belleza    | 💅    | Peluquería     | 💇    |
|            |       | Manicura       | 💅    |
|            |       | Masajes        | 🧖    |
|            |       | Estética       | ✨    |
| Bienestar  | 🧘    | Yoga           | 🧘    |
|            |       | Fitness        | 💪    |
|            |       | Nutrición      | 🥗    |
|            |       | Salud Mental   | 🧠    |
| Tecnología | 💻    | Reparación     | 🔧    |
|            |       | Asesoría IT    | 👨‍💼    |
|            |       | Desarrollo Web | 💻    |
|            |       | Ciberseguridad | 🔒    |

---
