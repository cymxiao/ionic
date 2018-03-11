import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public itemList: Array<Object>;

    public constructor(public navController: NavController, private database: DatabaseProvider) {
        this.itemList = [];
    }

    public
     onPageDidEnter() {
        this.load();
    }

    public load() {
        this.database.getPeople().then((result) => {
            this.itemList = <Array<Object>> result;
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }

    public create(firstname: string, lastname: string) {
        this.database.createPerson(firstname, lastname).then((result) => {
          console.log('creare a new user');
            this.load();
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }

}
