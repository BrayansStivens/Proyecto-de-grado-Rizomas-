import { Injectable } from '@angular/core';
import { WebRequestService } from '../../../core/services/web-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoService {
  path: string = 'seguimientos';
  constructor(private webRequestService: WebRequestService) {}

  getAll(): Observable<any> {
    return this.webRequestService.getWithHeaders(this.path);
  }

  postSeguimiento(payload: any): Observable<any> {
    return this.webRequestService.postWithHeaders(this.path, payload);
  }
}
