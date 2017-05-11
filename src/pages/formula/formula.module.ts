import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Formula } from './formula';

@NgModule({
  declarations: [
    Formula,
  ],
  imports: [
    IonicPageModule.forChild(Formula),
  ],
  exports: [
    Formula
  ]
})
export class FormulaModule {}
