import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class PuntosService {
  pathMaps: string = 'mapas';
  pathPoints: string = 'puntos';

  constructor(private webRequest: WebRequestService) {}

  getAllMaps(): Observable<any> {
    return this.webRequest.getWithHeaders(this.pathMaps);
  }

  getMap(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(`${this.pathMaps}/${param}`);
  }

  createPonit(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(this.pathPoints, payload);
  }

  getAllPonits(): Observable<any> {
    return this.webRequest.getWithHeaders(this.pathPoints);
  }

  getPonits(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(`${this.pathPoints}/mapa/${param}`);
  }

  getPoint(param: any): Observable<any> {
    return this.webRequest.getWithHeaders(`${this.pathPoints}/${param}`);
  }

  updatePonit(payload: any, param: any): Observable<any> {
    return this.webRequest.putWithHeaders(
      `${this.pathPoints}/${param}`,
      payload
    );
  }

  deletePonit(param: any): Observable<any> {
    return this.webRequest.deleteWithHeaders(this.pathPoints, param);
  }

  downloadImage(url: string): Observable<any> {
    return this.webRequest.downloadImage(url);
  }
}
