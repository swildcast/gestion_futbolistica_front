import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { JugadoresRoutingModule } from './jugadores-routing.module';
import { JugadorListComponent } from './components/jugador-list/jugador-list.component';
import { JugadorFormComponent } from './components/jugador-form/jugador-form.component';

@NgModule({
  declarations: [
    JugadorListComponent,
    JugadorFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JugadoresRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  // Para dropdowns
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule
  ]
})
export class JugadoresModule { }
