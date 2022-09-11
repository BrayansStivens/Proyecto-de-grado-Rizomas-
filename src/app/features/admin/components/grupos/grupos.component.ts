import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  PaginationType,
  CellType,
} from 'src/app/shared/components/table/interface/table';
import { AlertsService } from '../../../../shared/services/alert.service';
import { SelectionStrategy } from '../../../../shared/components/table/interface/table';
import { GruposService } from '../../services/grupos.service';
import { AsignaturasService } from '../../services/asignaturas.service';
import { ProfesoresService } from '../../services/profesores.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { SEMESTRES } from './semestres';

@Component({
  selector: 'rizo-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
})
export class GruposComponent implements OnInit {
  loader!: boolean;
  form!: FormGroup;
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE;
  subjects!: Array<any>;
  professors!: Array<any>;
  id!: string;
  pupils: Array<any> = [];

  columnHeader = {
    group: { label: 'Nombre' },
    semestre: { label: 'Semestre' },
    asignatura: { label: 'Asignatura' },
    profesor: { label: 'Docente' },
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };

  semestres: Array<any> = SEMESTRES;
  constructor(
    private formBuilder: FormBuilder,
    private gruposService: GruposService,
    private asignaturasService: AsignaturasService,
    private profesoresService: ProfesoresService,
    private alertService: AlertsService,
    private menuComponent: MenuAdminComponent
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.valueChanges();
    this.fillTable();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      group: ['', Validators.required],
      semestre: ['', Validators.required],
      asignaturaId: ['', Validators.required],
      profesorId: ['', Validators.required],
    });
  }

  valueChanges(): void {
    let ventana: string;
    this.menuComponent.ventana.subscribe((response: any) => {
      ventana = response;
      if (ventana === 'Grupos') {
        this.getSubjets();
        this.getProfessors();
      }
    });
  }

  getSubjets(): void {
    this.asignaturasService
      .getAllSubjects()
      .subscribe((response: Array<any>) => {
        this.subjects = response.sort((a: any, b: any) => {
          return a.subject > b.subject ? 1 : -1;
        });
      });
  }

  getProfessors(): void {
    this.profesoresService
      .getAllProfessors()
      .subscribe((response: Array<any>) => {
        this.professors = response.sort((a: any, b: any) => {
          return a.nombreCompleto > b.nombreCompleto ? 1 : -1;
        });
      });
  }

  fillTable(): void {
    this.loader = true;
    this.gruposService.getAllGroups().subscribe(
      (response) => {
        this.loader = false;
        this.dataSourse.data = response;
        this.dataSourse.data.forEach((element) => {
          console.log(element);
          element.action = [{ name: 'create' }, { name: 'delete' }];
          this.asignaturasService
            .getSubject(element.asignaturaId)
            .subscribe((response) => (element.asignatura = response.subject));
          this.profesoresService
            .getProfessor(element.profesorId)
            .subscribe(
              (response) => (element.profesor = response[0].nombreCompleto)
            );
        });
      },
      () => (this.loader = false)
    );
  }

  createGroup(): void {
    if (this.form.valid) {
      this.loader = true;
      this.gruposService.createGroup(this.form.value).subscribe(
        () => {
          this.loader = false;
          this.alertService.mensajeCorrecto(
            'Registo exitoso',
            'Grupo creado con exito 😇 '
          );
          this.fillTable();
          this.form.reset();
        },
        (error: any) => {
          this.loader = false;
          this.alertService.mensajeError(
            'Registro fallido',
            `Grupo no creado, error: ${{ error }}`
          );
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  updateGroup(): void {
    if (this.form.valid) {
      this.loader = true;
      const payload = this.form.value;
      payload.alumno = this.pupils;
      this.gruposService
        .updateGroup({ id: this.id }, this.form.value)
        .subscribe(
          () => {
            this.loader = false;
            this.alertService.mensajeCorrecto(
              'Registo exitoso',
              'Grupo actualizado con exito 😇 '
            );
            this.fillTable();
            this.form.reset();
            this.id = '';
          },
          (error: any) => {
            this.loader = false;
            this.alertService.mensajeError(
              'Registro fallido',
              `Grupo no actualizado, error: ${{ error }}`
            );
          }
        );
    } else {
      this.form.markAllAsTouched();
    }
  }

  deleteGroup(group: any): void {
    this.loader = true;
    this.alertService
      .confirmDialog(
        'Eliminar grupo',
        `¿Realmente desea eliminar al grupo: ${group.group}?`,
        'SI, DESEO ELIMINAR'
      )
      .then((response) => {
        if (response.isConfirmed) {
          this.gruposService.deleteGroup(this.id).subscribe(
            () => {
              this.loader = false;
              this.alertService.mensajeCorrecto(
                'Grupo eliminado',
                `El grupo ${group.group} se elimino con exito`
              );
              this.id = '';
              this.fillTable();
            },
            (error: any) => {
              this.loader = false;
              this.alertService.mensajeError(
                'Eliminación fallida',
                `Grupo no eliminado, error: ${{ error }}`
              );
            }
          );
        }
      })
      .catch(() => (this.loader = false));
  }

  actionEvent(event: any) {
    console.log(event.row);
    if (event.action === 'create') {
      this.form.patchValue(event.row);
      this.id = event.row.id;
      if (event.row.alumno) {
        this.pupils = event.row.alumno;
      }
    }
    if (event.action === 'delete') {
      this.deleteGroup(event.row);
    }
  }
  limpiar(): void {
    this.form.reset();
    this.id = '';
  }
}
