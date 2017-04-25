import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

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
	preferences: FirebaseObjectObservable<any>;
	sizeRange: any = {lower: 0, upper: 7}

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.child = this.navParams.data;
  	this.preferences = af.database.object('/preferences/' + this.child.$key)

    console.log(this.child)
  }

  ionViewDidLoad() {
  }

}
