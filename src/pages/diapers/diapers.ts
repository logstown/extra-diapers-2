import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  sizePref: any = {}
  states: FirebaseObjectObservable < any >
    brandOptions: FirebaseListObservable < any >
    brandsPref: any = []
  sizeOptions: any[] = []
  sizeRange: { lower: number;upper: number } = { lower: 0, upper: 8 }
  sizeQuantity: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire, public loadingCtrl: LoadingController) {
    this.child = this.navParams.data;
    this.states = af.database.object('/preferences/' + this.child.$key + '/states/');

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    af.database.list('/options/diapers/sizes')
      .subscribe(sizeOptions => {
        this.sizeOptions = sizeOptions;

        af.database.list('/preferences/' + this.child.$key + '/diapers/sizes')
          .subscribe(sizePrefs => {
            this.sizePref = _.first(sizePrefs) ? _.first(sizePrefs).$key : _.first(this.sizeOptions).$key

            this.sizeQuantity = sizePrefs.length > 1 ? 'range' : 'exactly';

            loading.dismiss();
          })
      })

    this.brandOptions = af.database.list('/options/diapers/brands')

    af.database.list('/preferences/' + this.child.$key + '/diapers/brands')
      .subscribe(data => {
        this.brandsPref = data
      })
  }

  ionViewDidLoad() {}

  updateSizePref() {
    let sizes = {}

    sizes[this.sizePref] = true;

    if (this.sizeQuantity === 'range') {
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

  addBrand(brand) {
    this.af.database.object('/preferences/' + this.child.$key + '/diapers/brands/' + brand.$key)
      .set(brand.$value)
  }

  removeBrand(brand) {
    this.af.database.object('/preferences/' + this.child.$key + '/diapers/brands/' + brand.$key)
      .remove()
  }
}
