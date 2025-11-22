// ============================================================================
// COMPONENTE - LISTA DE PARTIDOS
// ============================================================================
// CONCEPTO ADICIONAL: Mostrar datos de MÚLTIPLES relaciones (2 equipos)
// ============================================================================

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PartidosService } from '../../services/partidos.service';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { Match, Team } from '../../../../core/interfaces/models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-partido-list',
  templateUrl: './partido-list.component.html',
  styleUrls: ['./partido-list.component.css']
})
export class PartidoListComponent implements OnInit {

  partidos: Match[] = [];
  equipos: Team[] = [];
  dataSource = new MatTableDataSource<Match>();
  displayedColumns: string[] = ['equipoLocal', 'equipoVisitante', 'fecha', 'resultado', 'estadio', 'actions'];
  loading = true;

  constructor(
    private partidosService: PartidosService,
    private equiposService: EquiposService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.equiposService.getTeams().subscribe({
      next: (equipos: Team[]) => {
        this.equipos = equipos;
        this.loadPartidos();
      },
      error: (error: any) => {
        console.error('Error loading equipos', error);
        this.loading = false;
      }
    });
  }

  loadPartidos(): void {
    this.partidosService.getPartidos().subscribe({
      next: (data: Match[]) => {
        this.partidos = data;
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading partidos', error);
        this.loading = false;
        this.snackBar.open('Error al cargar partidos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // CONCEPTO: Buscar el nombre del equipo por ID
  getEquipoNombre(idEquipo: number): string {
    const equipo = this.equipos.find(e => e.id === idEquipo);
    return equipo ? equipo.nombre : 'Desconocido';
  }

  // CONCEPTO: Formatear fecha para mostrar
  // En un caso real, podrías usar DatePipe o una librería como date-fns
  formatFecha(fecha: Date): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  deletePartido(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Estás seguro de que quieres eliminar este partido?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.partidosService.eliminarPartido(id).subscribe({
          next: () => {
            this.snackBar.open('Partido eliminado exitosamente', 'Cerrar', { duration: 3000 });
            this.loadPartidos();
          },
          error: (error: any) => {
            console.error('Error deleting partido', error);
            this.snackBar.open('Error al eliminar partido', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  createPartido(): void {
    this.router.navigate(['/partidos/crear']);
  }

  editPartido(id: number): void {
    this.router.navigate(['/partidos/editar', id]);
  }
}
