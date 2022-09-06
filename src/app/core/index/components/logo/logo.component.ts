import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rizo-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() animation: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
