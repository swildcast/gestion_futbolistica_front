// ============================================================================
// SERVICIO HTTP - EQUIPOS
// ============================================================================
// Los SERVICIOS en Angular son clases que manejan la LÓGICA DE NEGOCIO
// y la COMUNICACIÓN CON EL BACKEND (API REST)
//
// PREGUNTA COMÚN: ¿Qué es un servicio en Angular?
// RESPUESTA: Es una clase que proporciona funcionalidad compartida entre
//            componentes. Se usa para: llamadas HTTP, lógica de negocio,
//            compartir datos entre componentes.
//
// PREGUNTA COMÚN: ¿Qué es HttpClient?
// RESPUESTA: Es un módulo de Angular para hacer peticiones HTTP (GET, POST,
//            PUT, DELETE) al backend. Es como fetch() pero más potente.
//
// PREGUNTA COMÚN: ¿Qué es Observable?
// RESPUESTA: Es un patrón de programación REACTIVA. Representa un flujo de
//            datos asíncrono. Usamos .subscribe() para "escuchar" los datos.
// ============================================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../../../core/interfaces/models';

// @Injectable indica que esta clase puede ser INYECTADA en otros componentes
// providedIn: 'root' significa que es un SINGLETON (una sola instancia en toda la app)
@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  // URL base del API REST del backend (.NET Core)
  // NOTA: Cambiar este puerto según tu configuración del backend
  private apiUrl = 'http://localhost:5130/api/Teams';

  // INYECCIÓN DE DEPENDENCIAS: Angular inyecta automáticamente HttpClient
  // PREGUNTA COMÚN: ¿Qué es la inyección de dependencias?
  // RESPUESTA: Es un patrón donde Angular crea y proporciona las dependencias
  //            automáticamente. No necesitamos hacer "new HttpClient()".
  constructor(private http: HttpClient) { }

  // ========== MÉTODO GET ALL (Listar todos los equipos) ==========
  // CONCEPTO: Petición HTTP GET para obtener un ARRAY de equipos
  // RETORNA: Observable<Team[]> - Un flujo de datos que emite un array
  getTeams(): Observable<Team[]> {
    // http.get<Team[]>() hace una petición GET y espera un array de Team
    // El <Team[]> es TIPADO GENÉRICO: le dice a TypeScript qué tipo de datos esperar
    return this.http.get<Team[]>(this.apiUrl);
  }

  // ========== MÉTODO GET BY ID (Obtener un equipo específico) ==========
  // PARÁMETRO: id - El identificador único del equipo
  // RETORNA: Observable<Team> - Un solo equipo
  getTeam(id: number): Observable<Team> {
    // Template literals (`${variable}`) para construir la URL dinámica
    // Ejemplo: si id=5, la URL será "http://localhost:5130/api/Teams/5"
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  // ========== MÉTODO POST (Crear un nuevo equipo) ==========
  // PARÁMETRO: team - El objeto Team con los datos del nuevo equipo
  // RETORNA: Observable<Team> - El equipo creado (con su ID generado)
  createTeam(team: Team): Observable<Team> {
    // http.post() envía los datos en el BODY de la petición HTTP
    // El backend (.NET) recibirá este objeto y lo guardará en la BD
    return this.http.post<Team>(this.apiUrl, team);
  }

  // ========== MÉTODO PUT (Actualizar un equipo existente) ==========
  // PARÁMETROS:
  //   - id: El ID del equipo a actualizar
  //   - team: El objeto con los nuevos datos
  // RETORNA: Observable<any> - Respuesta del servidor
  updateTeam(id: number, team: Team): Observable<any> {
    // PUT reemplaza TODOS los datos del equipo con ID especificado
    // Ejemplo URL: "http://localhost:5130/api/Teams/5"
    return this.http.put<any>(`${this.apiUrl}/${id}`, team);
  }

  // ========== MÉTODO DELETE (Eliminar un equipo) ==========
  // PARÁMETRO: id - El ID del equipo a eliminar
  // RETORNA: Observable<any> - Confirmación de eliminación
  deleteTeam(id: number): Observable<any> {
    // http.delete() envía una petición DELETE al backend
    // El backend debe validar que no haya jugadores asociados antes de eliminar
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

// ============================================================================
// RESUMEN DE MÉTODOS HTTP (CRUD):
// ============================================================================
// CREATE (Crear)   → POST   → createTeam()
// READ (Leer)      → GET    → getTeams() / getTeam()
// UPDATE (Actualizar) → PUT → updateTeam()
// DELETE (Eliminar) → DELETE → deleteTeam()
// ============================================================================
