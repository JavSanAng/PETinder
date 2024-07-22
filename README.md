# PETinder

PETinder es una aplicación web para conectar a los dueños de perros y compartir publicaciones sobre sus mascotas. La aplicación permite a los usuarios registrarse, iniciar sesión, publicar contenido relacionado con sus perros, y gestionar solicitudes de amistad entre mascotas.

## Características

- Registro e inicio de sesión de usuarios
- Gestión de perfiles de perros
- Publicaciones relacionadas con los perros
- Solicitudes de amistad entre perros
- Panel de usuario para gestionar contenido

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: el backend y el frontend.

### Backend

El backend está construido con Node.js y Express. Se encarga de gestionar las peticiones de la API, la autenticación de usuarios, y la interacción con la base de datos.

#### Estructura del Backend

backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
├── tests/
├── .env
├── app.js
├── server.js
├── package.json


### Frontend

El frontend está construido con React. Se encarga de la interfaz de usuario y de interactuar con la API del backend.

#### Estructura del Frontend

frontend/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── context/
│ ├── hooks/
│ ├── utils/
│ ├── App.js
│ ├── index.js
│ ├── routes.js
├── .env
├── package.json


