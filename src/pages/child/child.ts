import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the Child page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-child',
    templateUrl: 'child.html'
})
export class ChildPage {
    preferences: FirebaseObjectObservable < any > ;
    child: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
        this.preferences = af.database.object('/preferences/' + this.navParams.data.$key);
        this.child = {}
    }

    ionViewDidLoad() {
        this.child = this.navParams.data;
    }

}
