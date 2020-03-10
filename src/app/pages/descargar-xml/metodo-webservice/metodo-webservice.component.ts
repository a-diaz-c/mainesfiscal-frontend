import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-metodo-webservice',
  templateUrl: './metodo-webservice.component.html',
  styleUrls: ['./metodo-webservice.component.css']
})
export class MetodoWebserviceComponent implements OnInit {

  datos = {
    rfc: "",
    cer_file: "",
    key_file: "",
    password: "",
    fecha_ini: "",
    fecha_fin: "",
    hora_ini: "",
    hora_fin: "",
    origen: "",
    tipo: ""
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  solicitarDescarga(){
    this.authService.solicitarDescarga(this.datos).subscribe(data => {

    }, (err: HttpErrorResponse) => {
      console.log(`Error servidor remoto. ${err.status} # ${err.message}`)
    });
  }

}
