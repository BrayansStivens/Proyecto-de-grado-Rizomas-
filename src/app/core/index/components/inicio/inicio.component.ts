import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rizo-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  animations: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  arbol() {
    this.router.navigateByUrl('/invitados');
  }
}
