import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
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
  userPreferencesObs: FirebaseObjectObservable < any >
    options: any = {};
  sizeRange: { lower: number;upper: number } = { lower: 0, upper: 8 }

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire) {
    this.child = this.navParams.data;
    this.userPreferencesObs = af.database.object('/preferences/' + this.child.$key + '/diapers')

    this.userPreferencesObs
      .subscribe(data => {
        console.log(data)
        var keys = _.keys(data.sizes)

        console.log(+_.first(keys))

        this.sizeRange = {
          lower: +_.first(keys) || 0,
          upper: +_.last(keys) || 8
        }

        console.log(this.sizeRange)

      });

    af.database.object('/options/diapers')
      .subscribe(data => {
        this.options = data;
        console.log(this.options)
      })
  }

  ionViewDidLoad() {
    // this.seedStuff();
  }

  seedStuff() {
    let everything = this.af.database.object('/').take(1)

    everything.subscribe(data => {

      console.log(data)

      let clothesSizes = this.af.database.list('/options/clothes/sizes');
      let clothesTypes = this.af.database.list('/options/clothes/types');
      let diaperBrands = this.af.database.list('/options/diapers/brands');
      let diaperSizes = this.af.database.list('/options/diapers/sizes');
      let formulaBrands = this.af.database.list('/options/formula/brands');
      let formulaStages = this.af.database.list('/options/formula/stages');
      let formulaTypes = this.af.database.list('/options/formula/types');

      data.clothes.sizes.forEach(size => {
        clothesSizes.push(size);
      })

      data.clothes.types.forEach(thing => {
        clothesTypes.push(thing);
      })

      data.diapers.brands.forEach(thing => {
        diaperBrands.push(thing);
      })

      data.diapers.sizes.forEach(thing => {
        diaperSizes.push(thing);
      })

      data.formula.brands.forEach(thing => {
        formulaBrands.push(thing);
      })

      data.formula.stages.forEach(thing => {
        formulaStages.push(thing);
      })

      data.formula.types.forEach(thing => {
        formulaTypes.push(thing);
      })
    })
  }

  getRange() {
    return this.getSizeText(this.sizeRange.lower) + ' - ' + this.getSizeText(this.sizeRange.upper);
  }

  getSizeText(num): string {
    if (Object.keys(this.options).length) {
      return this.options.sizes[num];
    }
  }

  setSizePreference() {
    let range: any[] = _.range(this.sizeRange.lower, this.sizeRange.upper)
    let rangeObject = _.toPlainObject(range);
    var sizes = _.chain(rangeObject)
      .invert()
      .mapValues(function() {
        return true;
      })
      .value()

    console.log(sizes)

    this.userPreferencesObs.update({ sizes: sizes })
  }

}
