### 1. **Documentación Técnica**
   - **Introducción del Proyecto:**
     - RecipesUPATECO es una aplicacion de recetas que permite su busqueda por nombre y categoria.
     - Las tecnologias utilizadas en el proyecto son: ReactJS + Vite, CSS, axios.
     
     - **Estructura de archivos y carpetas:** 
          - **public:** Contiene los archivos estaticos y el archivo **index.html**.

          - **src:** Carpeta principal que contiene el codigo fuente de la aplicacion.
          - **components:** Contiene los componenetes de la aplicacion. Cada componente esta en su propia carpeta con su archivo **.jsx**.
          - **config:** Contiene la configuracion para las rutas y los contextos.
     - **Descripción de los módulos:**
          - **Categorias**: Devuelve las categorias, que trae atravez de un fetch a la API, al componente Recetas.
          - **Comentarios**: Devuelve los comentarios de la receta actual al componente RecetaPage.
          - **InputComentarios**: Permite enviar un comentario a la receta actual.
          - **MisComentarios**: Devuelve los comentarios asociados al ID del usuario.
          - **CrearReceta**: Formulario que permite enviar o editar una receta dependiendo de donde se llame.
          - **EditarPage**: Devuelve mis recetas y da la opcion de editarlo o borrarlo desde el perfil del usuario.
          - **Ingredientes**: Devuelve los ingredientes de la receta actual al componente RecetaPage.
          - **Login**: Formulario para que inicie sesion el usuario.
          - **Modal**: Componente que se reutilizar para mostrar un modal dependiendo del "tipo" que se le pase.
          - **ModalRating**: Un modal que permite enviar una puntuacion a una receta.
          - **Navbar**: Un barra de navegacion que permite moverse entre las rutas.
          - **Pasos**: Devuelve los pasos para la receta actual al componente RecetaPage.
          - **ProfilePage**: Pagina donde se muestra la informacion del usuario, como sus recetas y sus comentarios.
          - **Puntuacion**: Muestra la puntuacion de mi receta y permite abrir el modal para puntuarlo.
          - **RecetaCard**: Carta de presentacion de una receta en la pagina principal.
          - **RecetaPage**: Pagina que muestra toda la informacion de una receta.
          - **Recetas**: Pagina principal que muestra todas las recetas y permite su filtrado por categoria o busqueda por nombre.

        
   - **Guía de Uso:**
     - **Como crear una receta**:
         1. Primero, para poder crear una receta tiene que iniciar sesion.
         2. Navega por la barra de navegacion hasta "Crear receta".
         3. Completa los campos del formulario, solo son obligatorios los primeros campos como nombre, descripcion, y los tiempos.
         4. Haz click en el boton de enviar "Crear receta" y se añadira a la base de datos.

      - **Como borrar una receta**:
        1. Primero, para poder crear una receta tiene que iniciar sesion.
        2. Navega por la barra de navegacion hasta "Mi perfil".
        3. En la seccion de "Mis recetas" hacer click en el boton "Borrar" de la receta que quiera borrar.
        
   

   - **Mantenimiento y Actualización:**
     - **Convenciones de código:**
       1. Para **variables** y **funciones** se aplico el uso de **camelCase**.
       2. Para **clases** y **componentes** se aplico el uso de **PascalCase**.
       3. Para **archivos** se aplico el uso de **PascalCase**.
   