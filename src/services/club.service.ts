import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ClubService {
  clubsUrl: string = "https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.clubs.json";
  clubs: Array<object> = [];

  constructor(private http: Http) {

  }

  getAll(): Promise<object> {
    return new Promise( (resolve, reject) => {
      if (this.clubs.length > 0) {
        return resolve(this.clubs);
      }

      this.http.get(this.clubsUrl)
        .forEach( res => {
          this.clubs = res.json().clubs;
          resolve(this.clubs);
        });
    });
  }
}
