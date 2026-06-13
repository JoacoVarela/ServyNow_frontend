# Registro Multi-paso para Proveedores - ServyNow

## Descripción General

El registro de proveedores es un flujo **guiado en 5 pasos** diseñado para recolectar información profesional completa y estructurada. El usuario puede navegar hacia adelante y atrás, con validación en cada paso.

---

## Estructura de 5 Pasos

### Paso 1: Credenciales de Acceso

**Campos:**

- Email (validado con regex)
- Contraseña (mín. 6 caracteres)
- Confirmar contraseña (deben coincidir)

**Funcionalidad:**

- Validación en tiempo real
- Mensajes de error claros
- Barra de progreso visual

---

### Paso 2: Información Personal

**Campos:**

- Nombre completo (para registros legales)
- Nombre del negocio (como se ve el proveedor en la app)
- Ciudad (ubicación principal del servicio)
- Teléfono (para contacto directo)

**Validación:**

- Todos los campos requeridos
- Teléfono con formato flexible

---

### Paso 3: Categoría y Especialidad (IMPORTANTE)

**Estructura Jerárquica:**

#### Nivel 1: Tipo de Servicio (Categoría General)

- 🏠 **Hogar**
- 🎉 **Eventos**
- 📚 **Educación**
- 💅 **Belleza**
- 🧘 **Bienestar**
- 💻 **Tecnología**

#### Nivel 2: Subcategoría (Especialidad Específica)

**Ejemplo: Hogar**

- 🚰 Sanitarios
- ⚡ Electricidad
- 🔧 Plomería
- 🎨 Pintura
- 🪵 Carpintería
- 🧹 Limpieza

**Ejemplo: Eventos**

- ✨ Decoración
- 🍽️ Catering
- 📷 Fotografía
- 🎵 Música y DJ
- 📋 Coordinación

**Ejemplo: Educación**

- 👨‍🏫 Tutoría
- 🌐 Idiomas
- 🎸 Música
- ⚽ Deporte
- 🖼️ Arte

**Ejemplo: Belleza**

- 💇 Peluquería
- 💅 Manicura
- 🧖 Masajes
- ✨ Estética

**Ejemplo: Bienestar**

- 🧘 Yoga
- 💪 Fitness
- 🥗 Nutrición
- 🧠 Salud Mental

**Ejemplo: Tecnología**

- 🔧 Reparación
- 👨‍💼 Asesoría IT
- 💻 Desarrollo Web
- 🔒 Ciberseguridad

**UX del Paso 3:**

1. Usuario selecciona categoría general → Se habilitan subcategorías
2. Subcategorías se muestran en colores secundarios (verde)
3. Al seleccionar subcategoría, se confirma la especialidad
4. Validación: ambos niveles son obligatorios

---

### Paso 4: Tipo de Proveedor y Descripción

**Campos:**

#### Tipo de Proveedor (Multi-selección)

- ☑️ Mayorista (venta a grandes volúmenes)
- ☑️ Minorista (venta al público)
- Ambos pueden estar seleccionados (ej: electricista que atiende casa y proyectos)

**Validación:**

- Al menos uno debe estar seleccionado

#### Descripción del Servicio

- Campo de texto libre (textarea simulada)
- Placeholder: "¿Qué ofreces? ¿Cuál es tu experiencia? ¿Algo especial?"
- Mínimo: se recomienda escribir
- Máximo: sin límite aparente (pero backend puede limitar a 500 chars)

#### Años de Experiencia (Opcional)

- Input numérico
- Placeholder: "Ej: 5 años"
- Utilizado para ranking futuro

**Propósito:**

- Filtrar por tipo de cliente
- Permitir búsqueda segmentada (clientes buscan "mayorista" para compras al por mayor)
- Texto descriptivo ayuda en búsqueda y confianza

---

### Paso 5: Revisión Final

**Muestra:**

- ✓ Nombre del negocio
- ✓ Especialidad (Categoría → Subcategoría)
- ✓ Ubicación (ciudad)
- ✓ Teléfono
- ✓ Tipo de proveedor (badges: Mayorista, Minorista)

**Acciones:**

