import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AsignaturasService } from '../../services/asignaturas.service';
import { ProgramasService } from '../../services/programas.service';
import { AlertsService } from '../../../../shared/services/alert.service';
import {
  PaginationType,
  CellType,
  SelectionStrategy,
} from 'src/app/shared/components/table/interface/table';

@Component({
  selector: 'rizo-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
})
export class ConfiguracionesComponent implements OnInit {
  loader!: boolean;
  form!: FormGroup;
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE;

  columnHeader = {
    tipo: { label: 'Tipo' },
    nombre: { label: 'Nombre' },
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };

  constructor(
    private formBuilder: FormBuilder,
    private asignaturasService: AsignaturasService,
    private programasService: ProgramasService,
    private alertsService: AlertsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fillTable();
    this.valueChangesInput();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      subject: [''],
      program: [''],
    });
  }

  valueChangesInput(): void {
    const subject = this.form.get('subject');
    const program = this.form.get('program');
    let hasSubjectValue = false;
    let hasProgramtValue = false;

    subject?.valueChanges.subscribe((value) => {
      if (value) {
        program?.disable();
      } else {
        program?.enable();
      }
    });

    program?.valueChanges.subscribe((value) => {
      if (value) {
        subject?.disable();
      } else {
        subject?.enable();
      }
    });

    this.form.updateValueAndValidity();
  }

  fillTable(): void {
    this.loader = true;
    this.asignaturasService.getAllSubjects().subscribe(
      (responseSubject) => {
        let subjests: Array<any> = [];
        let programs: Array<any> = [];
        subjests = responseSubject;
        this.programasService.getAllPrograms().subscribe(
          (responseProgram) => {
            programs = responseProgram;
            this.dataSourse.data = [...subjests, ...programs];
            this.mapData();
            this.loader = false;
          },
          () => (this.loader = false)
        );
      },
      () => (this.loader = false)
    );
  }

  mapData() {
    this.dataSourse.data.forEach((element) => {
      element.action = [{ name: 'delete' }];
      if (element.subject) {
        element.tipo = 'Asignatura';
        element.nombre = element.subject;
      }
      if (element.program) {
        element.tipo = 'Programa';
        element.nombre = element.program;
      }
    });
  }

  create(): void {
    this.loader = true;
    if (this.form.get('program')?.value) {
      this.createPropgram();
    }
    if (this.form.get('subject')?.value) {
      this.createSubject();
    }
  }

  createPropgram(): void {
    this.programasService.createProgram(this.form.value).subscribe(
      () => {
        this.loader = false;
        this.alertsService.mensajeCorrecto(
          'Programa creado',
          'Programa creado con exito😇  '
        );
        this.fillTable();
      },
      () => {
        this.loader = false;
      }
    );
  }

  createSubject(): void {
    this.asignaturasService.createSubject(this.form.value).subscribe(
      () => {
        this.loader = false;
        this.alertsService.mensajeCorrecto(
          'Asignatura creada',
          'Asignatura creada con exito😇  '
        );
        this.fillTable();
      },
      () => {
        this.loader = false;
      }
    );
  }

  actionEvent(event: any): void {
    if (event.action === 'delete' && event.row.subject) {
      this.deleteSubject(event.row.id);
    }
    if (event.action === 'delete' && event.row.program) {
      this.deleteProgram(event.row.id);
    }
  }

  deleteSubject(id: number): void {
    this.alertsService
      .confirmDialog('¿Desea eliminar esta asignatura?', '', 'Si, si quiero')
      .then((response) => {
        this.loader = true;
        if (response.isConfirmed) {
          this.asignaturasService.deleteSubject(id).subscribe(() => {
            this.loader = false;
            this.fillTable();
          });
        }
      });
  }

  deleteProgram(id: number): void {
    this.alertsService
      .confirmDialog('¿Desea eliminar este programa?', '', 'Si, si quiero')
      .then((response) => {
        this.loader = true;
        if (response.isConfirmed) {
          this.programasService.deleteProgram(id).subscribe(() => {
            this.loader = false;
            this.fillTable();
          });
        }
      });
  }
}
