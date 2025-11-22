// ============================================================================
// COMPONENTE - FORMULARIO DE EQUIPOS (Crear/Editar)
// ============================================================================
// Este componente usa REACTIVE FORMS (Formularios Reactivos)
//
// PREGUNTA COMÚN: ¿Qué son los Reactive Forms?
// RESPUESTA: Es un enfoque para manejar formularios en Angular donde:
//            - La lógica del formulario está en el TypeScript (no en el HTML)
//            - Usamos FormGroup y FormControl para definir la estructura
//            - Tenemos control total sobre validaciones y valores
//
// PREGUNTA COMÚN: ¿Reactive Forms vs Template-Driven Forms?
// RESPUESTA: 
//   - Reactive Forms: Lógica en TS, más control, mejor para forms complejos
//   - Template-Driven: Lógica en HTML con ngModel, más simple, para forms básicos
// ============================================================================

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquiposService } from '../../services/equipos.service';
import { Team } from '../../../../core/interfaces/models';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.component.html',
  styleUrls: ['./equipo-form.component.css']
})
export class EquipoFormComponent implements OnInit {

  // ========== PROPIEDADES ==========

  // FormGroup representa TODO el formulario
  // CONCEPTO: Es como un contenedor que agrupa todos los campos (FormControls)
  equipoForm!: FormGroup;

  // Indica si estamos EDITANDO (true) o CREANDO (false)
  isEditMode = false;

  // ID del equipo (solo en modo edición)
  equipoId: number | null = null;

  // Indica si se está enviando el formulario (para deshabilitar botón)
  isSubmitting = false;

  // ========== CONSTRUCTOR ==========
  constructor(
    private fb: FormBuilder,           // Para construir el formulario
    private equiposService: EquiposService,
    private router: Router,
    private route: ActivatedRoute,     // Para obtener parámetros de la URL
    private snackBar: MatSnackBar
  ) { }

  // ========== ngOnInit ==========
  ngOnInit(): void {
    this.initForm();      // Inicializar el formulario
    this.checkEditMode(); // Verificar si estamos en modo edición
  }

  // ========== INICIALIZAR FORMULARIO ==========
  // CONCEPTO: Definimos la estructura del formulario con FormBuilder
  initForm(): void {
    // fb.group() crea un FormGroup con FormControls
    // SINTAXIS: 'nombreCampo': [valorInicial, [validadores]]
    this.equipoForm = this.fb.group({
      // Validators.required: El campo es OBLIGATORIO
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      ciudad: ['', [Validators.required]],
      estadio: ['', [Validators.required]],
      // Validators.min(1800): El año debe ser >= 1800
      anioFundacion: ['', [Validators.required, Validators.min(1800), Validators.max(2024)]]
    });
  }

  // ========== VERIFICAR MODO EDICIÓN ==========
  // CONCEPTO: Leemos el parámetro 'id' de la URL
  // Ejemplo URL: /equipos/editar/5 → id = 5
  checkEditMode(): void {
    // route.params es un Observable que emite los parámetros de la URL
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.equipoId = +params['id'];  // El + convierte string a number
        this.loadEquipo(this.equipoId);
      }
    });
  }

  // ========== CARGAR DATOS DEL EQUIPO (Modo Edición) ==========
  loadEquipo(id: number): void {
    this.equiposService.getTeam(id).subscribe({
      next: (equipo: Team) => {
        // patchValue() rellena el formulario con los datos del equipo
        // CONCEPTO: Actualiza los valores de los FormControls
        this.equipoForm.patchValue({
          nombre: equipo.nombre,
          ciudad: equipo.ciudad,
          estadio: equipo.estadio,
          anioFundacion: equipo.anioFundacion
        });
      },
      error: (error: any) => {
        console.error('Error loading equipo', error);
        this.snackBar.open('Error al cargar el equipo', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/equipos']);
      }
    });
  }

  // ========== ENVIAR FORMULARIO ==========
  // CONCEPTO: Este método se ejecuta cuando el usuario hace submit
  onSubmit(): void {
    // Verificar si el formulario es VÁLIDO
    // PREGUNTA COMÚN: ¿Qué significa "formulario válido"?
    // RESPUESTA: Que todos los campos cumplen con sus validadores
    //            (required, minLength, min, max, etc.)
    if (this.equipoForm.invalid) {
      // markAllAsTouched() marca todos los campos como "tocados"
      // Esto hace que se muestren los mensajes de error
      this.equipoForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Obtenemos los valores del formulario
    // CONCEPTO: this.equipoForm.value es un objeto con todos los valores
    const equipoData: Team = {
      id: this.equipoId || 0,  // 0 para crear, ID real para editar
      ...this.equipoForm.value // Spread operator: copia todas las propiedades
    };

    // Decidimos si crear o actualizar según el modo
    if (this.isEditMode && this.equipoId) {
      // MODO EDICIÓN: Llamamos a updateTeam()
      this.equiposService.updateTeam(this.equipoId, equipoData).subscribe({
        next: () => {
          this.snackBar.open('Equipo actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/equipos']);
        },
        error: (error: any) => {
          console.error('Error updating equipo', error);
          this.snackBar.open('Error al actualizar el equipo', 'Cerrar', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    } else {
      // MODO CREACIÓN: Llamamos a createTeam()
      this.equiposService.createTeam(equipoData).subscribe({
        next: () => {
          this.snackBar.open('Equipo creado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/equipos']);
        },
        error: (error: any) => {
          console.error('Error creating equipo', error);
          this.snackBar.open('Error al crear el equipo', 'Cerrar', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    }
  }

  // ========== CANCELAR Y VOLVER ==========
  cancel(): void {
    this.router.navigate(['/equipos']);
  }

  // ========== HELPERS PARA VALIDACIÓN EN EL HTML ==========
  // CONCEPTO: Estos métodos facilitan mostrar mensajes de error en el HTML

  // Verifica si un campo tiene un error específico
  hasError(field: string, error: string): boolean {
    const control = this.equipoForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }

  // Obtiene el mensaje de error para un campo
  getErrorMessage(field: string): string {
    const control = this.equipoForm.get(field);
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

// ============================================================================
// CONCEPTOS CLAVE CUBIERTOS:
// ============================================================================
// 1. Reactive Forms (FormGroup, FormControl, FormBuilder)
// 2. Validadores (Validators.required, min, max, minLength)
// 3. patchValue() para rellenar formularios
// 4. Parámetros de ruta (ActivatedRoute)
// 5. Modo Crear vs Editar en un mismo componente
// 6. Manejo de estado del formulario (valid, invalid, touched)
// 7. Mensajes de error personalizados
// 8. Spread operator (...) en TypeScript
// ============================================================================
