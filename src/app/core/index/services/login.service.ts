import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from '../../services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  pathCuentas: string = 'cuentas/';
  private readonly keyToken = 'token';
  private readonly keyExpirationToken = 'token-expiration';
  private readonly role = 'EsAdmin';

  constructor(private webRequest: WebRequestService) {}

  login(payload: any): Observable<any> {
    return this.webRequest.post(`${this.pathCuentas}login`, payload);
  }

  registrar(payload: any): Observable<any> {
    return this.webRequest.post(`${this.pathCuentas}registrar`, payload);
  }

  getToken() {
    const token = localStorage.getItem(this.keyToken);
    return token;
  }

  saveToken(response: any) {
    localStorage.setItem(this.keyToken, response.token);
    localStorage.setItem(this.keyExpirationToken, response.expiration);
  }

  isLogIn(): boolean {
    const token = localStorage.getItem(this.keyToken);

    if (!token) {
      return false;
    }

    /*     const expiracion = localStorage.getItem(this.keyExpirationToken);
    const expiracionFecha = new Date();

    if (expiracionFecha <= new Date()){
      this.logout();
      return false;
    } */

    return true;
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyExpirationToken);
  }

  obtenerRol(role: string): string {
    return this.obtenerCampoJWT(role);
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.keyToken);
    if (!token) {
      return '';
    }
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }
}
