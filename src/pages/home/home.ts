import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { AmountService } from '../../services/amount.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  amount: number = 0;

  constructor(public navCtrl: NavController, public storage: StorageService,
            public alertCtrl: AlertController,
            public amountService: AmountService) {
              this.initPage();
  }

  initPage() {
    this.amountService.amountSubject.subscribe( amount => {
      this.amount = amount;
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
