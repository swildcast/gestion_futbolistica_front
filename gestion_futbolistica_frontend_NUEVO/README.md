# ⚽ Sistema de Gestión Futbolística - Frontend

**Proyecto Final - Desarrollo de Aplicaciones Web**  
**Estudiante:** [Tu Nombre]  
**Universidad:** [Tu Universidad]  
**Fecha:** Noviembre 2022

---

## 📋 Descripción del Proyecto

Sistema web desarrollado en **Angular 19** para la gestión de equipos de fútbol, jugadores y partidos. Este proyecto implementa una arquitectura modular con operaciones CRUD completas, integración con backend .NET Core y una interfaz moderna usando Angular Material.

---

## ⚠️ Declaración de Asistencia de IA

Este proyecto fue desarrollado con **asistencia de herramientas de Inteligencia Artificial** (GitHub Copilot/ChatGPT/Gemini) como recurso de aprendizaje y consulta técnica. 

**Uso de IA en el proyecto:**
- ✅ Consultas sobre mejores prácticas de Angular 19
- ✅ Debugging de errores de compilación
- ✅ Explicación de conceptos de TypeScript y RxJS
- ✅ Generación de comentarios educativos en el código
- ✅ Ayuda con integración de Angular Material
- ✅ Resolución de problemas de integración backend-frontend

**Trabajo realizado personalmente:**
- 📝 Comprensión y adaptación del código a los requisitos
- 🎨 Decisiones de diseño de la interfaz
- 🔧 Configuración del proyecto y dependencias
- 🧪 Pruebas de funcionalidad y depuración
- 📊 Diseño de la estructura de datos

---

## 🚀 Tecnologías Utilizadas

- **Angular 19** - Framework frontend
- **TypeScript** - Lenguaje de programación
- **Angular Material** - Librería de componentes UI
- **RxJS** - Programación reactiva
- **HTML5 & CSS3** - Maquetación y estilos

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   └── interfaces/
│   │       └── models.ts          # Interfaces TypeScript (Team, Player, Match)
│   ├── modules/
│   │   ├── equipos/              # Módulo de Equipos
│   │   │   ├── components/
│   │   │   │   ├── equipo-list/  # Lista de equipos
│   │   │   │   └── equipo-form/  # Formulario crear/editar
│   │   │   ├── services/
│   │   │   │   └── equipos.service.ts
│   │   │   ├── equipos.module.ts
│   │   │   └── equipos-routing.module.ts
│   │   ├── jugadores/            # Módulo de Jugadores
│   │   │   ├── components/
│   │   │   │   ├── jugador-list/
│   │   │   │   └── jugador-form/
│   │   │   ├── services/
│   │   │   └── jugadores.module.ts
│   │   ├── partidos/             # Módulo de Partidos
│   │   │   ├── components/
│   │   │   │   ├── partido-list/
│   │   │   │   └── partido-form/
│   │   │   ├── services/
│   │   │   └── partidos.module.ts
│   │   └── shared/               # Componentes compartidos
│   │       └── confirm-dialog/
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/                       # Recursos estáticos
└── styles.css                    # Estilos globales
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Módulo de Equipos
- Listar todos los equipos en tabla interactiva
- Crear nuevo equipo con validaciones
- Editar equipo existente
- Eliminar equipo con confirmación
- Campos: Nombre, Ciudad, Estadio, Año de Fundación

### ✅ Módulo de Jugadores
- CRUD completo de jugadores
- Dropdown para seleccionar equipo
- Dropdown para seleccionar posición
- Campos: Nombre, Posición, Edad, Equipo

### ✅ Módulo de Partidos
- CRUD completo de partidos
- Selección de equipo local y visitante
- Campos: Equipos, Fecha/Hora, Resultado, Estadio

### ✅ Características Técnicas
- **Lazy Loading**: Módulos cargados bajo demanda
- **Reactive Forms**: Formularios con validaciones robustas
- **HTTP Client**: Comunicación con API REST
- **RxJS Observables**: Manejo asíncrono de datos
- **Material Design**: Interfaz moderna y responsive
- **Routing**: Navegación entre módulos

---

## 🔧 Configuración e Instalación

### Prerrequisitos
```bash
Node.js >= 18.x
npm >= 9.x
Angular CLI >= 19.x
```

### Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/swildcast/gestion_futbolistica_front.git
cd gestion_futbolistica_front/gestion_futbolistica_frontend_NUEVO
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar URL del backend:**
   - Por defecto el frontend apunta a `http://localhost:5130`
   - Si tu backend está en otro puerto, edita los archivos de servicios:
     - `src/app/modules/equipos/services/equipos.service.ts`
     - `src/app/modules/jugadores/services/jugadores.service.ts`
     - `src/app/modules/partidos/services/partidos.service.ts`

4. **Ejecutar en modo desarrollo:**
```bash
ng serve
```

5. **Abrir en navegador:**
```
http://localhost:4200
```

---

## 🌐 Integración con Backend

El frontend se conecta a una API REST .NET Core:

- **GET** `/api/Teams` - Lista de equipos
- **GET** `/api/Teams/{id}` - Equipo por ID
- **POST** `/api/Teams` - Crear equipo
- **PUT** `/api/Teams/{id}` - Actualizar equipo
- **DELETE** `/api/Teams/{id}` - Eliminar equipo

*(Misma estructura para Players y Matches)*

---

## 📚 Conceptos Aprendidos

Durante el desarrollo de este proyecto, profundicé en:

1. **Arquitectura Modular en Angular**
   - Separación de responsabilidades
   - Lazy loading de módulos
   - Servicios singleton

2. **Reactive Forms**
   - FormBuilder y FormGroup
   - Validadores síncronos y asíncronos
   - Control de estado del formulario

3. **RxJS y Observables**
   - Operadores: map, catchError, tap
   - Suscripciones y manejo de memoria
   - Programación reactiva

4. **Angular Material**
   - Componentes: Table, Dialog, Snackbar, Forms
   - Theming y personalización
   - Responsive design

5. **TypeScript**
   - Interfaces y tipos
   - Generics
   - Decoradores

6. **HTTP Client**
   - Peticiones REST
   - Manejo de errores
   - Interceptores

---

## 🐛 Problemas Enfrentados y Soluciones

### **Problema 1: Error de compilación con standalone components**
- **Descripción**: Angular 19 migró a standalone components por defecto
- **Solución**: Convertí `AppComponent` a standalone y ajusté imports en `app.module.ts`

### **Problema 2: Mismatch de nombres de propiedades**
- **Descripción**: Backend devolvía `anioFundacion` pero frontend esperaba `anoFundacion`
- **Solución**: Actualicé interfaces TypeScript para coincidir con API

### **Problema 3: CORS en desarrollo**
- **Descripción**: Navegador bloqueaba peticiones al backend
- **Solución**: Configuré CORS en backend para permitir `http://localhost:4200`

### **Problema 4: Lazy loading no funcionaba**
- **Descripción**: Módulos se cargaban todos al inicio
- **Solución**: Implementé `loadChildren` en rutas con sintaxis de import dinámico

---

## 🎨 Diseño Visual

El proyecto incluye:
- Tema personalizado con colores del FC Barcelona (azul #004D98, granate #A50044)
- Fondo de estadio con efecto parallax
- Tabla con efecto glassmorphism
- Animaciones sutiles en hover
- Scrollbar personalizado

---

## 📊 Base de Datos de Prueba

El proyecto incluye datos de ejemplo:
- **FC Barcelona 2007-2008** (Camp Nou)
- **Real Madrid** (Santiago Bernabéu)
- Jugadores históricos (Valdés, Puyol, Xavi, Iniesta, etc.)

---

## 🔮 Futuras Mejoras

- [ ] Implementar paginación en tablas
- [ ] Agregar búsqueda y filtros
- [ ] Implementar autenticación JWT
- [ ] Agregar gráficos de estadísticas
- [ ] Implementar PWA para modo offline
- [ ] Unit testing con Jasmine/Karma

---

## 📝 Referencias y Recursos

- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👤 Autor

**[Tu Nombre]**  
- GitHub: [@swildcast](https://github.com/swildcast)
- Email: [tu-email@ejemplo.com]

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para el curso de Desarrollo de Aplicaciones Web.

---

## 🙏 Agradecimientos

- Profesor [Nombre del Profesor] por la guía durante el curso
- Comunidad de Angular por la documentación
- Herramientas de IA por asistencia técnica durante el desarrollo

---

**Nota**: Este README fue creado siguiendo las mejores prácticas de documentación de proyectos open source y declarando honestamente el uso de herramientas de asistencia de IA durante el desarrollo.
