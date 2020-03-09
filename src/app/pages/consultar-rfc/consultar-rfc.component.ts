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

  //datos para mostrar
  resultadoLista69;
  resultadoListalocalizados;
  retultadoRFC: string;

  //atributos del formulario
  buscar_rfc: string;
  lista69: boolean;
  listaIncumplidos: boolean;

  //resultado de la busqueda 
  estadoLista69: string;
  estadoIncumplidos: string;

  constructor(private authService: AuthService) { 
    this.lista69 = true;
    this.listaIncumplidos = true;

    this.resultadoLista69 = {
      NombreDelContribuyente : "",
      SituacionDelContribuyente: "",
      NumeroyFechaDeOficioGlobalDePresuncion: ""
    };

    this.resultadoListalocalizados = {
      RFC: "",
      RazonSocial: "",
      Supuesto: "",
      EntidadFederativa:  ""
    };
  }

  ngOnInit() {
    //this.buscarLista69("AAA080808HL8");
    //this.buscarListalocalizados("FEVT880612SRA");
  }

  buscar(f){
    if((f.invalid && !this.lista69 && !this.listaIncumplidos) || f.invalid){
      alert("RFC incorrecto");
      return;
    }
    
    if(this.lista69){
      this.buscarLista69(this.buscar_rfc);   
    }
    if(this.listaIncumplidos){
      this.buscarListalocalizados(this.buscar_rfc);
    }
  }

  buscarLista69(rfc: string){
    this.retultadoRFC = rfc;
    this.authService.lista69(rfc).subscribe(data => {
      this.resultadoLista69 = data;
      console.log(this.resultadoLista69);
    },
    (err: HttpErrorResponse) => {
      console.log("Error del servidor");
    },
    () => {
      this.estadoLista69 = this.getEstadoBusqueda(this.resultadoLista69);
      /*if(Object.keys(this.resultadoLista69).length > 1){
        console.log("lista 69");
        this.busquedaLista69 = "Encontrado!!!";
      }else{
        this.busquedaLista69 = "No econtrado";
      }*/
    });
  }

  buscarListalocalizados(rfc: string){
    this.retultadoRFC = rfc;
    this.authService.listalocalizados(rfc).subscribe(data => {
      this.resultadoListalocalizados = data;
    
      console.log(this.resultadoListalocalizados);
    },
    (err: HttpErrorResponse) => {
      console.log("Error del servidor");
    },
    () => {
      this.estadoIncumplidos = this.getEstadoBusqueda(this.resultadoListalocalizados);
      /*if(Object.keys(this.resultadoListalocalizados).length > 1){
        console.log("Lista incumplidos");
        this.busquedaIncumplidos = "Encontrado!!!";
      }else{
        this.busquedaIncumplidos = "No econtrado";
      }*/
    });
  }

  getEstadoBusqueda(resultado: any): string{
    if(Object.keys(resultado).length > 1){
      console.log("Lista incumplidos");
      return "Encontrado!!!";
    }else{
      return "No econtrado";
    }
  }



}
