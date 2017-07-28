import { Component, Output, OnInit } from "@angular/core";
import { ModalController, NavParams, ViewController } from "ionic-angular";
import { StorageService } from '../../services/storage.service';
import { Bet } from '../../models/bet';
import { AmountService } from '../../services/amount.service';
import { BetService } from '../../services/bet.service';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'bet-modal-form',
  templateUrl: 'bet-modal-form.html'
})
export class BetModalFormComponent implements OnInit {

  matchesDate: string;
  match: any = {};
  currentAmount: number = 0;

  @Output() winner: string = "";
  @Output() amount: number = 0;

  constructor(public params: NavParams, public viewCtrl: ViewController,
              public modalController: ModalController,
              public storageService: StorageService,
              public amountService: AmountService,
              public betService: BetService,
              public vibration: Vibration) {
    this.match = this.params.get("match");
  }

  ngOnInit() {
    this.amountService.amountSubject.subscribe( amount => {
      this.currentAmount = amount;
    })
  }

  saveBetting() {
    let bet = new Bet(this.match, this.winner, this.amount);
    this.betService.addBet(bet).then( () => {
      this.vibration.vibrate(700);
      let _to = setTimeout( () => {
        clearTimeout(_to);
        this.dismiss();
      }, 800);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
