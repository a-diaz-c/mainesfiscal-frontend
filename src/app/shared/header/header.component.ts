import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() headerToggleMenuEvent = new EventEmitter();


  oculto: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSliderMenu(){
    this.headerToggleMenuEvent.emit();
  }

  mover(){
    if(this.oculto)
      this.oculto = false;
    else
      this.oculto = true;
  }

}
