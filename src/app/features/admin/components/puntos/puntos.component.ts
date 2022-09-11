import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  PaginationType,
  SelectionStrategy,
  CellType,
} from 'src/app/shared/components/table/interface/table';
import { PuntosService } from '../../services/puntos.service';
import { AlertsService } from '../../../../shared/services/alert.service';
import { DoubleData } from '../../../../shared/components/table/interface/table';

@Component({
  selector: 'rizo-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.scss'],
})
export class PuntosComponent implements OnInit {
  loader!: boolean;
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE;
  form!: FormGroup;
  maps!: Array<any>;
  file!: any;
  id!: string;
  urlDownload!: string;
  messageFileError: string = '';

  columnHeader = {
    nombre: { label: 'Nombre' },
    titulo: { label: 'Titulo' },
    mapa: { label: 'Mapa' },
    archivo: { label: 'Imagen', type: CellType.IMAGES },
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };

  constructor(
    private formBuilder: FormBuilder,
    private puntosService: PuntosService,
    private alertService: AlertsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getMaps();
    this.fillTable();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      file: ['', [Validators.required, Validators.pattern('^.*.(.png)$')]],
      mapaId: ['', Validators.required],
    });
  }

  getMaps(): void {
    this.puntosService.getAllMaps().subscribe((response) => {
      this.maps = response;
    });
  }

  captureFile(event: any): void {
    const [file] = event.target.files;

    this.file = {
      fileRaw: file,
      fileName: file.name,
    };
    this.errorFile();
  }

  /* createPoint(): void {
    if (this.form.valid) {
      this.loader = true;
      const { nombre, titulo, descripcion, mapaId } = this.form.value;
      const fileForm = new FormData();
      fileForm.append('Nombre', nombre);
      fileForm.append('Titulo', titulo);
      fileForm.append('Descripcion', descripcion);
      fileForm.append('Archivo', this.file.fileRaw, this.file.fileName);
      fileForm.append('MapaId', mapaId);

      this.puntosService.createPonit(fileForm).subscribe(
        () => {
          this.loader = false;
          this.alertService.mensajeCorrecto(
            'Registro exitoso',
            'Punto creado con exito 😇'
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
 */

  updatePoint(): void {
    if (this.form.valid) {
      this.loader = true;
      const { nombre, titulo, descripcion, mapaId } = this.form.value;
      const fileForm = new FormData();
      fileForm.append('Nombre', nombre);
      fileForm.append('Titulo', titulo);
      fileForm.append('Descripcion', descripcion);
      fileForm.append('Archivo', this.file.fileRaw, this.file.fileName);
      fileForm.append('MapaId', mapaId);

      this.puntosService.updatePonit(fileForm, this.id).subscribe(
        () => {
          this.loader = false;
          this.alertService.mensajeCorrecto(
            'Registro exitoso',
            'Punto actualizado con exito 😇'
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

  fillTable(): void {
    this.puntosService.getAllPonits().subscribe((response) => {
      this.dataSourse.data = response;
      this.dataSourse.data.forEach((element) => {
        element.archivo = {
          url: element.archivo,
        };
        element.action = [{ name: 'create' }];
        this.puntosService.getMap(element.id).subscribe((response) => {
          element.mapa = response.nombre;
        });
      });
    });
  }

  actionEvent(event: any): void {
    if (event.action === 'create') {
      this.id = event.row.id;
      this.urlDownload = event.row.archivo.url;
      console.log(this.urlDownload);
      this.form.patchValue(event.row);
    }
  }

  downloadImage(event: any) {
    this.puntosService.downloadImage(this.urlDownload).subscribe(
      (blob: any) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'image.png';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (e: any) => console.log(e)
    );
  }

  errorFile() {
    const file = this.form.get('file');
    if (file?.hasError('pattern') && !file?.hasError('required')) {
      this.messageFileError = 'Sólo archivos PNG';
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
