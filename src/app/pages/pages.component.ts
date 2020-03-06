import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  sliderDesplegado: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleSlider(){

    if(this.sliderDesplegado === true){
      this.sliderDesplegado = false;

    }else{
      this.sliderDesplegado = true;

    }



  }

}
