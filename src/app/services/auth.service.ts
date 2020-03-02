import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3800/api/';
  userToken: String;

  constructor( private http: HttpClient ) { }

  listalocalizados(rfc: string){
    return this.http.get(this.url + "buscar/listalocalizados/" + rfc);
  }

  lista69(rfc: string){
    return this.http.get(this.url + "buscar/lista69/" + rfc);
  }

  login(usuario : UsuarioModel){
    /*return this.http.post(this.url + "", usuario)
               .pipe(
                 map(resp => {
                   this.guardarToken( resp['idToken']);
                   return resp;
                 })
               );*/
  }

  guardarToken(idToken){
    this.userToken = idToken;
    localStorage.setItem('token', idToken); 
  }

  leerToke(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }
}
