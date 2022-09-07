import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MenuMapaComponent } from './components/menu-mapa/menu-mapa.component';
import { ArbolComponent } from './components/arbol/arbol.component';
import { MujeresComponent } from './components/mujeres/mujeres.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalContentidoComponent } from './components/modal-contentido/modal-contentido.component';

@NgModule({
  declarations: [MenuMapaComponent, ArbolComponent, MujeresComponent, ModalContentidoComponent],
  imports: [CommonModule, MapasRoutingModule, SharedModule],
})
export class MapasModule {}
