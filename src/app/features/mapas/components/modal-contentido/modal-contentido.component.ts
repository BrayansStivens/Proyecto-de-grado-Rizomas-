import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rizo-modal-contentido',
  templateUrl: './modal-contentido.component.html',
  styleUrls: ['./modal-contentido.component.scss'],
})
export class ModalContentidoComponent implements OnInit {
  audio: any;
  video: any;
  texto: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      punto: any;
      contenidos: Array<any>;
    }
  ) {}

  ngOnInit(): void {
    this.asingContentsActives();
    this.data.punto.descripcion = this.data.punto.descripcion
      .split('\n')
      .join('<br />')
      .replace('\n', ' ');
  }

  asingContentsActives(): void {
    this.data.contenidos.forEach((contenido) => {
      if (contenido.tipo === 'texto' && contenido.estado === 'activo') {
        this.texto = contenido;
      }
      if (contenido.tipo === 'video' && contenido.estado === 'activo') {
        this.video = contenido;
      }
      if (contenido.tipo === 'audio' && contenido.estado === 'activo') {
        this.audio = contenido;
      }
    });
  }
}
