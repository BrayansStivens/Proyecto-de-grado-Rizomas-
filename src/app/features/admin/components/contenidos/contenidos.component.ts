import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TYPE_FILE, VISIBILIY, STATE } from './drop-downs';
import { PuntosService } from '../../services/puntos.service';
import { MatTableDataSource } from '@angular/material/table';
import { ContenidosService } from '../../../mapas/services/contenidos.service';
import { AlertsService } from '../../../../shared/services/alert.service';
import {
  PaginationType,
  SelectionStrategy,
  CellType,
} from 'src/app/shared/components/table/interface/table';
import * as moment from 'moment';

@Component({
  selector: 'rizo-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.scss'],
})
export class ContenidosComponent implements OnInit {
  loader!: boolean;
  form!: FormGroup;
  file!: any;
  id!: string;
  urlDownload!: string;
  messageFileError: string = '';
  aceptFile!: string;
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE;
  states: Array<any> = STATE;
  types: Array<any> = TYPE_FILE;
  visibilities: Array<any> = VISIBILIY;
  maps!: Array<any>;
  points!: Array<any>;

  columnHeader = {
    creado: { label: 'Fecha creación' },
    titulo: { label: 'Titulo' },
    estado: { label: 'Estado' },
    autor: { label: 'Autor' },
    esPrivado: { label: 'Visiblilidad' },
    tipo: { label: 'Tipo' },
    punto: { label: 'Punto' },
    mapa: { label: 'Mapa' },
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };

  constructor(
    private formBuilder: FormBuilder,
    private puntosService: PuntosService,
    private contenidosService: ContenidosService,
    private alertsService: AlertsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getMaps();
    this.fillTable();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      creado: ['', Validators.required],
      titulo: ['', Validators.required],
      estado: ['', Validators.required],
      autor: ['', Validators.required],
      esPrivado: ['', Validators.required],
      file: [
        '',
        [
          Validators.required,
          Validators.pattern('^.*.(.pdf|.PDF|.mp3|.MP3|.mp4|.MP4)$'),
        ],
      ],
      tipo: ['', Validators.required],
      puntoId: ['', Validators.required],
      mapaId: ['', Validators.required],
    });
  }

  getMaps(): void {
    this.puntosService.getAllMaps().subscribe((response) => {
      this.maps = response;
    });
  }

  getPoints(event: any): void {
    this.puntosService.getPonits(event).subscribe((response) => {
      this.points = response;
    });
  }

  fillTable(): void {
    this.contenidosService.getAllContents().subscribe((response) => {
      this.dataSourse.data = response;
      this.dataSourse.data.forEach((element) => {
        element.action = [{ name: 'create' }, { name: 'delete' }];
        element.creado = element.creado.slice(0, -9);
        this.puntosService.getPoint(element.puntoId).subscribe((response) => {
          element.punto = response[0].nombre;
        });
        this.puntosService.getMap(element.mapaId).subscribe((response) => {
          element.mapa = response.nombre;
        });
      });
    });
  }

  typeFile(event: string) {
    if (event === 'texto') {
      this.aceptFile = '.pdf';
    } else if (event === 'video') {
      this.aceptFile = '.mp4';
    } else if (event === 'audio') {
      this.aceptFile = '.mp3';
    }
  }

  captureFile(event: any): void {
    const [file] = event.target.files;

    this.file = {
      fileRaw: file,
      fileName: file.name,
    };
    this.errorFile();
  }

  createContent(): void {
    if (this.form.valid) {
      this.loader = true;
      const {
        creado,
        titulo,
        estado,
        autor,
        esPrivado,
        tipo,
        puntoId,
        mapaId,
      } = this.form.value;
      const fileForm = new FormData();
      fileForm.append('Creado', creado && moment(creado).format('DD-MM-YYYY'));
      fileForm.append('Titulo', titulo);
      fileForm.append('Estado', estado);
      fileForm.append('Autor', autor);
      fileForm.append('EsPrivado', esPrivado);
      fileForm.append('Tipo', tipo);
      fileForm.append('PuntoId', puntoId);
      fileForm.append('MapaId', mapaId);
      fileForm.append('Archivo', this.file.fileRaw, this.file.fileName);

      this.contenidosService.createContent(fileForm).subscribe(
        () => {
          this.loader = false;
          this.alertsService.mensajeCorrecto(
            'Registro exitoso',
            'Contenido creado con exito 😇'
          );
          this.limpiar();
          this.fillTable();
        },
        () => (this.loader = false)
      );
    } else {
      this.errorFile();
      this.form.markAllAsTouched();
    }
  }

  updateContent(): void {
    if (this.form.valid) {
      this.loader = true;
      const {
        creado,
        titulo,
        estado,
        autor,
        esPrivado,
        tipo,
        puntoId,
        mapaId,
      } = this.form.value;
      const fileForm = new FormData();
      fileForm.append('Creado', creado && moment(creado).format('DD-MM-YYYY'));
      fileForm.append('Titulo', titulo);
      fileForm.append('Estado', estado);
      fileForm.append('Autor', autor);
      fileForm.append('EsPrivado', esPrivado);
      fileForm.append('Tipo', tipo);
      fileForm.append('PuntoId', puntoId);
      fileForm.append('MapaId', mapaId);
      fileForm.append('Archivo', this.file.fileRaw, this.file.fileName);

      this.contenidosService.updateContent(fileForm, this.id).subscribe(
        () => {
          this.loader = false;
          this.alertsService.mensajeCorrecto(
            'Registro exitoso',
            'Contenido actualizado con exito 😇'
          );
          this.limpiar();
          this.fillTable();
        },
        () => (this.loader = false)
      );
    } else {
      this.errorFile();
      this.form.markAllAsTouched();
    }
  }

  deleteContent(): void {
    this.loader = true;
    this.alertsService
      .confirmDialog(
        'Eliminar contenido',
        `¿Realmente desea eliminar el contenido?`,
        'SI, DESEO ELIMINAR'
      )
      .then((response) => {
        if (response.isConfirmed) {
          this.contenidosService.deleteContent(this.id).subscribe(
            () => {
              this.loader = false;
              this.alertsService.mensajeCorrecto(
                'Contenido eliminado',
                `El contenido se elimino con exito`
              );
              this.id = '';
              this.fillTable();
            },
            (error: any) => {
              this.loader = false;
              this.alertsService.mensajeError(
                'Eliminación fallida',
                `Contenido no eliminado, error: ${{ error }}`
              );
            }
          );
        }
      })
      .catch(() => (this.loader = false));
  }

  actionEvent(event: any) {
    this.id = event.row.id;
    if (event.action === 'create') {
      this.getPoints(event.row.mapaId);
      this.form.patchValue(event.row);
    } else if (event.action === 'delete') {
      this.deleteContent();
    }
  }

  errorFile() {
    const file = this.form.get('file');
    if (file?.hasError('pattern') && !file?.hasError('required')) {
      this.messageFileError = 'PDF, MP3, MP4';
    } else if (file?.hasError('required')) {
      this.messageFileError = 'Campo requerido';
    } else {
      this.messageFileError = '';
    }
  }

  deleteFile(): void {
    this.file = null;
    this.form.get('file')?.reset();
    this.messageFileError = '';
  }

  limpiar(): void {
    this.form.reset();
    this.file = null;
    this.messageFileError = '';
    this.id = '';
  }
}
