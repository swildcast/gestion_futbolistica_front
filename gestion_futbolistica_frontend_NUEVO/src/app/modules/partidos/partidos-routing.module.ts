import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartidoListComponent } from './components/partido-list/partido-list.component';
import { PartidoFormComponent } from './components/partido-form/partido-form.component';

const routes: Routes = [
  {
    path: '',
    component: PartidoListComponent
  },
  {
    path: 'crear',
    component: PartidoFormComponent
  },
  {
    path: 'editar/:id',
    component: PartidoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartidosRoutingModule { }
