import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-rfc',
  templateUrl: './alta-rfc.component.html',
  styleUrls: ['./alta-rfc.component.css']
})
export class AltaRFCComponent implements OnInit {


  nuevoRFCForm: FormGroup;
  files: any;
  filestring: string;
  cer: string = '';
  key: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.nuevoRFCForm = this.fb.group({
      rfc: new FormControl('', [Validators.required]),
      razon: new FormControl('', [Validators.required]),
    })

  }

  agregarNuevoRFC(){

    if(this.cer != '' && this.key != ''){
      
    }


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