- Editar (vuelve atrás)
- Completar registro (envía datos)

**Términos y Condiciones:**

- Mensaje de aceptación de Términos y Política de privacidad

---

## Integración en AuthScreen

```
AuthScreen
├── Tab: "Iniciar sesión"
├── Tab: "Registrarse"
│   ├── Selección de rol: Cliente / Proveedor
│   └── Si selecciona Proveedor:
│       └── Botón "Continuar como proveedor"
│           → ProviderRegisterMultiStep (5 pasos)
```

**Flujo UX:**

1. Usuario toca "Registrarse"
2. Ingresa nombre, email, contraseña
3. Selecciona rol: "Proveedor"
4. Toca botón "Continuar como proveedor"
5. Inicia flujo multi-paso

---

## Datos Almacenados (Backend)

El registro completa estos campos en el modelo `ProviderProfile`:

```
- user_id (FK a users)
- display_name → nombre del negocio
- bio → descripción del servicio
- city → ubicación
- service_type_id → categoría general (ID)
- category_id → subcategoría específica (ID)
- provider_types → array: ["mayorista", "minorista"]
- experience_years → años de experiencia
```

---

## Campos Sugeridos para Futuro

Si quieres expandir el registro después:

- Foto de perfil (con recorte/avatar)
- Horario de atención (inicio/fin)
- Zoom de cobertura (radio de servicio)
- Métodos de pago aceptados
- Certificaciones/Licencias
- Portfolio/Galería de trabajos previos
- Video de presentación (30 seg)

---

## Validaciones de Backend

Cuando el usuario completa los 5 pasos, el backend debe validar:

1. **Email único:** No existe otro proveedor con ese email
2. **Categoría válida:** categoryId existe en tabla categories
3. **Descripción:** No vacía, longitud razonable
4. **Tipo proveedor:** Al menos mayorista O minorista
5. **Teléfono formato:** Validar formato básico

---

## UX Detalles

### Barra de Progreso

- Visual al tope: llena en azul según el paso (1/5 = 20%, 2/5 = 40%, etc.)
- Suave transición de ancho

### Indicador de Paso

- Texto: "Paso X de 5"
- Ubicado bajo la barra, color gris suave

### Botones

- Paso 1-4: "Atrás" (outline) + "Siguiente" (primary)
- Paso 5: "Completar registro" (primary, puede ser loading)

### Teclado

- Al escribir email/contraseña: keyboard tipo email/password
- Al escribir teléfono: numeric keyboard
- Al describir servicio: default keyboard

---

## Código Base

Ubicación: `src/screens/provider-register-multistep.tsx`

Componente props:

```typescript
export interface ProviderRegisterProps {
  onComplete: () => void; // Llamado al terminar registro
  onBack: () => void; // Vuelve a AuthScreen
}
```

Uso:

```tsx
<ProviderRegisterMultiStep onComplete={() => navigateToFeed()} onBack={() => setMode("register")} />
```

---

## Testing Manual

**Flujo rápido:**

1. Registro → Proveedor → "Continuar como proveedor"
2. Ingresa: email@test.com, 123456, 123456
3. Ingresa: "Juan Pérez", "Sanitarios Pro", "CDMX", "+5215551234567"
4. Selecciona: Hogar → Sanitarios
5. Selecciona: Mayorista + Minorista
6. Ingresa descripción: "15 años en el ramo"
7. Confirma en Paso 5

**Errores esperados:**

- Email vacío → "Email es requerido"
- Contraseña < 6 caracteres → "Mínimo 6 caracteres"
- Passwords no coinciden → "Las contraseñas no coinciden"
- Ninguna subcategoría seleccionada → "Selecciona una categoría"
- Sin mayorista/minorista → "Selecciona al menos un tipo de proveedor"

---

## Próximos Pasos

1. **Backend:** Crear endpoint `POST /auth/register` que acepte estructura completa
2. **Autenticación:** Una vez completado, login automático
3. **Foto de perfil:** Agregar pantalla de foto después del Paso 5
4. **Dashboard:** Pantalla inicial post-registro para proveedores
5. **Edición:** Pantalla para editar categoría/descripción después

---
