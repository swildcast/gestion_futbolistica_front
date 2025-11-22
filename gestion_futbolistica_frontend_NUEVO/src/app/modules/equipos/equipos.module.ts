// ============================================================================
// MÓDULO DE EQUIPOS
// ============================================================================
// Los MÓDULOS en Angular agrupan componentes, servicios y otros módulos relacionados
//
// PREGUNTA COMÚN: ¿Qué es un módulo en Angular?
// RESPUESTA: Es una clase decorada con @NgModule que agrupa funcionalidad relacionada.
//            Ayuda a organizar la aplicación en bloques cohesivos.
//
// PREGUNTA COMÚN: ¿Qué es Lazy Loading?
// RESPUESTA: Es cargar módulos solo cuando se necesitan (no al inicio).
//            Mejora el rendimiento inicial de la aplicación.
// ============================================================================

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquipoListComponent } from './components/equipo-list/equipo-list.component';
import { EquipoFormComponent } from './components/equipo-form/equipo-form.component';

@NgModule({
  // declarations: Componentes, directivas y pipes que pertenecen a este módulo
  declarations: [
    EquipoListComponent,
    EquipoFormComponent
  ],
  // imports: Otros módulos que necesitamos usar
  imports: [
    CommonModule,              // Directivas básicas (*ngIf, *ngFor, etc.)
    ReactiveFormsModule,       // Para Reactive Forms
    EquiposRoutingModule,      // Rutas del módulo
    // Angular Material Modules
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule
  ]
})
export class EquiposModule { }
