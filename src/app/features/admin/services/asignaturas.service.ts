import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class AsignaturasService {
  path: string = 'asignaturas';

  constructor(private webRequest: WebRequestService) {}

  createSubject(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(this.path, payload);
  }

  getAllSubjects(): Observable<any> {
    return this.webRequest.getWithHeaders(this.path);
  }

  getSubject(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(`${this.path}/${param}`);
  }

  updateSubject(payload: any, param: any): Observable<any> {
    return this.webRequest.putWithHeaders(this.path, payload, param);
  }

  deleteSubject(param: any): Observable<any> {
    return this.webRequest.deleteWithHeaders(this.path, param);
  }
}
