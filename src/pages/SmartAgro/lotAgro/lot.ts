import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider} from '../../../providers/database/database';
import { HomePage } from '../../home/home';

@Component({
  selector: 'page-lot',
  templateUrl: 'lot.html'
})
export class LotPage {
	lots = [];
	lot = {};
  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider) {
  	this.databaseProvider.getDatabaseState().subscribe(rdy => {
  		if(rdy){
  			this.loadLotData();
  		} 
  	})
  }

  loadLotData(){
  	this.databaseProvider.getAllLots().then(data => {
  		this.lots = data;
  	});
  }

  addLot(){
  	this.databaseProvider.addLot(this.lot['name'],parseInt(this.lot['ad_org_id']))
  	.then(data =>{
  		this.loadLotData();
  	});
  	this.lot={};
  }

  newLot(){
    
  }

  deleteLot(){

  }

  
}