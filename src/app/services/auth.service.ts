import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3800/api/';

  constructor( private http: HttpClient ) { }

  listalocalizados(rfc: string){
    return this.http.get(this.url + "buscar/listalocalizados/" + rfc);
  }

  lista69(rfc: string){
    return this.http.get(this.url + "buscar/lista69/" + rfc);
  }
}
