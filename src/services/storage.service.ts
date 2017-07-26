import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageService {
  constructor(private storage: Storage) {}

  setValue(key, value): Promise<any> {
    return this.storage.set(key, value);
  }

  getValue(key): Promise<any> {
    return this.storage.get(key);
  }

  setObject(key, obj): Promise<any> {
    return new Promise( (resolve, reject) => {
      try {
        obj = JSON.stringify(obj);
      } catch (e) {
        return reject(e);
      }

      this.setValue(key, obj)
        .then( () => {
          resolve(true);
        });
    });
  }

  getObject(key): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.getValue(key)
        .then( value => {
          value = JSON.parse(value);
          resolve(value);
        });
    });
  }
}
