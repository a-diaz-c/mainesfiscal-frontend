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

  encotradoLista69: boolean;
  encontradoIncumplidos: boolean; 

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
    if(f.invalid && !this.lista69 && !this.listaIncumplidos){
      return;
    }
    
    this.encontradoIncumplidos = null;
    this.encotradoLista69 = null;

    if(this.lista69){
      this.buscarLista69(this.buscar_rfc);
      if(Object.keys(this.resultadoLista69).length > 1){
        this.encotradoLista69 = true;
      }else{
        this.encotradoLista69 = false;
      }
    }
    if(this.listaIncumplidos){
      this.buscarListalocalizados(this.buscar_rfc);
      if(Object.keys(this.resultadoListalocalizados).length > 1){
        this.encontradoIncumplidos = true;
      }else{
        this.encontradoIncumplidos = false;
      }
    }
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
