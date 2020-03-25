import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { Validaciones } from './validaciones';

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
  archivosCompletos: boolean = false;
  archivosCorrecto: boolean = true;
  respuestaSolicitud: boolean = true;
  respuestaDescarga: boolean = true;
  errorConexion: boolean = false;


  //respuestas
  listaRFCs;
  listaSolicitudes;
  datosSolicitud: any;
  mensaje: string = "Falta un archivo";
  mensajeDescarga: string; 
  validar = new Validaciones();
  
  constructor(private authService: AuthService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
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

  get getArchivoCorrecto(){
    return this.archivosCorrecto;
  }

  get getRespuestaSolicitud(){
    return this.respuestaSolicitud;
  }

  get getRespuestaDescarga(){
    return this.respuestaDescarga;
  }

  get getErroConexion(){
    return this.errorConexion;
  }

  crearFormulario(){
    this.form = this.fb.group({
      rfc: ['', [Validators.required] ],
      fecha_ini: [this.fechaActual(), Validators.required],
      hora_ini: ['00:00:00', Validators.required],
      fecha_fin: [this.fechaActual(), Validators.required],
      hora_fin: ['23:59:59', Validators.required],
      origen: ['emisor'],
      tipo: ['XML'],
      password: ['', [Validators.required, Validators.minLength(4)] ],
    });
  }

  listarRFCs(clave: string){
    this.errorConexion = false;
    
    this.authService.listarRFCs(clave).subscribe( (data: any) => {
      console.log(data);
      data.resp ? this.listaRFCs = data.msg : this.listaRFCs = [];
    },(err: HttpErrorResponse) => {
      console.log("Error del servidor");
      this.errorConexion = true;
    });
  }

  listarSolicitudes(rfc: string){
    this.errorConexion = false;
    
    this.authService.getSolicitudes(rfc).subscribe( (data: any ) => {
      console.log(data);
      data.resp ? this.listaSolicitudes = data.msg : this.listaSolicitudes = [];
    },(err: HttpErrorResponse) => {
      console.log("Error del servidor");
      this.errorConexion = true;
    });
  }

  solicitarDescarga(){
    this.fechaNoValida = false;
    this.archivosCompletos = false; 
    this.errorConexion = false; 

    if(this.form.invalid){
      console.log("no valido");
      Object.values(this.form.controls).forEach( control => {
        control.markAsTouched();
      })
      return;
    }

    if(this.form.controls.fecha_fin.value < this.form.controls.fecha_ini.value){
      console.log("Fecha incorrecta");
      this.fechaNoValida = true;
      return;
    }
    
    if( this.cerBase64 === "" || this.keyBase64 === ""){
      console.log("Falta archivo");
      this.archivosCompletos = true;
      return;
    }

    this.datos = this.form.value;
    this.datos.cer_file = this.cerBase64;
    this.datos.key_file = this.keyBase64;
    console.log(this.datos);

    this.authService.solicitarDescarga(this.datos).subscribe(data => {
      this.datosSolicitud = data;
      this.respuestaSolicitud = this.datosSolicitud.resp;
      if(this.respuestaSolicitud){
        console.log(this.datosSolicitud);
        alert("Solicitud exitosa. Id Solocitud: " + this.datosSolicitud.msg);
        this.listarSolicitudes('KSY010331243');
      }else{
        this.mensaje = this.datosSolicitud.msg;
        console.log(this.datosSolicitud);
      }
      
      
    },(err: HttpErrorResponse) => {
      console.log("Error del servidor");
      this.errorConexion = true;
    });
    
  }

  descargarXML(id_solicitud: string){
    this.errorConexion = false;
    this.datosDescarga.id_solicitud = id_solicitud;
    this.datosDescarga.cer_file = this.cerBase64;
    this.datosDescarga.key_file = this.keyBase64;
    this.datosDescarga.password = this.form.get('password').value;
    this.datosDescarga.rfc = this.form.get('rfc').value;

    console.log(this.datosDescarga);

    this.authService.descargarXML(this.datosDescarga).subscribe( (data: any) => {
      console.log(data);
      
      if(data.resp == true){
        this.respuestaDescarga = true;
        var blob = this.base64ToBlob(data.msg);
        saveAs(blob, "file_xml.zip");
      }else{
        this.mensajeDescarga = data.msg;
        this.respuestaDescarga = false;
        alert(data.msg);
      }
    },(err: HttpErrorResponse) => {
      console.log("Error del servidor");
      this.errorConexion = true;
    });
  }

  public base64ToBlob(b64Data, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); 
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  private asignar_cer(fileInput: any){
    let arreglo = [];
    if(fileInput.target.files.length == 0)
      return;

    if(this.validarArchivo(fileInput.target.files[0].name, "cer")){
      const reader = new FileReader();
            reader.onload = (e: any) => {
              arreglo = e.target.result.split(",");
              this.cerBase64 = arreglo[1];
              this.archivosCorrecto = true;
            };

        reader.readAsDataURL(fileInput.target.files[0]);
    }else{
      this.cerBase64 = "";
      this.archivosCorrecto = false;
      console.log("No valido");
    }
  }

  private asignar_key(fileInput: any){
    let arreglo = [];
    if(fileInput.target.files.length == 0)
      return;

    if(this.validarArchivo(fileInput.target.files[0].name, "key")){
      const reader = new FileReader();
            reader.onload = (e: any) => {
              arreglo = e.target.result.split(",");
              this.keyBase64 = arreglo[1];
              this.archivosCorrecto = true;
            };

        reader.readAsDataURL(fileInput.target.files[0]);
    }else{
      this.keyBase64 = "";
      this.archivosCorrecto = false;
      console.log("No valido"); 
    }

    
  }

  private validarArchivo(name, extensionValida){
    let extesion = name.split(".");

    if( extesion[extesion.length - 1 ] === extensionValida){
      return true;
    }else{
      return false;
    }
  }

  private fechaActual (): string{
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();

    var diaSalida = dia.toString();
    var mesSalida = mes.toString(); 
    if(dia<10){
      diaSalida ='0'+ dia; //agrega cero si el menor de 10
    }
    if(mes<10){
      mesSalida ='0'+ mes
    }

    return anio + "-" + mesSalida + "-" + diaSalida;
  }

}
