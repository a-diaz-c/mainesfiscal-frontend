import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3800/api/';
  userToken: String;

  constructor( private http: HttpClient ) { this.userToken = "" }

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

    const headerOptions  = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(usuario.usuario + ':' + usuario.password)
      })
    };
    return this.http.get("http://ec2-3-84-197-209.compute-1.amazonaws.com:8080/mainesWeb/recursos/usuarios/login", headerOptions);
  }

  guardarToken(idToken){
    this.userToken = idToken;
    localStorage.setItem('token', idToken); 

    let fecha = new Date();
    fecha.setSeconds(60);
    localStorage.setItem('expira', fecha.getTime().toString());
  }

  leerToke(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean{
    if(this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expitaDate = new Date();
    expitaDate.setTime(expira);

    if(expitaDate > new Date()){
      return true;
    }else{
      return false;
    }
  }
}
