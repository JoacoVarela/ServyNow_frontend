# Guía Backend MVP - ServyNow

## 1) Objetivo del MVP

Construir un backend simple, escalable y seguro para soportar:

- Registro y login por rol (cliente y proveedor).
- Publicación y búsqueda de servicios por categoría.
- Interacción inicial estilo matching (interés/contacto).
- Chat 1 a 1 con texto e imágenes.
- Calificaciones y comentarios post-servicio.
- Ranking con mezcla de calidad y relevancia paga.

El MVP debe priorizar rapidez de salida y métricas de uso sobre complejidad avanzada.

## 2) Stack (según tu setup actual)

Tu arquitectura ya definida:

- API: Node.js + **NestJS** (TypeScript).
- Base de datos: **MySQL**.
- ORM: **Prisma**.
- Auth: JWT + refresh tokens.
- Realtime chat: WebSocket (Socket.IO) o evento publicitario.
- Imágenes: S3 compatible (Cloudflare R2, AWS S3) o local (dev).
- Cola de tareas (opcional en MVP): BullMQ para notificaciones y procesos async.

**Patrón arquitectónico:**

- Controlador → Servicio → Prisma Client.
- Módulos organizados por dominio (auth, users, services, chat, reviews, boosts).

## 3) Roles y permisos

Roles mínimos:

- CLIENT: busca servicios, guarda favoritos, inicia chats, califica.
- PROVIDER: publica servicios, responde chats, recibe calificaciones.
- ADMIN (interno): moderación y soporte.

Reglas base:

- Un usuario puede tener ambos perfiles (cliente/proveedor) en el futuro.
- En MVP puedes comenzar con un rol principal y luego habilitar multirol.

## 4) Modelo de datos inicial (MySQL + Prisma)

Schema.prisma base:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ============= USUARIOS =============
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  passwordHash      String
  role              UserRole @default(CLIENT)
  phone             String?
  isVerified        Boolean  @default(false)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  // Relaciones
  providerProfile   ProviderProfile?
  servicesLiked     ServiceLike[]
  conversationsAsClient   Conversation[] @relation("ClientConversations")
  conversationsAsProvider Conversation[] @relation("ProviderConversations")
  messagesAsWriter  Message[]
  bookingsAsClient  Booking[] @relation("ClientBookings")
  bookingsAsProvider Booking[] @relation("ProviderBookings")
  reviewsWritten    Review[] @relation("ReviewerReviews")
  reviewsReceived   Review[] @relation("ProviderReviews")
  boostsCreated     Boost[]
  reportsCreated    Report[]

  @@map("users")
}

enum UserRole {
  CLIENT
  PROVIDER
  ADMIN
}

// ============= PERFIL PROVEEDOR =============
model ProviderProfile {
  id                    String   @id @default(cuid())
  userId                String   @unique
  displayName           String
  bio                   String?  @db.Text
  city                  String
  avatarUrl             String?
  averageRating         Decimal  @default(0) @db.Decimal(3, 2)
  ratingCount           Int      @default(0)
  responseRate          Decimal  @default(0) @db.Decimal(3, 2)
  responseTimeMinutes   Int?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  // Relaciones
  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  services              Service[]
  boosts                Boost[]

  @@map("provider_profiles")
}

// ============= CATEGORÍAS =============
model Category {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  // Relaciones
  services  Service[]

  @@map("categories")
}

// ============= SERVICIOS =============
model Service {
  id                String   @id @default(cuid())
  providerId        String
  categoryId        String
  title             String
  description       String   @db.Text
  basePriceMin      Decimal? @db.Decimal(10, 2)
  basePriceMax      Decimal? @db.Decimal(10, 2)
  city              String
  status            ServiceStatus @default(ACTIVE)
  scoreManualBoost  Decimal  @default(0) @db.Decimal(5, 2)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  // Relaciones
  provider          ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade)
  category          Category        @relation(fields: [categoryId], references: [id])
  media             ServiceMedia[]
  likes             ServiceLike[]
  conversations     Conversation[]
  reviews           Review[]
  boosts            Boost[]

  @@index([providerId])
  @@index([categoryId])
  @@index([city])
  @@index([status])
  @@map("services")
}

enum ServiceStatus {
  ACTIVE
  PAUSED
  DELETED
}

