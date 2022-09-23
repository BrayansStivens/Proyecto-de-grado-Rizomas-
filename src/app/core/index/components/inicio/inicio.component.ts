import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rizo-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  loader: boolean = false;
  animations: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  arbol() {
    this.loader = true;
    this.router
      .navigateByUrl('/invitados')
      .then(() => (this.loader = false))
      .catch(() => (this.loader = false));
  }
}
