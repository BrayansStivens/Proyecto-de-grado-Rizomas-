import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './core/index/components/inicio/inicio.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

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
    path: 'docente',
    loadChildren: () =>
      import('./features/docentes/docentes.module').then(
        (m) => m.DocentesModule
      ),
    data: {
      role: 'docente',
    },
  },
  {
    path: 'invitados',
    loadChildren: () =>
      import('./features/mapas/mapas.module').then((m) => m.MapasModule),
    data: {
      role: 'invitado',
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
