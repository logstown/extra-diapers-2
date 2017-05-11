import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaperSizes } from './diaper-sizes';

@NgModule({
  declarations: [
    DiaperSizes,
  ],
  imports: [
    IonicPageModule.forChild(DiaperSizes),
  ],
  exports: [
    DiaperSizes
  ]
})
export class DiaperSizesModule {}
