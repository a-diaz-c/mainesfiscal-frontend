import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  mostrar(){
    this.authService.guardarToken('abc123def');
    this.router.navigateByUrl('/home');
    console.log(this.usuario);

  }

}

