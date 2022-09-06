import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  path: string = 'alumnos';

  constructor(private webRequest: WebRequestService) {}

  createPupil(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(this.path, payload);
  }

  getAllPupils(): Observable<any> {
    return this.webRequest.getWithHeaders(this.path);
  }

  getPupil(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(this.path, param);
  }

  updatePupil(payload: any, param: any): Observable<any> {
    return this.webRequest.putWithHeaders(this.path, payload, param);
  }

  deletePupil(param: any): Observable<any> {
    return this.webRequest.deleteWithHeaders(this.path, param);
  }
}
