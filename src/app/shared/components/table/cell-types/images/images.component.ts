import { Component, Input, OnInit } from '@angular/core';
import { Images } from '../../interface/table';

@Component({
  selector: 'rizo-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @Input() element!: Images;
  @Input() disable!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
