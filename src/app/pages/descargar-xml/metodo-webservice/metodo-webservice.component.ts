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

  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
    this.datos.rfc = "KSY010331243";
    this.datos.password = "kingosys";
    this.datos.fecha_ini = "2020-01-01";
    this.datos.fecha_fin = "2020-01-25";
    this.datos.hora_ini = "00:00:00";
    this.datos.hora_fin = "23:00:40";
    this.datos.origen = "emisor";
    this.datos.tipo ="XML";
    //this.datos.cer_file = this.codificarArchivo(file);
    //this.datos.key_file = this.codificarArchivo(file);
  }

  solicitarDescarga(){
    this.authService.solicitarDescarga(this.datos).subscribe(data => {

    }, (err: HttpErrorResponse) => {
      console.log(`Error servidor remoto. ${err.status} # ${err.message}`)
    });
  }

  private codificarArchivo(fileInput: any){
    let arreglo = [];
      const reader = new FileReader();
            reader.onload = (e: any) => {
              arreglo = e.target.result.split(",");
              console.log(arreglo[1]);
            };

        reader.readAsDataURL(fileInput.target.files[0]);

        return arreglo[1];
  }

  private validarArchivos(fileInput: any){
    
  }

}
