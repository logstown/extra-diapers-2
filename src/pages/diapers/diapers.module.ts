import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Diapers } from './diapers';

@NgModule({
  declarations: [
    Diapers,
  ],
  imports: [
    IonicPageModule.forChild(Diapers),
  ],
  exports: [
    Diapers
  ]
})
export class DiapersModule {}
