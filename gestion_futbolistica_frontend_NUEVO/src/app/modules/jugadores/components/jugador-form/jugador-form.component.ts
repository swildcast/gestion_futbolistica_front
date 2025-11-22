// ============================================================================
// COMPONENTE - FORMULARIO DE JUGADORES
// ============================================================================
// CONCEPTO ADICIONAL: Dropdown para seleccionar el equipo (Foreign Key)
// ============================================================================

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JugadoresService } from '../../services/jugadores.service';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { Player, Team } from '../../../../core/interfaces/models';

@Component({
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html',
  styleUrls: ['./jugador-form.component.css']
})
export class JugadorFormComponent implements OnInit {

  jugadorForm!: FormGroup;
  isEditMode = false;
  jugadorId: number | null = null;
  isSubmitting = false;

  // Lista de equipos para el dropdown
  equipos: Team[] = [];

  // Lista de posiciones comunes en fútbol
  // CONCEPTO: Datos estáticos para un dropdown
  posiciones: string[] = [
    'Portero',
    'Defensa Central',
    'Lateral Derecho',
    'Lateral Izquierdo',
    'Pivote',
    'Mediocentro',
    'Mediapunta',
    'Extremo Derecho',
    'Extremo Izquierdo',
    'Delantero Centro'
  ];

  constructor(
    private fb: FormBuilder,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadEquipos();  // Cargar equipos para el dropdown
    this.checkEditMode();
  }

  initForm(): void {
    this.jugadorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      posicion: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(16), Validators.max(45)]],
      idEquipo: ['', [Validators.required]]  // Foreign Key
    });
  }

  // Cargar la lista de equipos para el dropdown
  loadEquipos(): void {
    this.equiposService.getTeams().subscribe({
      next: (equipos: Team[]) => {
        this.equipos = equipos;
      },
      error: (error: any) => {
        console.error('Error loading equipos', error);
        this.snackBar.open('Error al cargar equipos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.jugadorId = +params['id'];
        this.loadJugador(this.jugadorId);
      }
    });
  }

  loadJugador(id: number): void {
    this.jugadoresService.getJugador(id).subscribe({
      next: (jugador: Player) => {
        this.jugadorForm.patchValue({
          nombre: jugador.nombre,
          posicion: jugador.posicion,
          edad: jugador.edad,
          idEquipo: jugador.idEquipo
        });
      },
      error: (error: any) => {
        console.error('Error loading jugador', error);
        this.snackBar.open('Error al cargar el jugador', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/jugadores']);
      }
    });
  }

  onSubmit(): void {
    if (this.jugadorForm.invalid) {
      this.jugadorForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const jugadorData: Player = {
      id: this.jugadorId || 0,
      ...this.jugadorForm.value
    };

    if (this.isEditMode && this.jugadorId) {
      this.jugadoresService.actualizarJugador(this.jugadorId, jugadorData).subscribe({
        next: () => {
          this.snackBar.open('Jugador actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/jugadores']);
        },
        error: (error: any) => {
          console.error('Error updating jugador', error);
          this.snackBar.open('Error al actualizar el jugador', 'Cerrar', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    } else {
      this.jugadoresService.crearJugador(jugadorData).subscribe({
        next: () => {
          this.snackBar.open('Jugador creado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/jugadores']);
        },
        error: (error: any) => {
          console.error('Error creating jugador', error);
          this.snackBar.open('Error al crear el jugador', 'Cerrar', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/jugadores']);
  }

  hasError(field: string, error: string): boolean {
    const control = this.jugadorForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.jugadorForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    if (control.hasError('max')) {
      return `El valor máximo es ${control.errors?.['max'].max}`;
    }
    return '';
  }
}
