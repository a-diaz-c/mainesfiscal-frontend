import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  oculto: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  mover(){
    if(this.oculto)
      this.oculto = false;
    else
      this.oculto = true;
  }

}
