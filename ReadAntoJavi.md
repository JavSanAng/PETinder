//Descripción de Archivos y Carpetas
--BACKEND--
Controllers/: Contiene los controladores que gestionan la lógica de negocio para cada entidad.

userController.js: Controlador para los usuarios.
petController.js: Controlador para los perros.
postController.js: Controlador para las publicaciones.
friendController.js: Controlador para las relaciones de amistad.
models/: Contiene los modelos de datos.

userModel.js: Modelo de usuario.
petModel.js: Modelo de perro.
postModel.js: Modelo de publicación.
friendModel.js: Modelo de amistad.
routes/: Contiene las definiciones de rutas.

userRoutes.js: Rutas para usuarios.
petRoutes.js: Rutas para perros.
postRoutes.js: Rutas para publicaciones.
friendRoutes.js: Rutas para amistades.
middlewares/: Contiene los middlewares del proyecto.

authMiddleware.js: Middleware para autenticación.
utils/: Utilidades y funciones auxiliares.

db.js: Conexión a la base de datos.
validation.js: Validaciones generales.
config/: Configuraciones del proyecto.

config.js: Configuración general del proyecto.
tests/: Pruebas unitarias para los controladores.

app.js: Archivo principal de configuración de la aplicación.

server.js: Archivo para iniciar el servidor.

Frontend
public/: Contiene archivos públicos como index.html y favicon.ico.

src/: Contiene el código fuente del frontend.

components/: Componentes reutilizables.

Home.js: Componente para la página de inicio.
Login.js: Componente para el formulario de inicio de sesión.
Signup.js: Componente para el formulario de registro.
Dashboard.js: Componente para el panel de usuario.
PetDetails.js: Componente para los detalles del perro.
Posts.js: Componente para listar publicaciones.
PostDetails.js: Componente para los detalles de una publicación.
Friends.js: Componente para gestionar amistades.
Profile.js: Componente para el perfil del usuario.
Navbar.js: Componente para la barra de navegación.
pages/: Páginas que usan los componentes.

HomePage.js
LoginPage.js
SignupPage.js
DashboardPage.js
PetDetailsPage.js
PostsPage.js
PostDetailsPage.js
FriendsPage.js
ProfilePage.js
services/: Servicios para interactuar con el backend.

api.js: Servicio para llamadas a la API.
context/: Contextos para la gestión del estado global.

AuthContext.js: Contexto de autenticación.
hooks/: Hooks personalizados.

useAuth.js: Hook para la autenticación.
utils/: Utilidades y funciones auxiliares.

validators.js: Funciones de validación.
App.js: Componente principal de la aplicación.

index.js: Punto de entrada del frontend.

routes.js: Definiciones de las rutas de la aplicación


GIT: 

Para crear un repositorio en GitHub y configurarlo para que dos personas puedan colaborar en él, sigue estos pasos:


1. **Clona el repositorio**:
   - Abre tu terminal o línea de comandos.
   - Ejecuta el siguiente comando para clonar el repositorio (sustituye `tu-usuario` y `nombre-del-repo` con tus datos):

     ```bash
     git clone https://github.com/tu-usuario/nombre-del-repo.git
     ```

2. **Navega al directorio del repositorio**:

   ```bash
   cd nombre-del-repo
   ```


1. **Agrega y comitea los archivos iniciales**:

   ```bash
   git add .
   git commit -m "Initial project structure"
   ```

2. **Sube los cambios al repositorio remoto**:

   ```bash
   git push origin main
   ```

### 5. Invitar a Colaboradores

1. **Invita a tu compañero**:
   - Ve a tu repositorio en GitHub.
   - Haz clic en `Settings` y luego en `Collaborators`.
   - Ingresa el nombre de usuario o correo electrónico de tu compañero y haz clic en `Add collaborator`.

2. **Aceptación de la Invitación**:
   - Tu compañero recibirá una invitación por correo electrónico. Una vez que acepte la invitación, tendrá acceso de escritura al repositorio.

### 6. Colaborar en el Proyecto

Ambos pueden clonar el repositorio y trabajar en sus respectivas ramas. A continuación, algunos comandos útiles para colaborar:

- **Crear una nueva rama**:

  ```bash
  git checkout -b nombre-de-la-rama
  ```

- **Cambiar a una rama existente**:

  ```bash
  git checkout nombre-de-la-rama
  ```

- **Agregar y comitear cambios**:

  ```bash
  git add .
  git commit -m "Descripción de los cambios"
  ```

- **Subir cambios a la rama remota**:

  ```bash
  git push origin nombre-de-la-rama
  ```

- **Realizar un Pull Request**:
  - Ve a GitHub y abre un Pull Request para que los cambios puedan ser revisados y fusionados a la rama principal (`main`).

Con esta configuración y flujo de trabajo, podrás colaborar efectivamente en el proyecto con tu compañero.