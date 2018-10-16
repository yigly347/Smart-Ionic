import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LotPage } from '../SmartAgro/lotAgro/lot';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController) {

  }

  goLot(){
  	this.navCtrl.push(LotPage);
  }

  goCrop(){
  	//this.navCtrl.push(CropPage);
  }
  goTask(){
  	//this.navCtrl.push(TaskPage);
  }
}
