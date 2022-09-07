import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './core/index/components/inicio/inicio.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    data: {
      role: 'admin',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'mapas',
    loadChildren: () =>
      import('./features/mapas/mapas.module').then((m) => m.MapasModule),
    data: {
      role: 'estudiante',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'invitados',
    loadChildren: () =>
      import('./features/mapas/mapas.module').then((m) => m.MapasModule),
    data: {
      role: 'invitado',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
