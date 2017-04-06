import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-diapers-config',
  templateUrl: 'diapers-config.html'
})
export class DiapersConfigPage {
  brands: FirebaseListObservable<any[]>
  sizes: FirebaseListObservable<any[]>

 yourBrands: Object = {};

  constructor(public navCtrl: NavController, af : AngularFire) {
    this.brands = af.database.list('/diapers/brands');
  }

  seeIt() {
    console.log(this.yourBrands)
  }

}