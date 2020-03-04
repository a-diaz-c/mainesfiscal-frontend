import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-consultar-rfc',
  templateUrl: './consultar-rfc.component.html',
  styleUrls: ['./consultar-rfc.component.css']
})
export class ConsultarRfcComponent implements OnInit {

  resultadoLista69;
  resultadoListalocalizados;

  buscar_rfc: string;
  lista69: boolean;
  listaIncumplidos: boolean;

  constructor(private authService: AuthService) { 
    this.buscar_rfc = "";
    this.lista69 = false;
    this.listaIncumplidos = false;
  }

  ngOnInit() {
    this.buscarLista69("AAA080808HL8");
    this.buscarListalocalizados("FEVT880612SRA");
  }

  buscar(f){
    if(this.lista69)
      this.buscarLista69(this.buscar_rfc);
    if(this.buscarListalocalizados)
      this.buscarListalocalizados(this.buscar_rfc);
  }

  buscarLista69(rfc: string){
    this.authService.lista69(rfc).subscribe(data => {
      this.resultadoLista69 = data;
      console.log(this.resultadoLista69);
    },
    (err: HttpErrorResponse) => {
      console.log("Error del servidor");

    });
  }

  buscarListalocalizados(rfc: string){
    this.authService.listalocalizados(rfc).subscribe(data => {
      this.resultadoListalocalizados = data;
      console.log(this.resultadoListalocalizados);
    },
    (err: HttpErrorResponse) => {
      console.log("Error del servidor");

    });
  }

}
