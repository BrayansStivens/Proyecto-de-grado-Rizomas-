import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rizo-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() loader: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
