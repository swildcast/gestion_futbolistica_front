// ============================================================================
// APP ROUTING MODULE - RUTAS PRINCIPALES
// ============================================================================
// Define las rutas principales de la aplicación y el LAZY LOADING de módulos
//
// PREGUNTA COMÚN: ¿Qué es loadChildren?
// RESPUESTA: Es la sintaxis para LAZY LOADING. El módulo solo se carga
//            cuando el usuario navega a esa ruta, no al inicio.
// ============================================================================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/equipos',
        pathMatch: 'full'
    },
    {
        path: 'equipos',
        // LAZY LOADING: El módulo se carga solo cuando se accede a /equipos
        // CONCEPTO: import() es una función dinámica de ES6
        loadChildren: () => import('./modules/equipos/equipos.module').then(m => m.EquiposModule)
    },
    {
        path: 'jugadores',
        loadChildren: () => import('./modules/jugadores/jugadores.module').then(m => m.JugadoresModule)
    },
    {
        path: 'partidos',
        loadChildren: () => import('./modules/partidos/partidos.module').then(m => m.PartidosModule)
    },
    {
        path: '**',
        redirectTo: '/equipos'
    }
];

@NgModule({
    // forRoot() se usa UNA VEZ en el módulo raíz (AppModule)
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
