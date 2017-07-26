import { Component, Output } from '@angular/core';
import { ModalController, NavParams, ViewController } from "ionic-angular";
import { StorageService } from '../../services/storage.service';
import { Bet } from '../../models/bet';

/**
 * Generated class for the BetModalFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'bet-modal-form',
  templateUrl: 'bet-modal-form.html'
})
export class BetModalFormComponent {

  matchesDate: string;
  match: any = {};

  @Output() winner: string = "";
  @Output() amount: number = 0;

  constructor(public params: NavParams, public viewCtrl: ViewController,
              public modalController: ModalController,
              public storageService: StorageService) {
    this.match = this.params.get("match");
  }

  saveBetting() {
    let bet = new Bet(this.match, this.winner, this.amount);
    let d = new Date();
    this.storageService.getObject("bettings")
      .then( bettings => {
        if (!bettings) {
          bettings = [];
        }

        bettings.push(bet);
        this.storageService.setObject("bettings", bettings)
          .then( res => {
            this.dismiss();
          });
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
