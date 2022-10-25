import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalEncuestaComponent } from 'src/app/shared/components/modal-encuesta/modal-encuesta.component';
import { AlumnosService } from '../../../admin/services/alumnos.service';
import { SeguimientoService } from '../../services/seguimiento.service';

@Component({
  selector: 'rizo-modal-contentido',
  templateUrl: './modal-contentido.component.html',
  styleUrls: ['./modal-contentido.component.scss'],
})
export class ModalContentidoComponent implements OnInit {
  audio: any;
  video: any;
  texto: any;
  pupils!: Array<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      punto: any;
      contenidos: Array<any>;
    },
    private alumnosService: AlumnosService,
    private seguimientoService: SeguimientoService,
    private dialog: MatDialog,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.seguimiento();
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

  seguimiento(): void {
    if (this.router.url.includes('id')) {
      this.alumnosService.getAllPupils().subscribe((response: Array<any>) => {
        this.pupils = response;
        this.activateRouter.queryParams.subscribe((params: any) => {
          const identificacion = params['id'] || null;
          const pupil = this.pupils.find(
            (pupil: any) => pupil.identificacion === identificacion
          );
          if (pupil) {
            const payload = { alumnoId: pupil.id, puntoId: this.data.punto.id };
            this.validateSeguimineto(payload);
          }
        });
      });
    }
  }

  validateSeguimineto(payload: any) {
    this.seguimientoService
      .getSeguimientoByPupil(payload.alumnoId)
      .subscribe((response: Array<any>) => {
        const seguimiento = response.find(
          (element: any) => element.punto.id === payload.puntoId
        );
        if (!seguimiento) {
          setTimeout(() => {
            this.seguimientoService.postSeguimiento(payload).subscribe();
          }, 60000);
        }
      });
  }

  openQuest() {
    if (!this.router.url.includes('invitados') && this.data.contenidos.length) {
      this.dialog.open(ModalEncuestaComponent, {
        width: '650px',
        data: {
          contenidos: this.data.contenidos,
        },
      });
    }
  }
}
