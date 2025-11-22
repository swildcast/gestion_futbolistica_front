// ============================================================================
// COMPONENTE - DIÁLOGO DE CONFIRMACIÓN
// ============================================================================
// Este es un componente REUTILIZABLE para confirmaciones
//
// PREGUNTA COMÚN: ¿Qué es MAT_DIALOG_DATA?
// RESPUESTA: Es un token de inyección que permite pasar datos al diálogo
//            desde el componente que lo abre.
// ============================================================================

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Interface para los datos que recibe el diálogo
export interface DialogData {
  message: string;  // El mensaje a mostrar
  title?: string;   // Título opcional
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  // @Inject(MAT_DIALOG_DATA) inyecta los datos pasados al diálogo
  // MatDialogRef permite controlar el diálogo (cerrarlo, devolver valores)
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  // Cerrar el diálogo devolviendo 'false' (usuario canceló)
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Cerrar el diálogo devolviendo 'true' (usuario confirmó)
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
