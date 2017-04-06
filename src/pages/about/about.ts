import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DiapersConfigPage } from '../pages';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	diapers:boolean = true
	formula:boolean = true
	clothes:boolean = true

  constructor(public navCtrl: NavController) {

  }

  getNext() {
  	if(this.diapers) {
  		this.navCtrl.push(DiapersConfigPage)
  	}
  }

}
