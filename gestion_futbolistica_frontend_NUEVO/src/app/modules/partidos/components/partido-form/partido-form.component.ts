// ============================================================================
// COMPONENTE - FORMULARIO DE PARTIDOS
// ============================================================================
// CONCEPTO ADICIONAL: Dos dropdowns para seleccionar equipos (2 Foreign Keys)
//                     Campo de fecha con mat-datepicker
// ============================================================================

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartidosService } from '../../services/partidos.service';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { Match, Team } from '../../../../core/interfaces/models';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styleUrls: ['./partido-form.component.css']
})
export class PartidoFormComponent implements OnInit {

  partidoForm!: FormGroup;
  isEditMode = false;
  partidoId: number | null = null;
  isSubmitting = false;
  equipos: Team[] = [];

  constructor(
    private fb: FormBuilder,
    private partidosService: PartidosService,
    private equiposService: EquiposService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadEquipos();
    this.checkEditMode();
  }

  initForm(): void {
    this.partidoForm = this.fb.group({
      equipoLocalId: ['', [Validators.required]],
      equipoVisitanteId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      resultado: [''],  // Opcional
      estadio: ['', [Validators.required]]
    });
  }

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
        this.partidoId = +params['id'];
        this.loadPartido(this.partidoId);
      }
    });
  }

  loadPartido(id: number): void {
    this.partidosService.getPartido(id).subscribe({
      next: (partido: Match) => {
        this.partidoForm.patchValue({
          equipoLocalId: partido.equipoLocalId,
          equipoVisitanteId: partido.equipoVisitanteId,
          fecha: partido.fecha,
          resultado: partido.resultado,
          estadio: partido.estadio
        });
      },
      error: (error: any) => {
        console.error('Error loading partido', error);
        this.snackBar.open('Error al cargar el partido', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/partidos']);
      }
    });
  }

  onSubmit(): void {
    if (this.partidoForm.invalid) {
      this.partidoForm.markAllAsTouched();
      return;
    }

    // VALIDACIÓN PERSONALIZADA: Los equipos no pueden ser iguales
    const local = this.partidoForm.value.equipoLocalId;
    const visitante = this.partidoForm.value.equipoVisitanteId;

    if (local === visitante) {
      this.snackBar.open('Los equipos local y visitante deben ser diferentes', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.isSubmitting = true;

    const partidoData: Match = {
      id: this.partidoId || 0,
      ...this.partidoForm.value
    };

    if (this.isEditMode && this.partidoId) {
      this.partidosService.actualizarPartido(this.partidoId, partidoData).subscribe({
        next: () => {
          this.snackBar.open('Partido actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/partidos']);
        },
        error: (error: any) => {
          console.error('Error updating partido', error);
          this.snackBar.open('Error al actualizar el partido', 'Cerrar', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    } else {
      this.partidosService.crearPartido(partidoData).subscribe({
        next: () => {
          this.snackBar.open('Partido creado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/partidos']);
        },
        error: (error: any) => {
          console.error('Error creating partido', error);
          this.snackBar.open('Error al crear el partido', 'Cerrar', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/partidos']);
  }

  hasError(field: string, error: string): boolean {
    const control = this.partidoForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.partidoForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
}
