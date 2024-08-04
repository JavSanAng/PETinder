# 🐾 PETinder 🐾

¡Bienvenidos a PETinder! La red social definitiva para los amantes de las mascotas. Aquí puedes conectarte con otros pet lovers, compartir publicaciones sobre tus mascotas, y gestionar sus perfiles. ¡Vamos a hacer que esas colitas se muevan!

## Contenidos

- Características
- Tecnologías Usadas
- Instalación
- Uso
- Estructura del Proyecto
- Rutas de la API
- Contribuir
- Licencia
- Agradecimientos

## Características

- Autenticación de usuarios (login/registro)
- Gestión de perfiles
- Añadir, editar y eliminar mascotas
- Crear, editar y eliminar publicaciones
- Diseño responsivo con una interfaz moderna

## Tecnologías Usadas

- **Frontend:** React, Material-UI, React Router, Axios, React Query
- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Estilos:** CSS, Material-UI

## Instalación

### Requisitos previos
- Node.js (versión 14 o superior)
- PostgreSQL

### Pasos de instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/yourusername/PETinder.git
   cd PETinder
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   cd backend
   npm install
   cd ..
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en la carpeta raíz y añadir las variables necesarias. Ejemplo:
   ```env
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_database_url
   ```

4. **Iniciar la aplicación:**
   - **Backend:**
     ```bash
     cd backend
     npm start
     ```
   - **Frontend:**
     ```bash
     cd frontend
     npm start
     ```

5. **Acceder a la aplicación:**
   Abre tu navegador y navega a `http://localhost:5000`.

## Uso

### Inicio de sesión recomendado

Para una experiencia rápida y de prueba, puedes usar las siguientes credenciales:
- **Usuario:** Loco
- **Contraseña:** loco

### Estructura del Proyecto

- **frontend/** - Contiene la aplicación frontend de React
- **backend/** - Contiene la aplicación backend de Node.js
- **src/components/** - Contiene los componentes de React
- **src/pages/** - Contiene las páginas de React
- **src/context/** - Contiene los proveedores de contexto para la gestión del estado

## Rutas de la API

### Autenticación

- `POST /auth/register` - Registra un nuevo usuario
- `POST /auth/login` - Inicia sesión con un usuario existente

### Usuarios

- `GET /user/:userId` - Obtiene detalles del usuario
- `PUT /user/:userId` - Actualiza detalles del usuario

### Mascotas

- `GET /pets` - Obtiene todas las mascotas del usuario conectado
- `POST /pets` - Añade una nueva mascota
- `PUT /pets/:id` - Actualiza una mascota
- `DELETE /pets/:id` - Elimina una mascota

### Publicaciones

- `GET /posts` - Obtiene todas las publicaciones
- `GET /posts/user/:userId` - Obtiene todas las publicaciones de un usuario
- `POST /posts` - Añade una nueva publicación
- `PUT /posts/:id` - Actualiza una publicación
- `DELETE /posts/:id` - Elimina una publicación


¡Espero que disfrutes usando PETinder tanto como nosotros disfrutamos creándolo! 🐶😸