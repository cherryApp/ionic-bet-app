import { Component, Output } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { AmountService } from '../../services/amount.service';
import { Device } from '@ionic-native/device';
import { Contacts } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  amount: number = 0;
  @Output() debug: any = {};
  @Output() phrase: string = "";

  constructor(public navCtrl: NavController, public storage: StorageService,
            public alertCtrl: AlertController,
            public amountService: AmountService,
            public device: Device,
            public contacts: Contacts) {
              this.initPage();
  }

  initPage() {
    this.amountService.amountSubject.subscribe( amount => {
      this.amount = amount;
    });

    // this.debug = this.device.uuid;
  }

  startFind() {
    this.contacts.find(["displayName"], {
      filter: this.phrase,
      hasPhoneNumber: true
    })
      .then( (value) => {
        this.debug = value.length;
      });
  }

  resetStorage() {
    let confirm = this.alertCtrl.create({
      title: 'Adatok törlése',
      message: 'Biztosan törli az adatokat? A művelet nem vonható vissza.',
      buttons: [
        {
          text: 'Mégsem',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            this.storage.storage.clear();
            this.initPage();
          }
        }
      ]
    });
    confirm.present();
  }

}
