import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadorListComponent } from './components/jugador-list/jugador-list.component';
import { JugadorFormComponent } from './components/jugador-form/jugador-form.component';

const routes: Routes = [
  {
    path: '',
    component: JugadorListComponent
  },
  {
    path: 'crear',
    component: JugadorFormComponent
  },
  {
    path: 'editar/:id',
    component: JugadorFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadoresRoutingModule { }
