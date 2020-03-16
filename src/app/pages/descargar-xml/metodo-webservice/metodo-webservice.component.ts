import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-metodo-webservice',
  templateUrl: './metodo-webservice.component.html',
  styleUrls: ['./metodo-webservice.component.css']
})
export class MetodoWebserviceComponent implements OnInit {

  form: FormGroup;

  datos: any;
  cerBase64: String;
  keyBase64: String;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.crearFormulario();
    this.cerBase64 = "";
    this.keyBase64 = ""; 
  }

  ngOnInit() {
  }

  crearFormulario(){
    this.form = this.fb.group({
      fecha_inicial: ['', Validators.required],
      hora_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required],
      hora_final: ['', Validators.required],
      origen: ['', Validators.required],
      tipo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  solicitarDescarga(){

    if((this.cerBase64 === "" || this.keyBase64 === "") || this.form.invalid ){
      console.log("formulario no valido")
      return;
    }

    console.log(this.form);

    this.datos = this.form.value;
    this.datos.cer_file = this.cerBase64;
    this.datos.key_file = this.keyBase64;
    console.log(this.datos);

    /*this.authService.solicitarDescarga(this.datos).subscribe(data => {

    }, (err: HttpErrorResponse) => {
      console.log(`Error servidor remoto. ${err.status} # ${err.message}`)
    });*/
    
  }


  private asignar_cer(fileInput: any){
    let arreglo = [];
      const reader = new FileReader();
            reader.onload = (e: any) => {
              arreglo = e.target.result.split(",");
              this.cerBase64 = arreglo[1];
            };

        reader.readAsDataURL(fileInput.target.files[0]);
  }

  private asignar_key(fileInput: any){
    let arreglo = [];
      const reader = new FileReader();
            reader.onload = (e: any) => {
              arreglo = e.target.result.split(",");
              this.keyBase64 = arreglo[1];
            };

        reader.readAsDataURL(fileInput.target.files[0]);
  }

  private codificarArchivo(fileInput: any){
    let arreglo = [];
      const reader = new FileReader();
            reader.onload = (e: any) => {
              arreglo = e.target.result.split(",");
              //console.log(arreglo[1]);
            };

        reader.readAsDataURL(fileInput.target.files[0]);
  }

  private validarArchivos(fileInput: any){
    
  }

}
