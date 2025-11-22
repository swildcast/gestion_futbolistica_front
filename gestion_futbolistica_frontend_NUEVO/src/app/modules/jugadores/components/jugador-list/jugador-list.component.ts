// ============================================================================
// COMPONENTE - LISTA DE JUGADORES
// ============================================================================
// Similar a EquipoListComponent pero adaptado para Jugadores
// CONCEPTO ADICIONAL: Mostrar el nombre del equipo usando una relación
// ============================================================================

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { JugadoresService } from '../../services/jugadores.service';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { Player, Team } from '../../../../core/interfaces/models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-jugador-list',
  templateUrl: './jugador-list.component.html',
  styleUrls: ['./jugador-list.component.css']
})
export class JugadorListComponent implements OnInit {

  jugadores: Player[] = [];
  equipos: Team[] = [];  // Para mostrar el nombre del equipo
  dataSource = new MatTableDataSource<Player>();
  displayedColumns: string[] = ['nombre', 'posicion', 'edad', 'equipo', 'actions'];
  loading = true;

  constructor(
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,  // Para obtener nombres de equipos
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // CONCEPTO: Cargar datos de dos fuentes (jugadores y equipos)
  // Esto es común cuando hay RELACIONES entre entidades
  loadData(): void {
    // Primero cargamos los equipos para poder mostrar sus nombres
    this.equiposService.getTeams().subscribe({
      next: (equipos: Team[]) => {
        this.equipos = equipos;
        // Luego cargamos los jugadores
        this.loadJugadores();
      },
      error: (error: any) => {
        console.error('Error loading equipos', error);
        this.loading = false;
      }
    });
  }

  loadJugadores(): void {
    this.jugadoresService.getJugadores().subscribe({
      next: (data: Player[]) => {
        this.jugadores = data;
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading jugadores', error);
        this.loading = false;
        this.snackBar.open('Error al cargar jugadores', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // MÉTODO HELPER: Obtener el nombre del equipo por su ID
  // CONCEPTO: Esto es una BÚSQUEDA en un array
  // En un caso real, podrías usar un Map para mejor rendimiento
  getEquipoNombre(idEquipo: number): string {
    const equipo = this.equipos.find(e => e.id === idEquipo);
    return equipo ? equipo.nombre : 'Sin equipo';
  }

  deleteJugador(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Estás seguro de que quieres eliminar este jugador?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.jugadoresService.eliminarJugador(id).subscribe({
          next: () => {
            this.snackBar.open('Jugador eliminado exitosamente', 'Cerrar', { duration: 3000 });
            this.loadJugadores();
          },
          error: (error: any) => {
            console.error('Error deleting jugador', error);
            this.snackBar.open('Error al eliminar jugador', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  createJugador(): void {
    this.router.navigate(['/jugadores/crear']);
  }

  editJugador(id: number): void {
    this.router.navigate(['/jugadores/editar', id]);
  }
}
