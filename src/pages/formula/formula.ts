import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import _ from 'lodash';

/**
 * Generated class for the Formula page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-formula',
  templateUrl: 'formula.html',
})
export class Formula {
  child: any
  states: FirebaseObjectObservable < any >
    brands: any[]
  stages: any[]
  types: any[]
  preferences: any = {}
  formulaUrl: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire) {
    this.child = this.navParams.data
    this.formulaUrl = '/preferences/' + this.child.$key + '/formula/';
    this.states = af.database.object('/preferences/' + this.child.$key + '/states/');

    af.database.object('/options/formula')
      .subscribe(data => {
        let prefs = ['stages', 'brands', 'types']

        _.forEach(prefs, pref => {
          this[pref] = _.map(data[pref], this.toArray)
        })

        af.database.object(this.formulaUrl)
          .subscribe(data => {

            _.forEach(prefs, pref => {
              this.preferences[pref] = _.map(this[pref], (item: any) => {
                let checked = (data[pref] && data[pref][item.key]) || false

                return {
                  name: item.value,
                  key: item.key,
                  checked: checked
                }
              })
            })
          })
      })
  }

  toArray(value, key) {
    return {
      key: key,
      value: value
    }
  }

}
