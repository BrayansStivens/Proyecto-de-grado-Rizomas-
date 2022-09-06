import { Component, Input, OnInit } from '@angular/core';
import { DoubleData } from '../../interface/table';

@Component({
  selector: 'rizo-double-date',
  templateUrl: './double-date.component.html',
  styleUrls: ['./double-date.component.scss'],
})
export class DoubleDateComponent implements OnInit {
  @Input() element!: DoubleData;
  @Input() disable!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
