import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  items: FirebaseListObservable < any[] > ;

  constructor(public navCtrl: NavController, af: AngularFire, private _auth: AuthService) {
    this.items = af.database.list('/items');
  }

  ionViewWillEnter() {
    this._auth.getAuth()
      .subscribe((data) => {
        if (data !== null) {
          this.navCtrl.setRoot(TabsPage)
        }
      })
  }

  login(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ", this._auth.displayName());

    this.navCtrl.setRoot(TabsPage)
  }

}
