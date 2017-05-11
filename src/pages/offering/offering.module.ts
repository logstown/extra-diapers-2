import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Offering } from './offering';

@NgModule({
  declarations: [
    Offering,
  ],
  imports: [
    IonicPageModule.forChild(Offering),
  ],
  exports: [
    Offering
  ]
})
export class OfferingModule {}
