# 📚 Instrucciones de Ejecución - Gestión Futbolística

## Descripción del Proyecto

Sistema web completo para la gestión de equipos de fútbol, jugadores y partidos. Incluye:
- **Frontend**: Angular 19 con Material Design
- **Backend**: .NET Core con Entity Framework y SQL Server

---

## 🎯 Requisitos del Sistema

### Frontend
- Node.js 18 o superior
- npm 9 o superior

### Backend
- .NET SDK 8.0 o superior
- SQL Server 2019 o superior (o SQL Server Express)

---

## 🚀 Pasos para Ejecutar el Proyecto

### 1️⃣ Configurar la Base de Datos

```sql
-- Crear la base de datos en SQL Server
CREATE DATABASE GestionFutbolisticaDB;
```

### 2️⃣ Configurar el Backend

```bash
# Navegar al directorio del backend
cd [ruta-al-backend]

# Restaurar paquetes NuGet
dotnet restore

# Aplicar migraciones a la base de datos
dotnet ef database update

# Ejecutar el backend
dotnet run
```

✅ El backend estará corriendo en: `http://localhost:5130`

### 3️⃣ Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd gestion_futbolistica_front/gestion_futbolistica_frontend_NUEVO

# Instalar dependencias
npm install

# Ejecutar el frontend
npm start
```

✅ El frontend estará corriendo en: `http://localhost:4200`

### 4️⃣ Verificar que Todo Funciona

1. Abrir el navegador en `http://localhost:4200`
2. Deberías ver la página principal con el menú de navegación
3. Hacer clic en "Equipos" para ver la lista de equipos
4. Probar crear un nuevo equipo

---

## 🔧 Configuración de la Cadena de Conexión

Si necesitas cambiar la configuración de SQL Server, edita el archivo `appsettings.json` en el backend:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GestionFutbolisticaDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

---

## 📝 Orden de Ejecución

> [!IMPORTANT]
> **SIEMPRE ejecutar en este orden:**
> 1. Base de datos (crear y migrar)
> 2. Backend (puerto 5130)
> 3. Frontend (puerto 4200)

---

## ⚠️ Solución de Problemas Comunes

### Error: "No se puede conectar al backend"
- Verificar que el backend esté corriendo en el puerto 5130
- Verificar que no haya firewall bloqueando el puerto

### Error: "Cannot connect to SQL Server"
- Verificar que SQL Server esté corriendo
- Verificar la cadena de conexión en `appsettings.json`
- Verificar que la base de datos exista

### Error: "Port 4200 is already in use"
- Cerrar otras instancias de Angular
- O aceptar usar un puerto diferente cuando Angular lo pregunte

---

## 📦 Repositorios

- **Frontend**: https://github.com/swildcast/gestion_futbolistica_front
- **Backend**: [URL del repositorio del backend]

---

## 🎓 Funcionalidades Implementadas

### ✅ CRUD Completo de Equipos
- Crear, leer, actualizar y eliminar equipos
- Validaciones de formulario
- Interfaz con Material Design

### ✅ CRUD Completo de Jugadores
- Gestión completa de jugadores
- Asignación de jugadores a equipos
- Validaciones de edad, posición, etc.

### ✅ CRUD Completo de Partidos
- Gestión de partidos
- Asignación de equipos local y visitante
- Registro de resultados

### ✅ Características Técnicas
- Lazy Loading de módulos
- Servicios HTTP con RxJS
- Stored Procedures para operaciones de lectura
- Entity Framework para operaciones de escritura
- Validaciones en frontend y backend
- Manejo de errores y notificaciones

---

## 👨‍💻 Notas para el Profesor

- El proyecto implementa **3 CRUDs completos** (Equipos, Jugadores, Partidos)
- Utiliza **lazy loading** para optimizar la carga inicial
- El backend utiliza **stored procedures** para las operaciones GET
- Implementa **validaciones** tanto en frontend como en backend
- La arquitectura sigue las **mejores prácticas** de Angular y .NET Core
