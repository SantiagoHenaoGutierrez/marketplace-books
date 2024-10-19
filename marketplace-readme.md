# Marketplace Project

Este proyecto es una aplicación de marketplace desarrollada con Node.js/Express en el backend y React en el frontend.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL (v12 o superior)

## Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd marketplace-project
```

### 2. Configuración del Backend

Navega al directorio del backend:
```bash
cd backend
```

Instala las dependencias:
```bash
npm install
```

Dependencias principales que se instalarán:
- express
- prisma
- @prisma/client
- bcrypt
- jsonwebtoken
- cors
- dotenv

Crea un archivo `.env` en el directorio `backend` con las siguientes variables:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"
JWT_SECRET="tu_clave_secreta_para_jwt"
PORT=3001
```

Inicializa la base de datos:
```bash
npx prisma migrate dev
```

### 3. Configuración del Frontend

Navega al directorio del frontend:
```bash
cd frontend
```

Instala las dependencias:
```bash
npm install
```

Dependencias principales que se instalarán:
- react
- react-router-dom
- axios
- styled-components

Crea un archivo `.env` en el directorio `frontend` con las siguientes variables:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Ejecutar el Proyecto

### Backend

En el directorio `backend`:
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:3001`

### Frontend

En el directorio `frontend`:
```bash
npm start
```
La aplicación se abrirá en `http://localhost:3000`

## Estructura del Proyecto

```
marketplace-project/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── app.ts
│   ├── prisma/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── services/
    │   └── App.js
    └── package.json
```

## Características Principales

- Autenticación de usuarios (registro e inicio de sesión)
- Gestión de productos
- Carrito de compras
- Perfiles de usuario
- Protección de rutas

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/registerProfile` - Registro de perfil

### Productos
- `GET /api/products` - Obtener lista de productos
- `POST /api/products` - Crear nuevo producto

### Carrito
- `POST /api/cart/add` - Agregar producto al carrito

## Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación mediante JWT
- Protección CORS configurada
- Rutas protegidas en frontend y backend

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Soporte

Para reportar problemas o solicitar ayuda, por favor abre un issue en el repositorio.
