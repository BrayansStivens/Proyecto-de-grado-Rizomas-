import { Component, Input, OnInit } from '@angular/core';
import { IconText } from '../../interface/table';

@Component({
  selector: 'rizo-icon-text',
  templateUrl: './icon-text.component.html',
  styleUrls: ['./icon-text.component.scss'],
})
export class IconTextComponent implements OnInit {
  @Input() element!: IconText;
  @Input() disable!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
