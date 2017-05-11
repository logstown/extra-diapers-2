import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaperBrands } from './diaper-brands';

@NgModule({
  declarations: [
    DiaperBrands,
  ],
  imports: [
    IonicPageModule.forChild(DiaperBrands),
  ],
  exports: [
    DiaperBrands
  ]
})
export class DiaperBrandsModule {}
