import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { Form } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  respuesta;
  encontrado: boolean;
  titulo: String;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  mostrar(){
    this.authService.guardarToken('abc123def');
    this.router.navigateByUrl('/home');
    console.log(this.usuario);
    this.consultarUsuario();
  }

  onSubmit(){
    this.authService.login(this.usuario).subscribe(data => {
      this.respuesta = data;
      this.consultarUsuario();
    },(err: HttpErrorResponse) => {
      this.encontrado = false;
      if (err.error instanceof Error){
        this.titulo = "Error de red";
        console.log(this.titulo);
        console.log('Error cliente o red:', err.error.message);
      } else {
        this.titulo = "Error en el servidor";
        console.log(`Error servidor remoto. ${err.status} # ${err.message}`);
      }
    });
  }

  consultarUsuario(){
    this.encontrado = this.respuesta.resp;
    if(this.encontrado){
      console.log(this.respuesta.msg);
      this.authService.guardarToken('abc123def');
      this.router.navigateByUrl('/home');
    }else{
      this.titulo = this.respuesta.msg;
      console.log(this.titulo);
    }
  }

}

