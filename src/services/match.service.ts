import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class MatchService {
  endPoint: string = "https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json";
  items: Array<object> = [];

  constructor(private http: Http) {

  }

  getAll(): Promise<any> {
    return new Promise( (resolve, reject) => {
      if (this.items.length > 0) {
        return resolve(this.items);
      }

      this.http.get(this.endPoint)
        .forEach( res => {
          this.items = res.json().rounds;
          resolve(this.items);
        });
    });
  }
}
