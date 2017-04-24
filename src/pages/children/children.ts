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
    children: FirebaseListObservable < any[] >

        constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, af: AngularFire, private _auth: AuthService) {
            let uid = _auth.getUid()

            this.children = af.database.list('/children/' + uid);
        }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChildrenPage');
    }

    addChild() {
        let modal = this.modalCtrl.create(AddChildModalPage);
        modal.present();

        modal.onDidDismiss(data => {
            if (data) {
                this.children.push(data)
            }
        });
    }

    getAge(dob) {
        let yearsOld = moment().diff(dob, 'years');

        if (yearsOld < 2) {
            return moment().diff(dob, 'months') + ' months'
        } else {
            return yearsOld + ' years';
        }
    }

    goToChild(child) {
        console.log(child.$key)
        this.navCtrl.push(ChildPage, child)
    }

}
