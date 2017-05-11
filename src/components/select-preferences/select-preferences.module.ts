import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPreferences } from './select-preferences';

@NgModule({
  declarations: [
    SelectPreferences,
  ],
  imports: [
    IonicPageModule.forChild(SelectPreferences),
  ],
  exports: [
    SelectPreferences
  ]
})
export class SelectPreferencesModule {}
