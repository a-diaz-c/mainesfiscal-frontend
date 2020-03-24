import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alta-rfc',
  templateUrl: './alta-rfc.component.html',
  styleUrls: ['./alta-rfc.component.css']
})
export class AltaRFCComponent implements OnInit {


  usuarioid: string = '100';
  res: any= {};
  nuevoRFCForm: FormGroup;
  files: any;
  filestring: string;
  cer: string = '';
  key: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {

    this.nuevoRFCForm = this.fb.group({
      rfc: new FormControl('', [Validators.required]),
      razon: new FormControl('', [Validators.required]),
    })

    this.traerRfcs();

  }

  agregarNuevoRFC(){

    // if(this.cer != '' && this.key != ''){
      
    // }
    this.http.post("http://maines-rest.ddns.net:8080/mainesWeb/recursos/rfc/crear", {

      clave_cliente:"100",		
      rfc:this.nuevoRFCForm.value.rfc,		
      razon_social: this.nuevoRFCForm.value.razon,		
      cer_base64: this.cer,		
      key_base64: this.key
    }).subscribe(x => console.log(x));
    



  }


  traerRfcs(){
    this.http.get("http://maines-rest.ddns.net:8080/mainesWeb/recursos/rfc/lista/" + this.usuarioid)
    .subscribe((data) => this.res = data);
  }

  getFiles(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.cer = btoa(binaryString);  // Converting binary string data.

    console.log('esta es la cer');
    console.log(this.cer);
  }

  getFiles2(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }

  _handleReaderLoaded2(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.key = btoa(binaryString);  // Converting binary string data.

    console.log('esta es la key');
    console.log(this.key);
  }





  // handleUpload(event) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //       console.log(reader.result);
  //   };
  // }

}
