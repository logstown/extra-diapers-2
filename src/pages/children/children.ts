import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ChildPage } from '../child/child';
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
    children: any[]

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

    ionViewDidLoad() {
        this.children = []
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
        this.navCtrl.push(ChildPage)
    }

}

@Component({
    templateUrl: 'add-child-modal.html'
})
export class AddChildModalPage {
    name: string
    dob: string
    sex: string

    constructor(public viewCtrl: ViewController) {}

    ionViewDidLoad() {
        this.sex = 'u'
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    save() {
        this.viewCtrl.dismiss({
            name: this.name,
            dob: this.dob,
            sex: this.sex
        })
    }
}
