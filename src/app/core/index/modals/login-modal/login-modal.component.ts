import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/services/alert.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'login-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  hide: boolean = true;
  loader!: boolean;
  form!: FormGroup;
  mensajeError!: string;

  constructor(
    private router: Router,
    private dialogReft: MatDialogRef<LoginModalComponent>,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loginService.logout();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
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
    });
  }

  get controls(): any {
    return this.form.controls;
  }

  login() {
    this.loader = true;
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(
        (response) => {
          this.loginService.saveToken(response);
          this.loginService.getToken();
          this.validateRol();

          this.form.reset;
          this.dialogReft.close();
          this.loader = false;
        },
        () => {
          this.loader = false;
          this.alertService.mensajeError(
            'Error',
            'Usuario o Contraseña no validos'
          );
        }
      );
    } else {
      this.loader = false;
      this.form.markAllAsTouched();
    }
  }

  validateRol(): void {
    if (this.loginService.obtenerCampoJWT('EsAdmin')) {
      this.router.navigateByUrl('admin');
      this.alertService.mensajeCorrecto(
        'BIENVENIDO',
        this.form.get('email')?.value
      );
    } else if (this.loginService.obtenerCampoJWT('EsEstudiante')) {
      this.alertService.mensajeCorrecto(
        'BIENVENIDO',
        this.form.get('email')?.value
      );
      this.router.navigateByUrl('mapas');
    } else if (this.loginService.obtenerCampoJWT('EsDocente')) {
      this.alertService.mensajeCorrecto(
        'BIENVENIDO',
        this.form.get('email')?.value
      );
      this.router.navigateByUrl('docentes');
    }
  }

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
}
