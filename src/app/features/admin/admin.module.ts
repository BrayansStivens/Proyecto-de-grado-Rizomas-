import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { PuntosComponent } from './components/puntos/puntos.component';
import { ContenidosComponent } from './components/contenidos/contenidos.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    UsuariosComponent,
    GruposComponent,
    MenuAdminComponent,
    PuntosComponent,
    ContenidosComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [MenuAdminComponent],
})
export class AdminModule {}
