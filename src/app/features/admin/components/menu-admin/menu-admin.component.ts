import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  PaginationType,
  CellType,
} from 'src/app/shared/components/table/interface/table';

@Component({
  selector: 'rizo-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
})
export class MenuAdminComponent implements OnInit {
  @Output() ventana: EventEmitter<string> = new EventEmitter<string>();

  textBtnLogOut!: string;

  constructor() {}

  ngOnInit(): void {}

  tabChange(event: any) {
    this.ventana.emit(event.tab.textLabel);
  }
}
