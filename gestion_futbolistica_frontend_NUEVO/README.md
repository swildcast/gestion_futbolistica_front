# Gestión Futbolística - Frontend

Aplicación web para la gestión de equipos de fútbol, jugadores y partidos. Desarrollada con Angular 19 y Material Design.

## 🚀 Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **Angular Material** - Componentes UI
- **TypeScript 5.7** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva
- **HttpClient** - Comunicación con API REST

## 📋 Requisitos Previos

- Node.js 18+ 
- npm 9+
- Backend corriendo en `http://localhost:5130`

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/swildcast/gestion_futbolistica_front.git

# Navegar al directorio del proyecto
cd gestion_futbolistica_front/gestion_futbolistica_frontend_NUEVO

# Instalar dependencias
npm install
```

## ▶️ Ejecución

```bash
# Iniciar servidor de desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   └── interfaces/
│   │       └── models.ts          # Interfaces Team, Player, Match
│   ├── modules/
│   │   ├── equipos/               # Módulo de Equipos
│   │   │   ├── components/
│   │   │   │   ├── equipo-list/   # Lista de equipos
│   │   │   │   └── equipo-form/   # Formulario crear/editar
│   │   │   ├── services/
│   │   │   │   └── equipos.service.ts
│   │   │   └── equipos.module.ts
│   │   ├── jugadores/             # Módulo de Jugadores
│   │   └── partidos/              # Módulo de Partidos
│   ├── app.component.ts           # Componente principal
│   └── app-routing.module.ts      # Rutas principales
└── styles.css                     # Estilos globales
```

## 🎯 Funcionalidades

### Módulo de Equipos
- ✅ Listar todos los equipos
- ✅ Crear nuevo equipo
- ✅ Editar equipo existente
- ✅ Eliminar equipo
- ✅ Validaciones de formulario

### Módulo de Jugadores
- ✅ Listar todos los jugadores
- ✅ Crear nuevo jugador
- ✅ Editar jugador existente
- ✅ Eliminar jugador
- ✅ Asignar jugador a equipo

### Módulo de Partidos
- ✅ Listar todos los partidos
- ✅ Crear nuevo partido
- ✅ Editar partido existente
- ✅ Eliminar partido
- ✅ Asignar equipos al partido

## 🔌 Endpoints del Backend

El frontend consume los siguientes endpoints:

- `GET /api/Teams` - Obtener todos los equipos
- `GET /api/Teams/{id}` - Obtener equipo por ID
- `POST /api/Teams` - Crear nuevo equipo
- `PUT /api/Teams/{id}` - Actualizar equipo
- `DELETE /api/Teams/{id}` - Eliminar equipo

- `GET /api/Players` - Obtener todos los jugadores
- `GET /api/Players/{id}` - Obtener jugador por ID
- `POST /api/Players` - Crear nuevo jugador
- `PUT /api/Players/{id}` - Actualizar jugador
- `DELETE /api/Players/{id}` - Eliminar jugador

- `GET /api/Matches` - Obtener todos los partidos
- `GET /api/Matches/{id}` - Obtener partido por ID
- `POST /api/Matches` - Crear nuevo partido
- `PUT /api/Matches/{id}` - Actualizar partido
- `DELETE /api/Matches/{id}` - Eliminar partido

## ⚙️ Configuración

### Cambiar URL del Backend

Si el backend corre en un puerto diferente, editar los servicios:

```typescript
// src/app/modules/equipos/services/equipos.service.ts
private apiUrl = 'http://localhost:5130/api/Teams';
```

## 🧪 Pruebas

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con cobertura
npm run test -- --code-coverage
```

## 📦 Build para Producción

```bash
# Generar build optimizado
npm run build

# Los archivos se generarán en dist/
```

## 🎨 Características de UI

- **Diseño Responsivo** - Funciona en desktop y móvil
- **Material Design** - Componentes modernos y consistentes
- **Lazy Loading** - Carga de módulos bajo demanda
- **Validaciones en Tiempo Real** - Feedback inmediato al usuario
- **Notificaciones** - Snackbars para confirmar acciones

## 📝 Notas Importantes

- El backend debe estar corriendo **antes** de iniciar el frontend
- El puerto por defecto del frontend es **4200**
- El puerto por defecto del backend es **5130**
- CORS está configurado en el backend para aceptar peticiones desde `http://localhost:4200`

## 👨‍💻 Autor

Proyecto desarrollado para la materia de Desarrollo Web
