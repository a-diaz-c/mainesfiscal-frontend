import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new UsuarioModel;
  }

  mostrar(){
    console.log(this.usuario);
  }

}
