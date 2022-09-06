import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AudioModalComponent } from '../../modals/audio-modal/audio-modal.component';

@Component({
  selector: 'rizo-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.scss'],
})
export class PlantaComponent implements OnInit {
  animate: boolean = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  playAudio(): MatDialogRef<any> {
    const dialogRef = this.dialog.open(AudioModalComponent, {
      disableClose: true,
    });
    dialogRef.afterOpened().subscribe(() => {
      this.animate = !this.animate;
    });
    dialogRef.afterClosed().subscribe(() => {
      this.animate = !this.animate;
    });
    return dialogRef;
  }
}
