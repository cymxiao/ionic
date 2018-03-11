//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private storage: SQLite;
  private isOpen: boolean = false;

  public constructor() {
      if(!this.isOpen) {
          this.storage = new SQLite();
          this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
              this.storage.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", []);
              this.isOpen = true;
              console.log('data.db isOpen = true');
          });
      }
  }

  private initDB()
  {
    if(!this.isOpen) {
        this.storage = new SQLite();
        this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.storage.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", []);
            this.isOpen = true;
            console.log('data.db isOpen = true');
        });
    };
  }

  public getPeople() {
      return new Promise((resolve, reject) => {
          this.storage.executeSql("SELECT * FROM people", []).then((data) => {
              let people = [];
              if(data.rows.length > 0) {
                  for(let i = 0; i < data.rows.length; i++) {
                      people.push({
                          id: data.rows.item(i).id,
                          firstname: data.rows.item(i).firstname,
                          lastname: data.rows.item(i).lastname
                      });
                  }
              }
              resolve(people);
          }, (error) => {
              reject(error);
          });
      });
  }

  public createPerson(firstname: string, lastname: string) {
    console.log('firstname: ' + firstname);
    this.initDB();
      return new Promise((resolve, reject) => {
          this.storage.executeSql("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [firstname, lastname]).then((data) => {
              resolve(data);
          }, (error) => {
              reject(error);
          });
      });
  }

}
