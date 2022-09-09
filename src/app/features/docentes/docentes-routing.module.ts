import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDocentesComponent } from './components/menu-docentes/menu-docentes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'menu', component: MenuDocentesComponent },
      {
        path: '**',
        redirectTo: 'menu',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocentesRoutingModule {}
