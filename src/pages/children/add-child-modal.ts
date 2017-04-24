import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


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