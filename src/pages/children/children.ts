import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { ChildPage } from '../child/child';
import { AddChildModalPage } from './add-child-modal';
import moment from 'moment';

/*
  Generated class for the Children page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-children',
  templateUrl: 'children.html'
})
export class ChildrenPage {
  afChildren: FirebaseListObservable < any[] >
    children: any[]
  childPreferences: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public af: AngularFire, private _auth: AuthService) {
    let uid = _auth.getUid()

    this.afChildren = af.database.list('/children/' + uid);
    this.childPreferences = [];
  }

  ionViewDidLoad() {
    this.afChildren
      .subscribe(data => {
        this.children = data

        this.children.forEach((child) => {
          this.childPreferences[child.$key] = this.af.database.object('/preferences/' + child.$key)
            // .subscribe(prefData => {
            //   this.childPreferences[child.$key] = prefData
            // })
        })
      })
  }

  addChild() {
    let modal = this.modalCtrl.create(AddChildModalPage);
    modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        this.afChildren.push(data)
      }
    });
  }

  getAge(dob) {
    let yearsOld = moment().diff(dob, 'years');

    if (yearsOld < 2) {
      return 'Age: ' + moment().diff(dob, 'months') + ' months'
    } else {
      return 'Age: ' + yearsOld;
    }
  }

  goToChild(child) {
    console.log(child.$key)
    this.navCtrl.push(ChildPage, child)
  }

  getPreferenceState(child, entity) {
    let preference = this.childPreferences[child.$key];

    if (!preference) {
      return '';
    }

    if (!preference[entity] || !preference[entity].state) {
      return 'Off'
    } else {
      return 'On';
    }
  }

  toggleExpand(childToToggle) {
    this.children.forEach(child => {
      if (childToToggle.$key === child.$key) {
        setTimeout(() => {
          childToToggle.expanded = !childToToggle.expanded
        }, 200)
      } else {
        child.expanded = false;
      }
    })
  }

}