// ============= MEDIOS DE SERVICIO =============
model ServiceMedia {
  id        String   @id @default(cuid())
  serviceId String
  mediaUrl  String
  mediaType String   @default("IMAGE")
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())

  // Relaciones
  service   Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)

  @@index([serviceId])
  @@map("service_media")
}

// ============= LIKES DE SERVICIOS =============
model ServiceLike {
  id            String   @id @default(cuid())
  serviceId     String
  clientUserId  String
  createdAt     DateTime @default(now())

  // Relaciones
  service       Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  user          User     @relation(fields: [clientUserId], references: [id], onDelete: Cascade)

  @@unique([serviceId, clientUserId])
  @@index([clientUserId])
  @@map("service_likes")
}

// ============= CONVERSACIONES =============
model Conversation {
  id              String   @id @default(cuid())
  serviceId       String
  clientUserId    String
  providerUserId  String
  status          ConversationStatus @default(OPEN)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relaciones
  service         Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  clientUser      User     @relation("ClientConversations", fields: [clientUserId], references: [id], onDelete: Cascade)
  providerUser    User     @relation("ProviderConversations", fields: [providerUserId], references: [id], onDelete: Cascade)
  messages        Message[]
  booking         Booking?

  @@unique([serviceId, clientUserId, providerUserId])
  @@index([clientUserId])
  @@index([providerUserId])
  @@map("conversations")
}

enum ConversationStatus {
  OPEN
  CLOSED
}

// ============= MENSAJES =============
model Message {
  id              String   @id @default(cuid())
  conversationId  String
  senderUserId    String
  contentText     String?  @db.Text
  messageType     MessageType @default(TEXT)
  createdAt       DateTime @default(now())

  // Relaciones
  conversation    Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  sender          User         @relation(fields: [senderUserId], references: [id], onDelete: Cascade)
  media           MessageMedia[]

  @@index([conversationId])
  @@index([senderUserId])
  @@map("messages")
}

enum MessageType {
  TEXT
  IMAGE
}

// ============= MEDIOS DE MENSAJES =============
model MessageMedia {
  id        String   @id @default(cuid())
  messageId String
  mediaUrl  String
  createdAt DateTime @default(now())

  // Relaciones
  message   Message  @relation(fields: [messageId], references: [id], onDelete: Cascade)

  @@index([messageId])
  @@map("message_media")
}

// ============= BOOKINGS =============
model Booking {
  id              String   @id @default(cuid())
  conversationId  String   @unique
  clientUserId    String
  providerUserId  String
  status          BookingStatus @default(REQUESTED)
  completedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relaciones
  conversation    Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  clientUser      User     @relation("ClientBookings", fields: [clientUserId], references: [id], onDelete: Cascade)
  providerUser    User     @relation("ProviderBookings", fields: [providerUserId], references: [id], onDelete: Cascade)
  review          Review?

  @@index([clientUserId])
  @@index([providerUserId])
  @@map("bookings")
}

enum BookingStatus {
  REQUESTED
  CONFIRMED
  COMPLETED
  CANCELED
}

// ============= REVIEWS =============
model Review {
  id              String   @id @default(cuid())
  bookingId       String   @unique
  serviceId       String
  reviewerUserId  String
  providerUserId  String
  rating          Int      // 1-5
  comment         String?  @db.Text
  createdAt       DateTime @default(now())

  // Relaciones
  booking         Booking  @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  service         Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  reviewer        User     @relation("ReviewerReviews", fields: [reviewerUserId], references: [id], onDelete: Cascade)
  provider        User     @relation("ProviderReviews", fields: [providerUserId], references: [id], onDelete: Cascade)

  @@index([serviceId])
  @@index([providerUserId])
  @@map("reviews")
}

// ============= BOOSTS (RELEVANCIA PAGA) =============
model Boost {
  id              String   @id @default(cuid())
  serviceId       String
  providerUserId  String
  amountPaid      Decimal  @db.Decimal(10, 2)
  startsAt        DateTime
  endsAt          DateTime
  weight          Decimal  @default(1.5) @db.Decimal(3, 2)
  status          BoostStatus @default(ACTIVE)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relaciones
  service         Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  provider        ProviderProfile @relation(fields: [providerUserId], references: [id], onDelete: Cascade)

  @@index([serviceId])
  @@index([providerUserId])
  @@index([status])
  @@map("boosts")
}

