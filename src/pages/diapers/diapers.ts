import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import _ from 'lodash';
import 'rxjs/add/operator/take'

/**
 * Generated class for the Diapers page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diapers',
  templateUrl: 'diapers.html',
})
export class Diapers {
  child: any
  userPrefs: FirebaseObjectObservable < any >
    sizePref: any = {}
  states: FirebaseObjectObservable < any >
    brandOptions: any = []
  sizeOptions: any[] = []
  sizeRange: { lower: number;upper: number } = { lower: 0, upper: 8 }
  isRange: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire) {
    this.child = this.navParams.data;
    this.userPrefs = af.database.object('/preferences/' + this.child.$key + '/diapers/')
    this.states = af.database.object('/preferences/' + this.child.$key + '/states/');

    this.userPrefs
      .subscribe(data => {
        var indices = _.chain(data.sizes)
          .values()
          .map(this.getSizeIndex)
          .value()

        this.sizeRange = {
          lower: +_.min(indices) || 0,
          upper: +_.max(indices) || 8
        }
      });

    af.database.list('/options/diapers/sizes')
      .subscribe(sizeOptions => {
        this.sizeOptions = sizeOptions;

        af.database.list('/preferences/' + this.child.$key + '/diapers/sizes')
          .subscribe(sizePrefs => {
            this.sizePref = _.first(sizePrefs) ? _.first(sizePrefs).$key : _.first(this.sizeOptions).$key

            this.isRange = sizePrefs.length > 1
          })
      })

    af.database.list('/options/diapers/brands')
      .subscribe(data => {
        this.brandOptions = data
      })
  }

  ionViewDidLoad() {}

  updateSizePref() {
    let sizes = {}

    sizes[this.sizePref] = true;

    console.log(this.isRange)

    if (this.isRange) {
      let sizePrefIndex = _.findIndex(this.sizeOptions, { '$key': this.sizePref });


      let upperSizes: any[] = _.filter(this.sizeOptions, (option, index) => {
        return index > sizePrefIndex
      })

      _.forEach(upperSizes, (size) => {
        sizes[size.$key] = true
      })
    }

    this.af.database.object('/preferences/' + this.child.$key + '/diapers/sizes').set(sizes)
  }

  getRange() {
    return this.getSizeText(this.sizeRange.lower) + ' - ' + this.getSizeText(this.sizeRange.upper);
  }

  getSizeText(num) {
    switch (num) {
      case 0:
        return 'Preemie';

      case 1:
        return 'Newborn';

      default:
        return (num - 1);
    }
  }

  getSizeIndex(size) {
    switch (size) {
      case 'Preemie':
        return 0;

      case 'Newborn':
        return 1;

      default:
        return size + 1;
    }
  }

  // setSizePreference(sizeOptions) {
  //   let range: any[] = _.range(this.sizeRange.lower, this.sizeRange.upper + 1);
  //   let namedRange = _.map(range, this.getSizeText)
  //   let rangeObject: any = _.toPlainObject(namedRange);

  //   var sizes = _.mapKeys(rangeObject, function(size) {
  //     return _.findKey(sizeOptions, _.partial(_.isEqual, size))
  //   })

  //   this.userPrefs.update({ sizes: sizes })
  // }

  addBrand(brand) {
    var brands = {}

    brands[brand.$key] = brand.$value;

    this.userPrefs.update({
        brands: brands
      })
      .then(() => {

      })
  }
}


// Brands needs to go back to an async array, then we're going to have to build a pipe to filter out the ones already in the user preferences
