import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from "ionic-angular";

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

  constructor(public params: NavParams, public viewCtrl: ViewController,
              public modalController: ModalController) {
    this.match = this.params.get("match");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
