import { Component, Output, OnInit } from "@angular/core";
import { ModalController, NavParams, ViewController } from "ionic-angular";
import { StorageService } from '../../services/storage.service';
import { Bet } from '../../models/bet';
import { AmountService } from '../../services/amount.service';

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
export class BetModalFormComponent implements OnInit {

  matchesDate: string;
  match: any = {};
  currentAmount: number = 0;

  @Output() winner: string = "";
  @Output() amount: number = 0;

  constructor(public params: NavParams, public viewCtrl: ViewController,
              public modalController: ModalController,
              public storageService: StorageService,
              public amountService: AmountService) {
    this.match = this.params.get("match");
  }

  ngOnInit() {
    this.amountService.amountSubject.subscribe( amount => {
      this.currentAmount = amount;
    })
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
            this.amountService.addAmount( (this.amount*-1) );
            this.dismiss();
          });
      });
  }

  manageAmount(amount): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.storageService.getValue("amount").then( currentAmount => {
        currentAmount += amount;
        this.storageService.setValue("amount", currentAmount).then( () => {
          resolve(true);
        });
      });
    })

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
