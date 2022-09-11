import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../../../core/services/web-request.service';

@Component({
  selector: 'rizo-modal-encuesta',
  templateUrl: './modal-encuesta.component.html',
  styleUrls: ['./modal-encuesta.component.scss'],
})
export class ModalEncuestaComponent implements OnInit {
  ip!: string;
  rating: number = 3;
  starCount: number = 5;
  response: Array<boolean> = [false, false];
  questionRating!: number;
  constructor(private webRequestService: WebRequestService) {}

  ngOnInit(): void {
    this.getIP();
  }

  getIP(): void {
    this.webRequestService.getiP().subscribe((response) => {
      this.ip = response.ip;
    });
  }

  showComent(event: number, index: number) {
    this.response.forEach((element, position) => {
      if (index === position) {
        if (event <= 3) {
          this.response[position] = true;
        } else {
          this.response[position] = false;
        }
      }
    });
    console.log(this.response);
  }
}
