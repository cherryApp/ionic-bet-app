import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class TranslateService {
  translate: object = {};
  lang: string = "hu";
  langDir: string = "../assets/lang/";

  constructor(public http: Http) {

  }

  getTranslates(): Promise<object> {
    return new Promise( (resolve, reject) => {
      this.http.get(this.generateUrl())
        .forEach( res => {
          this.translate = res.json();
          resolve(this.translate);
        });
    });
  }

  generateUrl(): string {
    return `${this.langDir}${this.lang}.json`;
  }
}
