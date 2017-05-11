import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import _ from 'lodash';

/**
 * Generated class for the Clothes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-clothes',
  templateUrl: 'clothes.html',
})
export class Clothes {
  child: any
  states: FirebaseObjectObservable < any >
    sizeRanges: any[] = []
  sizeRange: string
  preferences: any = {}
  clothesUrl: string
  sizes: any[]
  types: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire) {
    this.child = this.navParams.data
    this.clothesUrl = '/preferences/' + this.child.$key + '/clothes/';
    this.states = af.database.object('/preferences/' + this.child.$key + '/states/');

    af.database.object('/options/clothes')
      .subscribe(data => {
        let prefs = ['sizes', 'types']

        _.forEach(prefs, pref => {
          this[pref] = _.map(data[pref], this.toArray)
        })

        this.sizeRanges = _.chain(data.sizes)
          .map('type')
          .uniq()
          .value()

        af.database.object(this.clothesUrl)
          .subscribe(data => {

            _.forEach(prefs, pref => {
              this.preferences[pref] = _.map(this[pref], (item: any) => {
                let checked = (data[pref] && data[pref][item.key]) || false

                return {
                  value: item.value,
                  key: item.key,
                  checked: checked
                }
              })
            })

            let atLeastOneSize: any = _.find(this.preferences.sizes, 'checked');

            this.sizeRange = atLeastOneSize ? atLeastOneSize.value.type : this.sizeRanges[0];
          })
      })
  }

  toArray(value, key) {
    return {
      key: key,
      value: value
    }
  }

  selectAll(pref) {
    let fbLocation = this.af.database.object(this.clothesUrl + pref);

    if (this.allSelected(pref)) {
      fbLocation.remove();
    } else {
      let allChecked = {};
      let filteredSizes = this.getFilteredSizes(this.preferences[pref])

      _.forEach(filteredSizes, item => {
        allChecked[item.key] = true
      })

      fbLocation.set(allChecked);
    }
  }

  removeAllSizes() {
    this.af.database.object(this.clothesUrl + 'sizes').remove();
  }

  allSelected(pref) {
    return _.every(this.getFilteredSizes(this.preferences[pref]), 'checked')
  }

  updateOne(item, pref) {
    let fbLocation = this.af.database.object(this.clothesUrl + pref + '/' + item.key)

    if (item.checked) {
      fbLocation.set(true);
    } else {
      fbLocation.remove();
    }
  }

  getFilteredSizes(sizes: any) {
    return _.filter(sizes, (item: any) => {
      return item.value.type == this.sizeRange;
    })
  }

}
