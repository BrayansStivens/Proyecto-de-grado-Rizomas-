import { Component, Input, OnInit } from '@angular/core';
import { StarRate } from '../../interface/table';

@Component({
  selector: 'rizo-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss'],
})
export class StarRateComponent implements OnInit {
  @Input() element!: StarRate;
  @Input() disable!: boolean;
  constructor() {}

  ngOnInit(): void {}

  subtraction(total: any, puntuacion: any) {
    let result: number;
    result = total - puntuacion;
    return result;
  }
}
