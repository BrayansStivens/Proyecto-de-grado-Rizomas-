import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GruposService } from 'src/app/features/admin/services/grupos.service';
import { AlumnosService } from '../../../admin/services/alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { SeguimientoModalComponent } from '../seguimiento-modal/seguimiento-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  PaginationType,
  SelectionStrategy,
  CellType,
} from 'src/app/shared/components/table/interface/table';

@Component({
  selector: 'rizo-administrador-alumnos',
  templateUrl: './administrador-alumnos.component.html',
  styleUrls: ['./administrador-alumnos.component.scss'],
})
export class AdministradorAlumnosComponent implements OnInit {
  loader!: boolean;
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE;
  form!: FormGroup;

  grupos!: Array<any>;
  alumnos!: Array<any>;

  columnHeader = {
    nombre: { label: 'Nombre' },
    primerApellido: { label: 'Primer Apellido' },
    segundoApellido: { label: 'Segundo Apellido' },
    identificacion: { label: 'Documento' },

    action: { label: 'Acciones', type: CellType.ACTIONS },
  };
  constructor(
    private gruposService: GruposService,
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllGroups();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      grupoid: ['', Validators.required],
    });
  }

  getAllGroups(): void {
    this.gruposService.getAllGroups().subscribe((response: any) => {
      this.grupos = response;
    });
  }

  getPupilsByGroup(): void {
    this.loader = true;
    if (this.form.valid) {
      this.gruposService
        .getPupilbyGroup(this.form.get('grupoid')?.value)
        .subscribe((response: any) => {
          this.dataSourse.data = response;
          this.dataSourse.data.forEach((element: any) => {
            element.action = [{ name: 'remove_red_eye' }];
          });
          this.loader = false;
        });
    } else {
      this.form.markAllAsTouched();
      this.loader = false;
    }
  }

  openSeguimiento(data: any): void {
    this.dialog.open(SeguimientoModalComponent, {
      disableClose: true,
      data: { estudiante: data },
    });
  }

  actionEvent(event: any): void {
    this.openSeguimiento(event.row);
  }

  limpiar() {
    this.form.reset();
    this.dataSourse.data = [];
  }
}
