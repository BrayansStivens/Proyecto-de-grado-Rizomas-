import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../interface/table';

@Component({
  selector: 'rizo-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() element!: Link;
  @Input() disable!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
