import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PAGES_ROUTES } from '../pages/pages.route';



@NgModule({
  declarations: [SliderComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    PAGES_ROUTES
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent
  ]
})
export class SharedModule { }
