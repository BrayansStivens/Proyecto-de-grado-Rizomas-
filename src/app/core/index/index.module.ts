import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlantaComponent } from './components/planta/planta.component';
import { AudioModalComponent } from './modals/audio-modal/audio-modal.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { CreditosComponent } from './modals/creditos/creditos.component';

@NgModule({
  declarations: [
    InicioComponent,
    LoginModalComponent,
    LogoComponent,
    PlantaComponent,
    AudioModalComponent,
    NotFoundComponent,
    CreditosComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class IndexModule {}
