import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
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
  ],
  imports: [CommonModule, SharedRoutingModule, MaterialModule],
  exports: [
    MaterialModule,
    HttpClientModule,
    NavbarComponent,
    LoaderComponent,
    TableComponent,
  ],
})
export class SharedModule {}
