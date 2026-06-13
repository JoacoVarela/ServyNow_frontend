# MVP Visual - ServyNow Frontend

## ✅ Completado

### Paleta de colores profesional (Tema claro y oscuro)

**Ubicación:** `src/constants/theme.ts`

- Primary: Azul profesional (#2563EB light, #3B82F6 dark)
- Secondary: Verde complementario (#10B981 light, #34D399 dark)
- Accent: Naranja suave (#F59E0B light, #FBBF24 dark)
- Colores neutros y de estado (success, error, warning)
- Modo claro y oscuro completamente integrados

### Componentes Base Reutilizables

1. **Button** (`src/components/ui/button.tsx`)
   - Variantes: primary, secondary, outline, ghost
   - Tamaños: sm, md, lg
   - Estados: loading, disabled

2. **Card** (`src/components/ui/card.tsx`)
   - Variantes: default, elevated, outlined
   - Soporte para imagen y contenido
   - Sombras adaptadas al tema

3. **TextInputField** (`src/components/ui/input.tsx`)
   - Validación integrada
   - Iconos izquierda/derecha
   - Manejo de contraseña segura

### Pantallas MVP

1. **AuthScreen** (`src/screens/auth-screen.tsx`)
   - Login / Registro con tabs
   - Selección de rol (Cliente/Proveedor)
   - Validación de formulario
   - Derivación a registro multi-paso para proveedores
   - Diseño profesional con paleta cohesiva

2. **ProviderRegisterMultiStep** (`src/screens/provider-register-multistep.tsx`) ✨ NEW
   - Flujo guiado de 5 pasos
   - Paso 1: Credenciales (email, contraseña)
   - Paso 2: Datos personales (nombre, ciudad, teléfono)
   - Paso 3: Categoría jerárquica (tipo servicio → especialidad)
   - Paso 4: Tipo proveedor (mayorista/minorista) + descripción
   - Paso 5: Revisión final
   - Validación en cada paso
   - Barra de progreso visual

3. **FeedScreen** (`src/screens/feed-screen.tsx`)
   - Cards estilo Tinder con swipe visual
   - Filtro por categorías jerárquicas (nivel 1 y 2)
   - Información del proveedor (rating, reviews)
   - Acciones: Like/Contactar, Saltar
   - Contador de progreso

4. **ServiceDetailScreen** (`src/screens/service-detail-screen.tsx`)
   - Vista completa del servicio
   - Información del proveedor con botón de contacto
   - Características destacadas
   - Reseñas simuladas
   - Botón flotante para contactar

5. **ChatScreen** (`src/screens/chat-screen.tsx`)
   - Chat 1 a 1 con diseño profesional
   - Información del proveedor en header
   - Burbujas de mensaje diferenciadas
   - Input con soporte para attachments
   - Timestamps de mensajes

### Datos Mockup

**Ubicación:** `src/mocks/data.ts`

- 5 servicios de ejemplo con imágenes reales
- Perfil de proveedor simulado
- Conversación de chat completa
- **Categorías jerárquicas** ✨ NEW
  - 6 categorías principales (Hogar, Eventos, Educación, Belleza, Bienestar, Tecnología)
  - Cada categoría tiene 4-5 subcategorías específicas
  - Ej: Hogar → Sanitarios, Electricidad, Plomería, Pintura, Carpintería, Limpieza

### Flujo de la App

**Ubicación:** `src/screens/app-flow.tsx`

- Gestión central del estado de pantallas
- Navegación fluida: Auth → Feed → Detail → Chat
- Props bien tipadas

---

## 🎨 Decisiones de Diseño

### Paleta de Colores

- **Coherencia:** Colores complementarios suaves, no opuestos ni básicos
- **Profesionalismo:** Azul como primario (confianza/negocio)
- **Accesibilidad:** Suficiente contraste en ambos modos
- **Consistencia:** Las mismas variables de color se reutilizan en todos los componentes

### UI/UX

- Botones grandes y accesibles (48px mínimo)
- Espaciado consistente usando constantes `Spacing`
- Bordes suaves (border-radius 8-20px)
- Sombreado sutil en dark mode, más pronunciado en light

### Tipografía

- Fuentes del sistema (iOS: system-ui, Android: normal)
- Pesos claros: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Jerarquía visual clara

---

## 🚀 Próximos Pasos

1. **Integración con Backend**
   - Reemplazar datos mock con API calls reales
   - Configurar autenticación JWT
   - Endpoints a consumir: `/auth/login`, `/services`, `/conversations`, `/messages`

2. **Funcionalidades Adicionales**
   - Carga de imágenes desde galería en chat
   - WebSocket para chat en tiempo real
   - Perfiles de usuario (cliente y proveedor)
   - Notificaciones push

3. **Pantallas Faltantes**
   - Perfil del usuario
   - Mis servicios (para proveedores)
   - Historial de conversaciones
   - Panel de proveedores

4. **Refinamientos**
   - Animaciones de transición entre pantallas
   - Swipe gestures en el feed (Reanimated)
   - Paginación infinita en servicios
   - Filtros avanzados

---

## 📱 Cómo Probar

```bash
# Desde /servynow
npm run start

# Opciones:
# Web: w
# Android: a
# iOS: i
# Expo Go: Scan QR
```

---

## 📚 Estructura de Archivos

```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx        ← Botones reutilizables
│   │   ├── card.tsx          ← Cards reutilizables
│   │   └── input.tsx         ← Inputs reutilizables
│   └── (componentes existentes)
├── screens/
│   ├── auth-screen.tsx       ← Login/Registro
│   ├── feed-screen.tsx       ← Feed principal (Tinder)
│   ├── service-detail-screen.tsx ← Detalle de servicio
│   ├── chat-screen.tsx       ← Chat 1a1
│   └── app-flow.tsx          ← Flujo principal
├── mocks/
│   └── data.ts               ← Datos para desarrollo
├── constants/
│   └── theme.ts              ← Paleta de colores (actualizada)
└── app/
    └── index.tsx             ← Punto de entrada
```

---

## 🎯 Estado del MVP

- ✅ Autenticación visual
- ✅ Feed de servicios tipo Tinder
- ✅ Detalle de servicio
- ✅ Chat 1 a 1
- ✅ Paleta de colores profesional
- ✅ Modo claro y oscuro
- ✅ Componentes reutilizables
- ⏳ Integración con backend (próximo)
- ⏳ WebSocket para chat (próximo)
- ⏳ Autenticación real (próximo)
