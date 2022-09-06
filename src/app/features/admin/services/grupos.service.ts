import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  path: string = 'grupos';
  constructor(private webRequest: WebRequestService) {}

  createGroup(payload: any): Observable<any> {
    return this.webRequest.post(`${this.path}`, payload);
  }

  getAllGroups(): Observable<any> {
    return this.webRequest.get(this.path);
  }

  getGroup(param: any): Observable<any> {
    return this.webRequest.get(this.path, param);
  }

  updateGroup(params: any, payload: any): Observable<any> {
    return this.webRequest.put(`${this.path}/${params}`, payload);
  }

  deleteGroup(param: any): Observable<any> {
    return this.webRequest.delete(`${this.path}/${param}`);
  }

  getPupilbyGroup(param: any): Observable<any> {
    return this.webRequest.get(this.path, param);
  }
}
