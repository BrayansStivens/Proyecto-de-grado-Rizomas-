import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuMapaComponent } from './components/menu-mapa/menu-mapa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'menu/:id', component: MenuMapaComponent },
      { path: 'menu', component: MenuMapaComponent },
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
export class MapasRoutingModule {}
