import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ConfirmItem } from '../confirm-item/confirm-item'
import _ from 'lodash'

/**
 * Generated class for the DiaperSizes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diaper-sizes',
  templateUrl: 'diaper-sizes.html',
})
export class DiaperSizes {

  sizes: FirebaseListObservable < any >

    constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire, public alertCtrl: AlertController) {
      this.sizes = af.database.list('options/diapers/sizes');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaperBrands');
  }

  goToNext(item) {
    this.navParams.data.properties.size = item;

    let prompt = this.alertCtrl.create({
      title: 'How Many?',
      message: "Enter the number of diapers",
      inputs: [{
        name: 'amount',
        // placeholder: 'Number',
        type: 'number'
      }],
      buttons: [{
        text: 'Cancel',
      }, {
        text: 'Finish',
        handler: data => {
          _.assign(this.navParams.data, {
            amount: data.amount,
            item: 'diapers'
          })

          this.navCtrl.push(ConfirmItem, this.navParams.data)
        }
      }]
    });

    prompt.present();
  }

}
