import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rizo-modal-contentido',
  templateUrl: './modal-contentido.component.html',
  styleUrls: ['./modal-contentido.component.scss'],
})
export class ModalContentidoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      punto: any;
      contenidos: Array<any>;
    }
  ) {}

  ngOnInit(): void {
    this.data.punto.descripcion = this.data.punto.descripcion
      .split('\n')
      .join('<br />')
      .replace('\n', ' ');
  }
}
