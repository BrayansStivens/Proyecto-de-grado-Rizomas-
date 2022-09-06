import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from '../../interface/table';

@Component({
  selector: 'rizo-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input() element!: Array<Action>;
  @Input() index!: any;
  @Input() row!: any;
  @Output() actionEvent = new EventEmitter<any>();

  firstActions: Array<any> = [];
  secondActions: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    if (this.element?.length > 3) {
      this.firstActions = this.element.slice(0, 3);
      this.secondActions = this.element.slice(3, this.element.length);
    }
  }

  emitAction(name: any) {
    this.actionEvent.emit({
      index: this.index,
      row: this.row,
      action: name,
    });
  }
}
