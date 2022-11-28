import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreditosComponent } from '../../modals/creditos/creditos.component';

@Component({
  selector: 'rizo-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  loader: boolean = false;
  animations: boolean = true;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  arbol() {
    this.loader = true;
    this.router
      .navigateByUrl('/invitados')
      .then(() => (this.loader = false))
      .catch(() => (this.loader = false));
  }

  openCreditos() {
    this.dialog.open(CreditosComponent, {
      disableClose: true,
    });
  }
}
