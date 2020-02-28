import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-negra',
  templateUrl: './lista-negra.component.html',
})
export class ListaNegraComponent implements OnInit {

  resultadoLista69;
  resultadoListalocalizados;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.buscarLista69();
    this.buscarListalocalizados();
  }

  buscarLista69(){
    this.authService.lista69("AAA080808HL8").subscribe(data => {
      this.resultadoLista69 = data;
      console.log(this.resultadoLista69);
    },
    (err: HttpErrorResponse) => {
      console.log("Error del servidor");

    });
  }

  buscarListalocalizados(){
    this.authService.listalocalizados("FEVT880612SRA").subscribe(data => {
      this.resultadoListalocalizados = data;
      console.log(this.resultadoListalocalizados);
    },
    (err: HttpErrorResponse) => {
      console.log("Error del servidor");

    });
  }

}
