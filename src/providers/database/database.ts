import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class DatabaseProvider {
	database:SQLiteObject;
	private databaseReady: BehaviorSubject<boolean>;
  constructor(public http: Http, private sqlitePorter:SQLitePorter, private storage: Storage,private sqlite: SQLite, private platform:Platform) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
    	this.sqlite.create({
    		name: 'smarterp.db',
    		location: 'default'
    	})
    	.then((db:SQLiteObject) =>{
    		this.database =db;
    		this.storage.get('database_filled').then(val => {
    			if(val){
    				this.databaseReady.next(true);
    			}else{
    				this.fillDatabase();
    			}
    		})
    	});
    });
  }

  fillDatabase(){
  	this.http.get('assets/dbschema.sql')
  	.map(res => res.text())
  	.subscribe(sql => {
  		this.sqlitePorter.importSqlToDb(this.database,sql)
  		.then(data => {
  			this.databaseReady.next(true);
  			this.storage.set('database_filled',true);
  		})
  		.catch(e => console.log(e));
  	});
  }

  addLot(name, ad_org_id){
  	let data =  [name, ad_org_id];
  	return this.database.executeSql('INSERT INTO smj_lot(name,ad,org_id) VALUES (?,?)',data).then(res => {
  		return res;
  	});
  }

  getAllLots(){
  	return this.database.executeSql('SELECT * FROM smj_lot',[]).then(data =>{
  		let lots = [];
  		if(data.rows.length >0){
  			for(var i=0; i < data.rows.length; i++){
				lots.push({name:data.rows.item(i).name, ad_org_id:data.rows.item(i).ad_org_id})
  			}
  		}
  		return lots;
  	},err =>{
  		console.log('error ',err);
  		return [];
  	});
  }

  getDatabaseState(){
  	return this.databaseReady.asObservable();
  }

}
