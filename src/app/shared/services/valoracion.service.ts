import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/core/services/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor( private webRequestService: WebRequestService) { }

  createValoracion(id:number, payload:any):Observable<any>{
    return this.webRequestService.postWithHeaders(`contenidos/${id}/valoraciones`, payload);
  }
}
