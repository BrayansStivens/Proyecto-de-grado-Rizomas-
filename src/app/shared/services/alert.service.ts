import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  mensajeCorrecto(
    titulo: string,
    mensaje: string = ''
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#58aa21',
    });
  }

  mensajeAdvertencia(
    titulo: string,
    mensaje: string = ''
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      confirmButtonColor: '#58aa21',
    });
  }

  mensajeError(
    titulo: string,
    mensaje: string = ''
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      confirmButtonColor: '#58aa21',
    });
  }

  confirmDialog(
    titulo: string,
    mensaje: string,
    confirmButton: string
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58aa21',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButton,
      cancelButtonText: 'CANCELAR',
    });
  }

  mensajeErrorHtml(
    titulo: string,
    html: string = ''
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      html: html,
      icon: 'error',
    });
  }
}
