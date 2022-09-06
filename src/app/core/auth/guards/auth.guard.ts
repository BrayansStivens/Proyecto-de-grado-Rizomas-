import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alert.service';
import { LoginService } from '../../index/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.loginService.isLogIn()) {
      this.router.navigate(['']).then(() => false);
    }
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    let role;
    if (this.loginService.obtenerRol('EsAdmin')) {
      role = 'admin';
    } else if (this.loginService.obtenerRol('EsDocente')) {
      role = 'docente';
    } else if (this.loginService.obtenerRol('EsEstudiante')) {
      role = 'estudiante';
    }

    if (role?.includes(route.data['role'])) {
      return true;
    } else {
      this.router.navigate(['']);
      this.loginService.logout();
      this.alertService.mensajeError(
        'Ups',
        'No tienes permisos para entrar 🤨'
      );
      return false;
    }
  }
}
