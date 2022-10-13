import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  path: string = 'cuentas';
  constructor(private webRequest: WebRequestService) {}

  register(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(`${this.path}/registrar`, payload);
  }

  registerByFile(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(`${this.path}/UploadFiles`, payload);
  }

  createRole(params: any): Observable<any> {
    return this.webRequest.postWithHeaders(
      `${this.path}/AsignarRol`,
      '',
      params
    );
  }

  getRoleByUser(params: any): Observable<any> {
    return this.webRequest.getWithHeaders(
      `${this.path}/RolPorUsario?email=${params}`
    );
  }

  getAllUsers(): Observable<any> {
    return this.webRequest.getWithHeaders(this.path);
  }

  getUserByEmail(params: any): Observable<any> {
    return this.webRequest.getWithHeaders(
      `${this.path}/UsuarioPorEmail`,
      params
    );
  }
}
