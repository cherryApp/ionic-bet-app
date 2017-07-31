import { Component, Output } from "@angular/core";
// import { NavController } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { AmountService } from "../../services/amount.service";
// import { Device } from '@ionic-native/device';
import { Contacts } from "@ionic-native/contacts";
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  amount: number = 0;
  @Output() debug: any = {};
  @Output() phrase: string = "";

  constructor(
    // public navCtrl: NavController,
    public storage: StorageService,
    public alertCtrl: AlertController,
    public amountService: AmountService,
    public translate: TranslateService,
    // public device: Device,
    public contacts: Contacts
  ) {
    this.initPage();
  }

  initPage() {
    this.amountService.amountSubject.subscribe(amount => {
      this.amount = amount;
    });

    // this.debug = this.device.uuid;
  }

  startFind() {
    this.contacts
      .find(["displayName"], {
        filter: this.phrase,
        hasPhoneNumber: true
      })
      .then(value => {
        this.debug = value.length;
      });
  }

  showAmountPrompt() {
    let prompt = this.alertCtrl.create({
      title: this.translate.getOne("UPLOAD"),
      message: this.translate.getOne("TOP_UP_MESSAGE"),
      inputs: [
        {
          name: "addAmount",
          placeholder: this.translate.getOne("AMOUNT")
        }
      ],
      buttons: [
        {
          text: this.translate.getOne("CANCEL"),
          handler: data => {
            // console.log("Cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: data => {
            let a = data.addAmount;
            this.amountService.addAmount( parseInt(a) );
          }
        }
      ]
    });
    prompt.present();
  }

  resetStorage() {
    let confirm = this.alertCtrl.create({
      title: "Adatok törlése",
      message: "Biztosan törli az adatokat? A művelet nem vonható vissza.",
      buttons: [
        {
          text: "Mégsem",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Agree clicked");
            this.storage.storage.clear();
            this.initPage();
          }
        }
      ]
    });
    confirm.present();
  }
}
