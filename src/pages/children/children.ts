import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { AddChildModalPage } from './add-child-modal';
import { Diapers } from '../diapers/diapers'
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
  childEntityStates: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public af: AngularFire, private _auth: AuthService) {
    let uid = _auth.getUid()

    this.afChildren = af.database.list('/children/' + uid);
    this.childEntityStates = [];
  }

  ionViewDidLoad() {
    this.afChildren
      .subscribe(data => {
        this.children = data

        this.children.forEach((child) => {
          this.childEntityStates[child.$key] = this.af.database.object('/preferences/' + child.$key + '/states')
            .subscribe(prefData => {
              this.childEntityStates[child.$key] = prefData
            })
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

  goToEntity(child, entity) {
  	var navOptions = {
      animation: 'ios-transition'
 };

    switch(entity) {
     	case 'diapers':
     		this.navCtrl.push(Diapers, child, navOptions);
     		break;
     	case 'formula':
     		// this.navCtrl.push(FormulaPage, child.$key);
     		break;
     	case 'clothes':
     		// this.navCtrl.push(ClothesPage, child.$key);
     		break;	
    }
  }

  getEntityState(child, entity) {
    let entityStates = this.childEntityStates[child.$key];

    if (!entityStates) {
      return '';
    }

    return entityStates[entity] ? 'On' : 'Off';
  }

  toggleExpand(childToToggle) {
    this.children.forEach(child => {
      if (childToToggle.$key === child.$key) {
        setTimeout(() => {
          childToToggle.expanded = !childToToggle.expanded
        }, 100)
      } else {
        child.expanded = false;
      }
    })
  }

}