enum BoostStatus {
  ACTIVE
  EXPIRED
  CANCELED
}

// ============= REPORTS (MODERACIÓN) =============
model Report {
  id              String   @id @default(cuid())
  reporterUserId  String
  targetType      ReportTargetType
  targetId        String
  reason          String
  status          ReportStatus @default(OPEN)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relaciones
  reporter        User     @relation(fields: [reporterUserId], references: [id], onDelete: Cascade)

  @@index([reporterUserId])
  @@index([status])
  @@map("reports")
}

enum ReportTargetType {
  USER
  SERVICE
  MESSAGE
}

enum ReportStatus {
  OPEN
  REVIEWED
  CLOSED
}
```

## 5) Endpoints MVP (versión 1)

### Auth

- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- GET /auth/me

### Categorías

- GET /categories

### Servicios

- POST /services (PROVIDER)
- GET /services (feed con filtros)
- GET /services/:id
- PATCH /services/:id (owner)
- DELETE /services/:id (soft delete)

Filtros en GET /services:

- category
- city
- priceMin, priceMax
- sort (recommended | rating | newest)
- page, limit

### Interacción cliente

- POST /services/:id/like
- DELETE /services/:id/like

### Conversaciones y mensajes

- POST /conversations (crear o reutilizar conversación por servicio)
- GET /conversations
- GET /conversations/:id/messages
- POST /conversations/:id/messages (texto)
- POST /conversations/:id/messages/image (subida de imagen)

### Booking/review

- POST /bookings
- PATCH /bookings/:id/status
- POST /reviews (solo si booking = COMPLETED)

### Boosts

- POST /boosts/checkout-intent
- POST /boosts/confirm
- GET /providers/me/boosts

## 6) Ranking recomendado para feed

Fórmula simple para MVP:
score_total = score_calidad + score_relevancia + score_recencia

Donde:

- score_calidad: promedio ponderado de rating y cantidad de reseñas.
- score_relevancia: boost activo con tope máximo.
- score_recencia: pequeño bonus para servicios recientes.

Reglas:

- El boost nunca debe superar por completo a un servicio con mala reputación.
- Define límites de exposición por proveedor para evitar monopolio en el feed.

## 7) Flujo funcional clave

### Flujo cliente

1. Se registra/loguea.
2. Filtra por categoría y ciudad.
3. Ve tarjetas de servicio y marca interés.
4. Inicia chat con proveedor.
5. Cierra servicio y califica.

### Flujo proveedor

1. Se registra como proveedor.
2. Completa perfil y crea servicios.
3. Responde chats y gestiona solicitudes.
4. Compra boost para aumentar visibilidad.
5. Mejora reputación con reseñas reales.

## 8) Seguridad y antifraude (mínimo viable)

- Password hash con Argon2 o bcrypt.
- Rate limiting en login, mensajes y creación de recursos.
- Validación fuerte de input (Zod o class-validator).
- URLs firmadas o privadas para media sensible.
- Moderación básica: reportes + bloqueo de usuarios.
- Permitir review solo tras booking completado para evitar reseñas falsas.

## 9) Métricas que debes guardar desde día 1

- Conversión: vista servicio -> chat iniciado.
- Tiempo medio de primera respuesta del proveedor.
- Ratio de cierre (chat -> booking completado).
- Distribución de ratings por categoría.
- ROI de boosts (impresiones, chats generados, conversiones).

## 10) Roadmap técnico sugerido (4 sprints)

### Estructura de módulos recomendada (NestJS)

```
src/
├── main.ts
├── app.module.ts
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── pipes/
│   └── utils/
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── strategies/
│   ├── dtos/
│   └── guards/
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── dtos/
├── provider-profiles/
│   ├── provider-profiles.module.ts
│   ├── provider-profiles.service.ts
│   ├── provider-profiles.controller.ts
│   └── dtos/
├── categories/
│   ├── categories.module.ts
│   ├── categories.service.ts
│   ├── categories.controller.ts
│   └── dtos/
├── services/
│   ├── services.module.ts
│   ├── services.service.ts
│   ├── services.controller.ts
│   ├── dtos/
│   └── ranking.service.ts (lógica de scoring)
├── conversations/
│   ├── conversations.module.ts
│   ├── conversations.service.ts
│   ├── conversations.controller.ts
│   └── dtos/
├── messages/
│   ├── messages.module.ts
│   ├── messages.service.ts
│   ├── messages.controller.ts
│   ├── dtos/
│   └── websocket.gateway.ts (Socket.IO para chat realtime)
├── bookings/
│   ├── bookings.module.ts
│   ├── bookings.service.ts
│   ├── bookings.controller.ts
│   └── dtos/
├── reviews/
│   ├── reviews.module.ts
│   ├── reviews.service.ts
│   ├── reviews.controller.ts
│   └── dtos/
├── boosts/
│   ├── boosts.module.ts
│   ├── boosts.service.ts
│   ├── boosts.controller.ts
│   └── dtos/
└── reports/
    ├── reports.module.ts
    ├── reports.service.ts
    ├── reports.controller.ts
    └── dtos/
