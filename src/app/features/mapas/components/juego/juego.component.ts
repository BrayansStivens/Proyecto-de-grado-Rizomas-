import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../../shared/services/alert.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'rizo-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {
  all = [
    {
      id: 1,
      name: 'Esperanza Carvajal',
      poster: '../../../../../assets/images/game/esperanza.jpg',
    },
    {
      id: 2,
      name: 'Mamá Dulú',
      poster: '../../../../../assets/images/game/mama_dulu.jpg',
    },
    {
      id: 3,
      name: 'Débora Arango',
      poster: '../../../../../assets/images/game/debora.jpg',
    },
    {
      id: 4,
      name: 'Argelia Mercedes Laya',
      poster: '../../../../../assets/images/game/argelia.jpg',
    },
    {
      id: 5,
      name: 'Ellen Ochoa',
      poster: '../../../../../assets/images/game/ellen.jpg',
    },
    {
      id: 6,
      name: 'Kathrin Barboza',
      poster: '../../../../../assets/images/game/kathrin.jpg',
    },
    {
      id: 7,
      name: 'Dolores Huerta',
      poster: '../../../../../assets/images/game/dolores.jpg',
    },
    {
      id: 8,
      name: 'Marvel Moreno',
      poster: '../../../../../assets/images/game/marvel.jpg',
    },
    {
      id: 9,
      name: 'Sylvia Rivera',
      poster: '../../../../../assets/images/game/sylvia.jpg',
    },
    {
      id: 10,
      name: 'Aida Ester Bueno',
      poster: '../../../../../assets/images/game/aida.jpg',
    },
  ];
  answers: Array<any> = [];
  reset!: Array<any>;

  intentos: number = 5;

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.shuffle(this.all);
    this.reset = Array.from(this.all);
  }

  shuffle(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (!event.isPointerOverContainer) {
      this.intentos--;
    }
    this.gameOver();
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.won();
  }

  gameOver(): void {
    if (this.intentos === 0) {
      this.alertsService
        .mensajeError(
          'Intento terminado',
          'No te preocupes, intentalo de nuevo 😇'
        )
        .then(() => {
          this.resetGame();
        });
    }
  }

  won(): void {
    if (this.answers.length === 5) {
      this.alertsService
        .mensajeCorrecto('¡FELICIDADES! 🎉', 'Has respondido correctamente')
        .then(() => {
          this.resetGame();
        });
    }
  }

  resetGame(): void {
    this.all = Array.from(this.reset);
    this.answers = [];
    this.shuffle(this.all);
    this.intentos = 5;
  }
  evenPredicate(item: CdkDrag<any>) {
    return item.data.id % 2 === 0;
  }

  noReturnPredicate() {
    return false;
  }
}
