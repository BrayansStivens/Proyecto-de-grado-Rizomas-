import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ActionsComponent } from './components/table/cell-types/actions/actions.component';
import { DoubleDateComponent } from './components/table/cell-types/double-date/double-date.component';
import { IconTextComponent } from './components/table/cell-types/icon-text/icon-text.component';
import { ImagesComponent } from './components/table/cell-types/images/images.component';
import { LinkComponent } from './components/table/cell-types/link/link.component';
import { StarRateComponent } from './components/table/cell-types/star-rate/star-rate.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SafePipe } from '../safe.pipe';
import { ModalEncuestaComponent } from './components/modal-encuesta/modal-encuesta.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoaderComponent,
    TableComponent,
    ActionsComponent,
    DoubleDateComponent,
    IconTextComponent,
    ImagesComponent,
    LinkComponent,
    StarRateComponent,
    NotFoundComponent,
    ModalEncuestaComponent,
    StarRatingComponent,
    SafePipe,
  ],
  imports: [CommonModule, SharedRoutingModule, MaterialModule, DragDropModule],
  exports: [
    MaterialModule,
    HttpClientModule,
    DragDropModule,
    NavbarComponent,
    LoaderComponent,
    TableComponent,
    ModalEncuestaComponent,
    StarRatingComponent,
    SafePipe,
  ],
})
export class SharedModule {}
