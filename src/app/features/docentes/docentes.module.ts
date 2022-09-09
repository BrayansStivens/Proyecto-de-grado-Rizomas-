import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocentesRoutingModule } from './docentes-routing.module';
import { MenuDocentesComponent } from './components/menu-docentes/menu-docentes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministradorAlumnosComponent } from './components/administrador-alumnos/administrador-alumnos.component';

@NgModule({
  declarations: [MenuDocentesComponent, AdministradorAlumnosComponent],
  imports: [CommonModule, DocentesRoutingModule, SharedModule],
})
export class DocentesModule {}
