import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlNode = 'http://localhost:3800/api/';
  private urlJava = 'http://maines-rest.ddns.net:8080/mainesWeb/';
  userToken: String;
  user: UsuarioModel;

  constructor( private http: HttpClient ) { this.userToken = "" }

  listalocalizados(rfc: string){
    return this.http.get(this.urlNode + "buscar/listalocalizados/" + rfc);
  }

  lista69(rfc: string){
    return this.http.get(this.urlNode + "buscar/lista69/" + rfc);
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
        'Access-Control-Allow-Origin':'*',
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(usuario.usuario + ':' + usuario.password)
      })
    };
    return this.http.get(this.urlJava + "recursos/usuarios/login", headerOptions)
            .pipe(
              map(resp => {
                this.guardarDatosUsuario(resp);
              })
            );
  }

  solicitarDescarga(datos){
    const headerOptions  = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'Content-Type',
        'Content-Type':  'application/json',
      })
    };

    return this.http.post(this.urlJava + "/recursos/co/solicitud", datos, headerOptions);
  }

  revisarEstatus(){

  }

  descargarXLM(){

  }

  guardarDatosUsuario(datos: any){
    localStorage.setItem('rfc', datos.msg.rfc);
    localStorage.setItem('razon_social', datos.msg.razon_social);
    localStorage.setItem('clave_usuario', datos.msg.clave_usuario);
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
