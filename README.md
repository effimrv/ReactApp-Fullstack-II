# Getting Started with Create React App
# LevelUpGamer React

Bienvenido a LevelUpGamer, una tienda online de periféricos y accesorios gaming desarrollada con React.

## Tecnologías principales
- React
- React Router
- Bootstrap
- React Icons
- JavaScript (ES6+)

## Estructura del proyecto
```
ReactApp-Fullstack-II-1/
├── 📁 .git/                          # Control de versiones Git
├── 📄 .gitignore                     # Archivos ignorados por Git
├── 📄 index.html                     # HTML principal (Vite)
├── 📄 package.json                   # Dependencias y scripts npm
├── 📄 package-lock.json             # Lockfile de dependencias
├── 📄 README.md                      # Documentación del proyecto
├── 📄 tsconfig.json                  # Configuración TypeScript
├── 📄 vitest.config.js              # Configuración de Vitest (testing)
├── 📁 node_modules/                  # Dependencias instaladas
├── 📁 public/                        # Archivos estáticos públicos
│   ├── 📄 favicon.ico
│   ├── 📄 index.html
│   ├── 📄 logo192.png
│   ├── 📄 logo512.png
│   ├── 📄 manifest.json
│   └── 📄 robots.txt
└── 📁 src/                           # Código fuente principal
    ├── 📄 App.jsx                    # Componente raíz de la aplicación
    ├── 📄 main.jsx                   # Punto de entrada de la app
    ├── 📁 Componentes/               # Componentes reutilizables
    │   ├── 📄 AdminProductCard.jsx   # Card de producto para admin
    │   ├── 📄 Navbar.jsx             # Barra de navegación
    │   ├── 📄 ProductoCard.jsx       # Card de producto público
    │   └── 📄 QuickAdminModal.jsx    # Modal de acceso rápido admin
    ├── 📁 Data/                      # Manejo de datos y estado
    │   ├── 📄 carritoUsuario.js      # Servicio de carrito por usuario
    │   ├── 📄 localStorage.js        # Servicio de almacenamiento local
    │   └── 📄 productos.js           # CRUD de productos + datos inicial
    ├── 📁 Paginas/                   # Componentes de páginas/rutas
    │   ├── 📄 AdminDashboard.jsx     # Dashboard administrativo
    │   ├── 📄 AdminOrders.jsx        # Gestión de órdenes (admin)
    │   ├── 📄 AdminProducts.jsx      # Gestión de productos (admin)
    │   ├── 📄 AdminUsers.jsx         # Gestión de usuarios (admin)
    │   ├── 📄 Carrito.jsx            # Página del carrito de compras
    │   ├── 📄 Checkout.jsx           # Página de checkout/pago
    │   ├── 📄 Contacto.jsx           # Página de contacto
    │   ├── 📄 Home.jsx               # Página principal/inicio
    │   ├── 📄 Login.jsx              # Página de inicio de sesión
    │   ├── 📄 Nosotros.jsx           # Página "Acerca de nosotros"
    │   ├── 📄 OrderResult.jsx        # Página de resultado de orden
    │   ├── 📄 ProductoDetalle.jsx    # Página de detalle de producto
    │   ├── 📄 Productos.jsx          # Página de catálogo de productos
    │   └── 📄 Registro.jsx           # Página de registro de usuario
    ├── 📁 Styles/                    # Estilos CSS
    │   ├── 📄 components.css         # Estilos específicos de componentes
    │   ├── 📄 estilos.css           # Estilos principales del tema
    │   └── 📄 global.css            # Estilos globales y overrides
    ├── 📁 Tests/                     # Suite de pruebas
    │   ├── 📄 App.test.tsx          # Pruebas del componente App
    │   ├── 📄 setup.js              # Configuración de testing (JS)
    │   ├── 📄 setup.ts              # Configuración de testing (TS)
    │   ├── 📁 Componentes/          # Pruebas de componentes
    │   │   ├── 📄 ExplorarProducts.test.tsx
    │   │   ├── 📄 Home.test.tsx
    │   │   └── 📄 Productos.filter.test.tsx
    │   ├── 📁 integration/          # Pruebas de integración
    │   │   └── 📄 e2e.checkout.test.tsx
    │   └── 📁 unitTest/            # Pruebas unitarias
    │       ├── 📄 auth.test.js      # Pruebas de autenticación
    │       ├── 📄 productos.test.js # Pruebas CRUD productos
    │       └── 📄 Validaciones.test.ts # Pruebas de validaciones
    └── 📁 Utils/                    # Utilidades y servicios
        ├── 📄 Auth.js               # Servicio de autenticación
        ├── 📄 ProtectedRoute.jsx    # Componente de rutas protegidas
        └── 📄 Validaciones.js       # Funciones de validación
```

## Instalación
1. Clona el repositorio:
	```bash
	git clone https://github.com/effimrv/ReactApp-Fullstack-II.git
	```
2. Ingresa a la carpeta del proyecto:
	```bash
	cd levelupgamer-react
	```
3. Instala las dependencias:
	```bash
	npm install
 	npm install react-scripts
 	npm install react-icons
	```

## Ejecución
Para iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```
La app estará disponible en `La app estará disponible en `http://localhost:5173`.

## Funcionalidades
- Página principal con productos destacados
- Detalle de productos
- Carrito de compras
- Registro y login de usuario
- Contacto y sección de información

## Tests
Ejecuta los tests con:
```bash
npm test
```
## Para abrir en cmd
- cd "C:\Users\PC01\OneDrive\Desktop\ReactApp-Fullstack-II-1"

## Para hacer commit en el main
- git push origin main
  
---
¡Gracias por visitar LevelUpGamer!
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