```

### Sprint 1: Auth y base de datos

**Objetivo:** Usuarios registrados/autenticados, DB sincronizada, primeros endpoints.

- [ ] Prisma setup y migrations iniciales (`npx prisma migrate dev --name init`)
- [ ] Módulo Auth (JWT, estrategia local/JWT)
- [ ] Módulo Users (CRUD básico)
- [ ] Módulo ProviderProfiles (actualizar perfil)
- [ ] Módulo Categories (GET lista)
- [ ] Tests unitarios en auth.service.spec.ts

**Endpoints listos:**

- POST /auth/register
- POST /auth/login
- GET /auth/me
- GET /categories

### Sprint 2: Servicios e interacción básica

**Objetivo:** Proveedores publican, clientes ven y filtran.

- [ ] Módulo Services (CRUD completo)
- [ ] Servicio de Ranking (calidad + filtros)
- [ ] Módulo ServiceLikes (like/unlike)
- [ ] GET /services con filtros (categoria, ciudad, precio, sort)
- [ ] Subida de imágenes para servicios (local o S3)

**Endpoints listos:**

- POST /services (provider)
- GET /services (con query params)
- GET /services/:id
- PATCH /services/:id (owner)
- POST /services/:id/like
- DELETE /services/:id/like

### Sprint 3: Chat y bookings

**Objetivo:** Clientes contactan proveedores, conversaciones fluyen.

- [ ] Módulo Conversations (crear/listar)
- [ ] Módulo Messages (texto)
- [ ] WebSocket Gateway para chat realtime (Socket.IO)
- [ ] Módulo Bookings (crear, cambiar status)
- [ ] Notificaciones push básicas (opcional: Firebase FCM)

**Endpoints listos:**

- POST /conversations
- GET /conversations
- GET /conversations/:id/messages
- POST /conversations/:id/messages
- POST /bookings
- PATCH /bookings/:id/status

### Sprint 4: Reviews, boosts y moderación

**Objetivo:** Reputación y modelo de ingresos.

- [ ] Módulo Reviews (crear review solo si booking completado)
- [ ] Actualizar ProviderProfile rating agregado
- [ ] Módulo Boosts (crear boost, gestionar activos)
- [ ] Módulo Reports (reportar usuario/servicio/mensaje)
- [ ] Cálculo de ranking con boosts (fórmula final)
- [ ] Panel simple de proveedores (mis boosts, mis reviews)

**Endpoints listos:**

- POST /reviews
- POST /boosts/create-intent
- GET /provider/me/boosts
- POST /reports
- GET /conversations/:id (incluir stats)

## 11) Contrato API inicial para el frontend Expo

Define desde el inicio:

- Versionado: /api/v1.
- Formato de error estándar:
  - code
  - message
  - details
- Paginación uniforme:
  - items
  - page
  - limit
  - total

Ejemplo de error:
{
"code": "UNAUTHORIZED",
"message": "Token inválido o expirado",
"details": null
}

## 12) Criterios de salida de MVP

Tu backend está listo para MVP cuando:

- Cliente puede descubrir servicios y abrir chat sin fricción.
- Proveedor puede publicar, responder y recibir reseñas.
- El feed ordena por calidad + promoción de forma controlada.
- Hay trazabilidad mínima para soporte y moderación.
- Puedes medir si la app está generando contactos efectivos.

---

Si luego decides, el siguiente paso natural es definir:

- Esquema Prisma completo.
- OpenAPI/Swagger del backend v1.
- Reglas exactas del algoritmo de ranking por categoría y ciudad.
