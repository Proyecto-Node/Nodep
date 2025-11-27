📝 Proyecto: API de Tareas con Autenticación JWT, Prisma y Seguridad

Este proyecto es una API construida en Node.js, Express, Prisma ORM y autenticación con JWT.
Permite registrar usuarios, iniciar sesión y gestionar tareas protegidas mediante token.

Incluye middleware de CORS, rate-limit, Passport JWT Strategy, validaciones y estructura modular.

🚀 Características principales

Registro e inicio de sesión de usuarios.

Autenticación mediante JWT.

CRUD de tareas protegido (solo usuarios autenticados).

Uso de Prisma ORM con base de datos PostgreSQL.

Seguridad:

Rate limit.

CORS configurado.

Estrategia JWT con Passport.

Código modular y escalable.

📦 Requisitos previos

Asegúrate de tener instalado:

Node.js (v18 o superior)

PostgreSQL

npm o yarn

📥 Instalación
1️⃣ Clonar el repositorio
git clone <https://github.com/Proyecto-Node/Nodep.git>
cd <Nodep>

2️⃣ Instalar dependencias
npm install

3️⃣ Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto:

DATABASE_URL="postgresql://usuario:password@localhost:5432/tu_bd?schema=public"
JWT_SECRET="tu_secreto_super_seguro"
JWT_EXPIRES_IN="1d"
PORT=3000


⚠️ Verifica que .env NO esté subido al repositorio.

🧱 Migraciones de Prisma

Para generar el cliente e instalar el esquema:

npx prisma migrate dev --name init


Para generar el cliente manualmente:

npx prisma generate

▶️ Ejecutar el proyecto
npm run start


Deberías ver algo como:

Server running on port 3000
Prisma connected successfully


Sin errores.

🔐 Seguridad del proyecto
1️⃣ Flujo de autenticación
🧩 Registro

POST /auth/register
Envías email + password → se crea el usuario con contraseña hasheada.

🔑 Login

POST /auth/login
Si las credenciales son correctas → se genera un JWT que contiene:

sub → userId

exp → tiempo de expiración definido en .env

Ejemplo de respuesta:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

🛡️ Acceso a rutas protegidas

Para crear/ver/editar tareas debes incluir el token en el Header:

Authorization: Bearer TU_TOKEN

2️⃣ Rate Limit

Implementado en:

/middleware/rateLimit.js


Evita que un usuario haga demasiadas peticiones en poco tiempo.

3️⃣ Configuración de CORS

Ubicado en:

/middleware/cors.js


Permite solo ciertos orígenes y métodos seguros.

4️⃣ Uso de Passport con JWT

Archivo principal:

/config/passport.js


Passport extrae el token, valida su firma y añade el usuario al request:

req.user = { id: userId };


Las rutas protegidas usan:

passport.authenticate("jwt", { session: false })

📚 Endpoints principales
👤 Auth
Método	Ruta	Descripción
POST	/auth/register	Registrar usuario
POST	/auth/login	Obtener token JWT
📝 Tasks (requieren Bearer Token)
Método	Ruta	Descripción
POST	/tasks	Crear tarea
GET	/tasks	Listar tareas del usuario
GET	/tasks/:id	Ver una tarea
PUT	/tasks/:id	Actualizar tarea
DELETE	/tasks/:id	Eliminar tarea
👀 Ver lista de usuarios (solo desarrollo)

Si activaste un endpoint temporal o desde Prisma Studio:

Opción 1 – Prisma Studio
npx prisma studio

Opción 2 – Query temporal en /auth/users (si lo creaste)

GET /auth/users