import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../API/environment.interface';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  constructor(private http: HttpClient) {}

  getiP(): Observable<any> {
    return this.http.get<any>(Constants.ROOT_IP_API);
  }

  get(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
    });
  }

  getWithHeaders(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getObserve(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
      observe: 'response',
    });
  }

  post(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
    });
  }

  postWithHeaders(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  postObserve(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
      observe: 'response',
    });
  }

  patch(url: string, payload: any, params?: any): Observable<any> {
    return this.http.patch<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
    });
  }

  put(url: string, payload: any, params?: any): Observable<any> {
    return this.http.put<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
    });
  }

  putWithHeaders(url: string, payload: any, params?: any): Observable<any> {
    return this.http.put<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  delete(url: string, params?: any): Observable<any> {
    return this.http.delete<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
    });
  }

  deleteWithHeaders(url: string, params?: any): Observable<any> {
    return this.http.delete<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  downloadImage(url: string): Observable<any> {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  /* downloadImage(url: string) {
    const imgUrl = url;
    const imgName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
    this.http
      .get(imgUrl, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        console.log(res);
        const file = new Blob([res], { type: res.type });

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = imgName;

        // Version link.click() to work at firefox
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  } */
}
