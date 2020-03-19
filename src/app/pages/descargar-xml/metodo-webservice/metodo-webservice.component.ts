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

  //para enviar en la peticion
  datos: any;
  cerBase64: String;
  keyBase64: String;

  //validacion
  fechaNoValida: boolean;
  archivosCompletos: boolean;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.crearFormulario();
    this.cerBase64 = "";
    this.keyBase64 = ""; 
    this.fechaNoValida = false;
    this.archivosCompletos = true;
  }

  ngOnInit() {
  }

  get fechasNoValidas(){
    return this.fechaNoValida;
  }

  get passwordNoValida(){
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  get rfcNoValido(){
    return this.form.get('RFC').invalid && this.form.get('RFC').touched;
  }

  get archivosIncompletos(){
    return this.archivosCompletos;
  }

  get horaInicialNoValida(){
    return this.form.get('hora_inicial').valid && this.form.get('hora_inicial').touched;
  }

  crearFormulario(){
    this.form = this.fb.group({
      RFC: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)] ],
      fecha_ini: ['', Validators.required],
      hora_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      hora_fin: ['', Validators.required],
      origen: ['emisor'],
      tipo: ['XML'],
      Pass: ['', [Validators.required, Validators.minLength(8)] ],
    });
  }

  solicitarDescarga(){
    this.fechaNoValida = false;
    this.archivosCompletos = true;

    console.log(this.form.controls);

    if( this.form.invalid ){
      console.log("formulario no valido");

      if(this.form.controls.fecha_final.value < this.form.controls.fecha_inicial.value){
        console.log("Fecha incorrecta");
        this.fechaNoValida = true;
        return;
      }

      return;
    }
    
    if( this.cerBase64 === "" || this.keyBase64 === ""){
      this.archivosCompletos = false;
      return;
    }
    this.datos = this.form.value;
    this.datos.CER_file = this.cerBase64;
    this.datos.Key_file = this.keyBase64;
    console.log(this.datos);

    this.authService.solicitarDescarga(this.datos).subscribe(data => {
      console.log(data);
    }, (err: HttpErrorResponse) => {
      console.log(`Error servidor remoto. ${err.status} # ${err.message}`)
    });
    
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

}
