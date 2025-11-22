// ============================================================================
// ROUTING MODULE - EQUIPOS
// ============================================================================
// Define las RUTAS (URLs) para el módulo de Equipos
//
// PREGUNTA COMÚN: ¿Qué es el enrutamiento en Angular?
// RESPUESTA: Es el sistema que mapea URLs a componentes.
//            Ejemplo: /equipos → EquipoListComponent
//                     /equipos/crear → EquipoFormComponent
// ============================================================================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoListComponent } from './components/equipo-list/equipo-list.component';
import { EquipoFormComponent } from './components/equipo-form/equipo-form.component';

// Array de rutas
// CONCEPTO: Cada ruta tiene un 'path' (URL) y un 'component' (qué mostrar)
const routes: Routes = [
  {
    path: '',                    // Ruta vacía: /equipos
    component: EquipoListComponent
  },
  {
    path: 'crear',               // /equipos/crear
    component: EquipoFormComponent
  },
  {
    path: 'editar/:id',          // /equipos/editar/5 (el :id es un parámetro)
    component: EquipoFormComponent
  }
];

@NgModule({
  // RouterModule.forChild() se usa en módulos de funcionalidad (no en AppModule)
  // PREGUNTA COMÚN: ¿forRoot() vs forChild()?
  // RESPUESTA: forRoot() se usa UNA VEZ en AppModule
  //            forChild() se usa en módulos de funcionalidad (lazy loaded)
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
