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
  cerBase64: string;
  keyBase64: string;
  datosDescarga = {
    id_solicitud: "",
    rfc:"",
    cer_file:"",
    key_file:"",
    password:""
  };

  //validacion
  fechaNoValida: boolean = false;
  archivosCompletos: boolean = true;
  respuestaSolicitud: boolean = true;

  //respuestas
  listaRFCs;
  listaSolicitudes;
  datosSolicitud: any;
  mensaje: string = "";

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.crearFormulario();
    this.cerBase64 = "";
    this.keyBase64 = ""; 

  }

  ngOnInit() {
    this.listarRFCs(localStorage.getItem('clave_cliente'));
    this.listarSolicitudes('KSY010331243');
  }

  get fechasNoValidas(){
    return this.fechaNoValida;
  }

  get passwordNoValida(){
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  get rfcNoValido(){
    return this.form.get('rfc').invalid && this.form.get('rfc').touched;
  }

  get archivosIncompletos(){
    return this.archivosCompletos;
  }

  get horaInicialNoValida(){
    return this.form.get('hora_inicial').valid && this.form.get('hora_inicial').touched;
  }

  crearFormulario(){
    this.form = this.fb.group({
      rfc: [localStorage.getItem('rfc'), [Validators.required] ],
      fecha_ini: ['', Validators.required],
      hora_ini: ['00:00:00', Validators.required],
      fecha_fin: ['', Validators.required],
      hora_fin: ['23:59:59', Validators.required],
      origen: ['emisor'],
      tipo: ['XML'],
      password: ['', [Validators.required, Validators.minLength(8)] ],
    });
  }

  listarRFCs(clave: string){
    this.authService.listarRFCs(clave).subscribe( (data: any) => {
      console.log(data);
      data.resp ? this.listaRFCs = data.msg : this.listaRFCs = [];
      
    });
  }

  listarSolicitudes(rfc: string){
    this.authService.getSolicitudes(rfc).subscribe( (data: any ) => {
      console.log(data);
      data.resp ? this.listaSolicitudes = data.msg : this.listaSolicitudes = [];
    });
  }

  solicitarDescarga(){
    this.fechaNoValida = false;
    this.archivosCompletos = true;

    console.log(this.form.controls);    

    if(this.form.controls.fecha_fin.value < this.form.controls.fecha_ini.value){
      console.log("Fecha incorrecta");
      this.fechaNoValida = true;
      return;
    }
    
    if( this.cerBase64 === "" || this.keyBase64 === ""){
      this.archivosCompletos = false;
      return;
    }

    this.datos = this.form.value;
    this.datos.cer_file = this.cerBase64;
    this.datos.key_file = this.keyBase64;
    console.log(this.datos);

    this.authService.solicitarDescarga(this.datos).subscribe(data => {
      this.datosSolicitud = data;
      this.respuestaSolicitud = this.datosSolicitud.resp;
      this.mensaje = this.datosSolicitud.mensaje;
      console.log(this.datosSolicitud);
      
    }, (err: HttpErrorResponse) => {
      console.log(`Error servidor remoto. ${err.status} # ${err.message}`)
    });
    
  }

  descargarXML(id_solicitud: string){
    this.datosDescarga.id_solicitud = id_solicitud;
    this.datosDescarga.cer_file = this.cerBase64;
    this.datosDescarga.key_file = this.keyBase64;
    this.datosDescarga.password = this.form.get('password').value;
    this.datosDescarga.rfc = this.form.get('rfc').value;

    console.log(this.datosDescarga);

    this.authService.descargarXML(this.datosDescarga).subscribe( data => {
      console.log(data);
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
