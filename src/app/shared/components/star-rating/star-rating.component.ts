import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'rizo-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 3;
  @Input() starCount: number = 5;
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;
  ratingArr: Array<boolean> = [];

  constructor(private snackBar: MatSnackBar) {
    this.ratingArr = Array(this.starCount).fill(false);
  }

  ngOnInit() {}

  returnStar(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(i: number): boolean {
    this.rating = i + 1;
    this.snackBar.open(
      'Has calificado esta pregunta con un  ' +
        this.rating +
        ' / ' +
        this.starCount,
      '',
      {
        duration: this.snackBarDuration,
      }
    );
    this.ratingUpdated.emit(this.rating);
    console.log(this.rating);
    return false;
  }
}
