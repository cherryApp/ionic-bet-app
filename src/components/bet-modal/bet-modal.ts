import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from "ionic-angular";
import { BetModalFormComponent } from '../bet-modal-form/bet-modal-form';

/**
 * Generated class for the BetModalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'bet-modal',
  templateUrl: 'bet-modal.html'
})
export class BetModalComponent {

  matchesDate: string;
  matches: Array<any> = [];

  constructor(public params: NavParams, public viewCtrl: ViewController,
              public modalController: ModalController) {
    console.log('Hello BetModalComponent Component');
    this.matches = this.params.get("matches");
    this.matchesDate = this.matches[0].date;
  }

  startBet(match) {
    let betForm = this.modalController.create(BetModalFormComponent, {
      match: match
    });
    betForm.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
