// ============================================================================
// INTERFACES - MODELOS DE DATOS
// ============================================================================
// Las interfaces definen la ESTRUCTURA de los datos que usaremos en la app
// Son como "contratos" que garantizan que los objetos tengan ciertas propiedades
// PREGUNTA COMÚN: ¿Qué es una interface en TypeScript?
// RESPUESTA: Es una definición de tipo que especifica qué propiedades y métodos
//            debe tener un objeto, sin implementar la lógica.
// ============================================================================

/**
 * Interface para representar un Equipo de fútbol
 * CONCEPTO CLAVE: Cada propiedad tiene un TIPO (string, number, Date)
 */
export interface Team {
    id: number;              // Identificador único del equipo
    nombre: string;          // Nombre del equipo (ej: "Real Madrid")
    ciudad: string;          // Ciudad donde juega (ej: "Madrid")
    estadio: string;         // Nombre del estadio (ej: "Santiago Bernabéu")
    anioFundacion: number;    // Año de fundación (ej: 1902)
}

/**
 * Interface para representar un Jugador
 * NOTA: idEquipo es una FOREIGN KEY que relaciona al jugador con su equipo
 */
export interface Player {
    id: number;              // Identificador único del jugador
    nombre: string;          // Nombre completo del jugador
    posicion: string;        // Posición en el campo (ej: "Delantero", "Portero")
    edad: number;            // Edad del jugador
    idEquipo: number;        // ID del equipo al que pertenece (RELACIÓN)
}

/**
 * Interface para representar un Partido
 * CONCEPTO: Un partido relaciona DOS equipos (local y visitante)
 */
export interface Match {
    id: number;              // Identificador único del partido
    equipoLocalId: number;   // ID del equipo que juega en casa
    equipoVisitanteId: number; // ID del equipo visitante
    fecha: Date;             // Fecha y hora del partido
    resultado?: string;      // Resultado (ej: "2-1") - OPCIONAL (?)
    estadio: string;         // Estadio donde se juega
}
