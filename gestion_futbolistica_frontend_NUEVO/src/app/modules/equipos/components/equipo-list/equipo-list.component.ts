// ============================================================================
// COMPONENTE - LISTA DE EQUIPOS
// ============================================================================
// Los COMPONENTES son las piezas fundamentales de Angular
// Cada componente tiene 3 partes:
//   1. TYPESCRIPT (.ts) - La LÓGICA (este archivo)
//   2. HTML (.html) - La VISTA (lo que ve el usuario)
//   3. CSS (.css) - Los ESTILOS (colores, tamaños, etc.)
//
// PREGUNTA COMÚN: ¿Qué es un componente en Angular?
// RESPUESTA: Es una clase TypeScript que controla una parte de la pantalla.
//            Combina lógica (TS), vista (HTML) y estilos (CSS).
//
// PREGUNTA COMÚN: ¿Qué es el ciclo de vida de un componente?
// RESPUESTA: Son métodos que Angular llama en momentos específicos:
//            - ngOnInit(): Se ejecuta UNA VEZ cuando el componente se carga
//            - ngOnDestroy(): Se ejecuta cuando el componente se destruye
//            - ngOnChanges(): Se ejecuta cuando cambian los @Input()
// ============================================================================

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EquiposService } from '../../services/equipos.service';
import { Team } from '../../../../core/interfaces/models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

// @Component es un DECORADOR que convierte la clase en un componente Angular
@Component({
  selector: 'app-equipo-list',           // Nombre del tag HTML: <app-equipo-list></app-equipo-list>
  templateUrl: './equipo-list.component.html',  // Ruta al archivo HTML
  styleUrls: ['./equipo-list.component.css']    // Ruta al archivo CSS
})
export class EquipoListComponent implements OnInit {

  // ========== PROPIEDADES DEL COMPONENTE ==========
  // Estas variables almacenan el ESTADO del componente

  // Array que contendrá todos los equipos obtenidos del backend
  equipos: Team[] = [];

  // MatTableDataSource es una clase de Angular Material para manejar tablas
  // PREGUNTA COMÚN: ¿Por qué usar MatTableDataSource?
  // RESPUESTA: Proporciona funcionalidades automáticas como:
  //            - Paginación
  //            - Ordenamiento
  //            - Filtrado
  dataSource = new MatTableDataSource<Team>();

  // Define qué columnas se mostrarán en la tabla y en qué orden
  // NOTA: Estos nombres deben coincidir con los usados en el HTML
  displayedColumns: string[] = ['nombre', 'ciudad', 'estadio', 'anioFundacion', 'actions'];

  // Variable para mostrar un spinner mientras se cargan los datos
  loading = true;

  // ========== CONSTRUCTOR - INYECCIÓN DE DEPENDENCIAS ==========
  // Angular inyecta automáticamente estas dependencias
  // PREGUNTA COMÚN: ¿Qué es la inyección de dependencias?
  // RESPUESTA: Angular crea y proporciona automáticamente las instancias
  //            de las clases que necesitamos. No hacemos "new EquiposService()".
  constructor(
    private equiposService: EquiposService,  // Servicio para llamadas HTTP
    private router: Router,                  // Para navegar entre páginas
    private dialog: MatDialog,               // Para mostrar diálogos modales
    private snackBar: MatSnackBar            // Para mostrar notificaciones toast
  ) { }

  // ========== ngOnInit - INICIALIZACIÓN DEL COMPONENTE ==========
  // Este método se ejecuta UNA VEZ cuando el componente se carga
  // PREGUNTA COMÚN: ¿Por qué usar ngOnInit() en lugar del constructor?
  // RESPUESTA: El constructor es para inicialización simple. ngOnInit() es
  //            para lógica que requiere que el componente esté completamente
  //            inicializado (ej: llamadas HTTP, acceso al DOM).
  ngOnInit(): void {
    this.loadEquipos();  // Cargar la lista de equipos al iniciar
  }

  // ========== MÉTODO PARA CARGAR EQUIPOS ==========
  // Este método hace una petición HTTP GET al backend
  loadEquipos(): void {
    // Llamamos al servicio que hace la petición HTTP
    // CONCEPTO CLAVE: .subscribe() es como .then() en Promises
    this.equiposService.getTeams().subscribe({
      // next: Se ejecuta cuando la petición es EXITOSA
      next: (data: Team[]) => {
        this.equipos = data;           // Guardamos los datos en el array
        this.dataSource.data = data;   // Actualizamos la tabla Material
        this.loading = false;          // Ocultamos el spinner
      },
      // error: Se ejecuta si hay un ERROR en la petición
      error: (error: any) => {
        console.error('Error loading equipos', error);
        this.loading = false;
        // Mostramos un mensaje de error al usuario
        this.snackBar.open('Error al cargar equipos', 'Cerrar', {
          duration: 3000,  // 3 segundos
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  // ========== MÉTODO PARA ELIMINAR UN EQUIPO ==========
  // PARÁMETRO: id - El ID del equipo a eliminar
  // CONCEPTO: Primero mostramos un diálogo de confirmación
  deleteEquipo(id: number): void {
    // Abrimos un diálogo modal para confirmar la eliminación
    // PREGUNTA COMÚN: ¿Qué es MatDialog?
    // RESPUESTA: Es un servicio de Angular Material para mostrar ventanas
    //            modales (pop-ups) con componentes personalizados.
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Estás seguro de que quieres eliminar este equipo?'
      }
    });

    // afterClosed() devuelve un Observable que emite cuando se cierra el diálogo
    // CONCEPTO: El usuario puede hacer clic en "Sí" (true) o "No" (false)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {  // Si el usuario confirmó la eliminación
        // Hacemos la petición HTTP DELETE al backend
        this.equiposService.deleteTeam(id).subscribe({
          next: () => {
            // Mostramos mensaje de éxito
            this.snackBar.open('Equipo eliminado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            // Recargamos la lista para reflejar los cambios
            this.loadEquipos();
          },
          error: (error: any) => {
            console.error('Error deleting equipo', error);
            this.snackBar.open('Error al eliminar equipo', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  // ========== MÉTODO PARA NAVEGAR AL FORMULARIO DE CREACIÓN ==========
  createEquipo(): void {
    // Router.navigate() cambia la URL y carga otro componente
    // CONCEPTO: Navegación programática (desde código, no desde un link)
    this.router.navigate(['/equipos/crear']);
  }

  // ========== MÉTODO PARA NAVEGAR AL FORMULARIO DE EDICIÓN ==========
  editEquipo(id: number): void {
    // Navegamos a la ruta de edición pasando el ID como parámetro
    // Ejemplo: /equipos/editar/5
    this.router.navigate(['/equipos/editar', id]);
  }
}

// ============================================================================
// CONCEPTOS CLAVE CUBIERTOS EN ESTE COMPONENTE:
// ============================================================================
// 1. Componentes y decoradores (@Component)
// 2. Ciclo de vida (ngOnInit)
// 3. Inyección de dependencias (constructor)
// 4. Observables y .subscribe()
// 5. MatTableDataSource para tablas
// 6. MatDialog para confirmaciones
// 7. MatSnackBar para notificaciones
// 8. Router para navegación
// 9. Manejo de errores HTTP
// 10. Tipado fuerte con TypeScript (Team, Team[])
// ============================================================================
