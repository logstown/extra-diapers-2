import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DiaperBrands } from '../diaper-brands/diaper-brands'
import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Generated class for the Offering page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-offering',
  templateUrl: 'offering.html',
})
export class Offering {
  items: FirebaseListObservable < any >

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private af: AngularFire, private _auth: AuthService) {
      let uid = _auth.getUid()

      this.items = af.database.list('offering/' + uid)
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Offering');
  }

  addItem() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add Item',
      buttons: [{
        text: 'Diapers',
        handler: () => {
          this.navCtrl.push(DiaperBrands);
        }
      }, {
        text: 'Formula',
        handler: () => {
          console.log('Archive clicked');
        }
      }, {
        text: 'Clothes',
        handler: () => {
          console.log('Archive clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    actionSheet.present();
  }

  getIcon(item) {
    switch (item.item) {
      case 'diapers':
        return 'egg'

      case 'formula':
        return 'water'

      case 'clothes':
        return 'shirt'
    }
  }

}
