import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DiaperSizes } from '../diaper-sizes/diaper-sizes'

/**
 * Generated class for the DiaperBrands page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diaper-brands',
  templateUrl: 'diaper-brands.html',
})
export class DiaperBrands {
  brands: FirebaseListObservable < any >

    constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire) {
      this.brands = af.database.list('options/diapers/brands');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaperBrands');
  }

  goToNext(item) {
    this.navCtrl.push(DiaperSizes, { properties: { brand: item } }, { animation: 'ios-transition' });
  }

}
