import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebRequestService } from '../../../core/services/web-request.service';
import { AlertsService } from '../../services/alert.service';
import { ValoracionService } from '../../services/valoracion.service';

@Component({
  selector: 'rizo-modal-encuesta',
  templateUrl: './modal-encuesta.component.html',
  styleUrls: ['./modal-encuesta.component.scss'],
})
export class ModalEncuestaComponent implements OnInit {

  form!:FormGroup;
  ip!: string;
  loader!:boolean;
  rating: number = 0;
  starCount: number = 5;
  response: Array<boolean> = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      contenidos: Array<any>;
    },
    private webRequestService: WebRequestService,
    private valoracionService: ValoracionService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder) {
      this.createForm()
    }

  ngOnInit(): void {
    this.getIP();
    for (let index = 0; index < this.data.contenidos.length; index++) {
      this.response.push(false); 
    }
  }

  createForm():void{
    this.form = this.formBuilder.group({
      puntuacion:[''],
      comentario:['']
    })
  }

  getIP(): void {
    this.webRequestService.getiP().subscribe((response) => {
      this.ip = response.ip;
    });
  }

  showComent(event: number, index: number):void {
    this.data.contenidos[index].puntuacion = event;
    this.response.forEach((element, position) => {
      if (index === position) {
        if (event <= 3) {
          this.response[position] = true;
        } else {
          this.response[position] = false;
        }
      }
    });
  }

  setComentario(event:string, index:number): void{
    this.data.contenidos[index].comentario = event;
  }

  send():void{
    this.loader = true
    let payload = {comentario: '', puntuacion: 0}
    this.data.contenidos.forEach((contenido: any)=>{
      if(contenido.comentario === undefined){
        payload.comentario = ' ';
      }else{
        payload.comentario = contenido.comentario
      }
      payload.puntuacion = contenido.puntuacion
      this.valoracionService.createValoracion(contenido.id, payload).subscribe(()=>{
        this.alertService.mensajeCorrecto('Respuestas enviadas con exito');
        this.loader= false;
      },()=>{
        this.loader = false;
      } )
    })
  }
}
