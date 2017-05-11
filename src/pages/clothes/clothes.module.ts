import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Clothes } from './clothes';

@NgModule({
  declarations: [
    Clothes,
  ],
  imports: [
    IonicPageModule.forChild(Clothes),
  ],
  exports: [
    Clothes
  ]
})
export class ClothesModule {}
