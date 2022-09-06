import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramasService {
  path: string = 'programas';

  constructor(private webRequest: WebRequestService) {}

  createProgram(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(this.path, payload);
  }

  getAllPrograms(): Observable<any> {
    return this.webRequest.getWithHeaders(this.path);
  }

  getProgram(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(this.path, param);
  }

  updateProgram(payload: any, param: any): Observable<any> {
    return this.webRequest.putWithHeaders(this.path, payload, param);
  }

  deleteProgram(param: any): Observable<any> {
    return this.webRequest.deleteWithHeaders(this.path, param);
  }
}
