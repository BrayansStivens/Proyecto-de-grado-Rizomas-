import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  CellType,
  PaginationType,
  SelectionStrategy,
} from 'src/app/shared/components/table/interface/table';
import { AlertsService } from 'src/app/shared/services/alert.service';
import { GruposService } from '../../services/grupos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { ProfesoresService } from '../../services/profesores.service';
import { AlumnosService } from '../../services/alumnos.service';
import { ProgramasService } from '../../services/programas.service';

@Component({
  selector: 'rizo-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  loader!: boolean;
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE;
  form!: FormGroup;
  mensajeError!: string;
  mensajeBoton!: string;
  archivoExcel!: any;
  nameFile!: string;
  disabledGropu!: boolean;
  groups!: Array<any>;
  programs!: Array<any>;

  roles: Array<any> = [
    { role: 'Administrador', value: { claimName: 'EsAdmin', claimValue: '1' } },
    { role: 'Docente', value: { claimName: 'EsDocente', claimValue: '2' } },
    {
      role: 'Estudiante',
      value: { claimName: 'EsEstudiante', claimValue: '3' },
    },
  ];

  columnHeader = {
    nombreCompleto: { label: 'Nombre' },
    email: { label: 'Email' },
    identificacion: { label: 'Identificación' },
    /*  action: { label: 'Acciones', type: CellType.ACTIONS }, */
  };

  constructor(
    private formBuild: FormBuilder,
    private usuariosService: UsuariosService,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService,
    private gruposService: GruposService,
    private programasService: ProgramasService,
    private alertService: AlertsService,
    private menuComponent: MenuAdminComponent
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.valueChanges();
  }

  createForm() {
    this.form = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-])([A-Za-z\d$@$!%*?&-]|[^ ]){8,15}$/
          ),
        ],
      ],
      role: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      groups: [''],
      programs: [''],
      file: ['', Validators.pattern('^.*.(.xlsx)$')],
    });
  }

  valueChanges(): void {
    let ventana: string;
    this.menuComponent.ventana.subscribe((response: any) => {
      ventana = response;
      if (ventana === 'Usuarios') {
        this.getGroups();
        this.getPrograms();
      }
    });

    this.form.get('role')?.valueChanges.subscribe((value) => {
      if (value.claimName === 'EsEstudiante') {
        this.disabledGropu = true;
        this.getGroups();
        this.getPrograms();
        this.form.get('groups')?.addValidators(Validators.required);
        this.form.get('programs')?.addValidators(Validators.required);
        this.form.updateValueAndValidity();
      } else {
        this.disabledGropu = false;
        this.form.get('groups')?.clearValidators();
        this.form.get('programs')?.clearValidators();
        this.form.updateValueAndValidity();
      }
    });
  }

  fillTable(): void {
    if (this.form.get('email')?.valid) {
      this.loader = true;
      const param = { email: this.form.get('email')?.value };
      this.usuariosService.getUserByEmail(param).subscribe(
        (response) => {
          this.loader = false;
          this.dataSourse.data = [response];
          /*  console.log(this.dataSourse.data);
          this.dataSourse.data.forEach((element) => {
            element.action = [{ name: ' create' }, { name: 'delete' }];
          }); */
        },
        () => (this.loader = false)
      );
    } else {
      this.form.get('email')?.markAsTouched();
    }
  }

  getGroups(): void {
    this.gruposService.getAllGroups().subscribe((response) => {
      this.groups = response.sort((a: any, b: any) => {
        return a.group > b.group ? 1 : -1;
      });
    });
  }

  getPrograms(): void {
    this.programasService.getAllPrograms().subscribe((response) => {
      this.programs = response.sort((a: any, b: any) => {
        return a.program > b.program ? 1 : -1;
      });
    });
  }

  createUser(): void {
    if (this.form.valid) {
      this.loader = true;
      const { role, groups, file, ...rest } = this.form.value;
      const payload = rest;
      console.log();
      this.usuariosService.register(payload).subscribe(
        () => {
          this.createRole({ email: payload.email, ...role }, payload);
        },
        (error: any) => {
          this.loader = false;
          this.alertService.mensajeError(
            'Registro fallido',
            `Usuario no creado, error: ${{ error }}`
          );
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  createRole(params: any, payload: any): void {
    this.usuariosService.createRole(params).subscribe(
      () => {
        if (params.claimName === 'EsDocente') {
          this.createProfessor(payload);
        } else if (params.claimName === 'EsEstudiante') {
          this.createPupil(payload);
        } else {
          this.loader = false;
          this.alertService.mensajeCorrecto(
            'Registro exitoso',
            'Administrador creado con exito 😇'
          );
        }
      },
      (error: any) => {
        this.loader = false;
        this.alertService.mensajeError(
          'Registro fallido',
          `Rol no asignado, error: ${{ error }}`
        );
      }
    );
  }

  createProfessor(payload: any) {
    this.profesoresService.createProfessor(payload).subscribe(
      () => {
        this.loader = false;
        this.alertService.mensajeCorrecto(
          'Registro exitoso',
          'Docente creado con exito 😇'
        );
      },
      (error: any) => {
        this.loader = false;
        this.alertService.mensajeError(
          'Registro fallido',
          `Docente no creado, error: ${{ error }}`
        );
      }
    );
  }

  createPupil(payload: any) {
    this.alumnosService.createPupil(payload).subscribe(
      () => {
        this.loader = false;
        this.alertService.mensajeCorrecto(
          'Registro exitoso',
          'Docente creado con exito 😇'
        );
      },
      (error: any) => {
        this.loader = false;
        this.alertService.mensajeError(
          'Registro fallido',
          `Estudiante no creado, error: ${{ error }}`
        );
      }
    );
  }

  cargarArchivo(event: any) {
    /* const archivo = event.target.files[0];
    console.log(archivo);

    const [file] = event.target.files;
    this.archivoExcel = {
      fileRaw: file,
      fileName: file.name,
    };
    this.form.disable();
    this.nameFile = file.name; */
  }

  subirArchivo() {}

  eliminarArchivo(): void {
    this.form.get('file')?.reset();
    this.archivoExcel = null;
    this.form.enable();
  }
  //Control de mensajes HTML
  errorEmail(): string {
    this.mensajeError = '';
    if (
      this.form.get('email')?.hasError('email') &&
      !this.form.get('email')?.hasError('required')
    ) {
      this.mensajeError = 'Email no valido';
    }
    if (this.form.get('email')?.hasError('required')) {
      this.mensajeError = 'Campo requerido';
    }

    return this.mensajeError;
  }

  errorPassword(): string {
    this.mensajeError = '';
    if (
      this.form.get('password')?.hasError('pattern') &&
      !this.form.get('password')?.hasError('required')
    ) {
      this.mensajeError = 'Mayúscula, Minúscula, Número, Caracter';
    }
    if (this.form.get('email')?.hasError('required')) {
      this.mensajeError = 'Campo requerido';
    }

    return this.mensajeError;
  }

  errorFile(): string {
    this.mensajeError = '';
    if (this.form.get('file')?.value) {
      if (this.form.get('file')?.hasError('pattern')) {
        this.mensajeError = 'Sólo archivos XLSX';
      }
    }
    return this.mensajeError;
  }

  limpiar() {
    this.form.reset({
      role: { claimName: '', claimValue: '' },
    });
  }
}
