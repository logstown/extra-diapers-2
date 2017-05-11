import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import _ from 'lodash'

/**
 * Generated class for the ConfirmItem page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-confirm-item',
  templateUrl: 'confirm-item.html',
})
export class ConfirmItem {
  properties: any[]
  itemName: string
  amount: number

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire, private _auth: AuthService) {
    this.itemName = _.capitalize(this.navParams.data.item);
    this.amount = this.navParams.data.amount

    this.properties = _.map(this.navParams.data.properties, (value: any, label: string) => {
      return {
        label: _.capitalize(label),
        value: value.$value
      }
    })
  }

  listIt() {
    let uid = this._auth.getUid();

    this.navParams.data.properties = _.mapValues(this.navParams.data.properties, (value) => {
      return {
        value: value.$value,
        key: value.$key
      }
    })

    this.af.database.list('offering/' + uid).push(this.navParams.data)
      .then(() => {
        this.navCtrl.popToRoot();
      })
  }

}
