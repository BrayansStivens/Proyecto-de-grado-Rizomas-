import { Injectable } from '@angular/core';
import { WebRequestService } from '../../../core/services/web-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  path: string = 'profesores';

  constructor(private webRequest: WebRequestService) {}

  createProfessor(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(this.path, payload);
  }

  getAllProfessors(): Observable<any> {
    return this.webRequest.getWithHeaders(this.path);
  }

  getProfessor(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(this.path, param);
  }

  updateProfessor(payload: any, param: any): Observable<any> {
    return this.webRequest.putWithHeaders(this.path, payload, param);
  }

  deleteProfessor(param: any): Observable<any> {
    return this.webRequest.deleteWithHeaders(this.path, param);
  }
}
