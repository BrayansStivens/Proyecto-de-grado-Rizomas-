import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class ContenidosService {
  path: string = 'contenidos';

  constructor(private webRequest: WebRequestService) {}

  createContent(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(this.path, payload);
  }

  getAllContents(): Observable<any> {
    return this.webRequest.getWithHeaders(this.path);
  }

  getContent(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(`${this.path}/mapa/${param}`);
  }

  getContentsByPoint(param: string) {
    return this.webRequest.getWithHeaders(`${this.path}/puntos/${param}`);
  }

  updateContent(payload: any, param: any): Observable<any> {
    return this.webRequest.putWithHeaders(`${this.path}/${param}`, payload);
  }

  deleteContent(param: any): Observable<any> {
    return this.webRequest.deleteWithHeaders(`${this.path}/${param}`);
  }
}
