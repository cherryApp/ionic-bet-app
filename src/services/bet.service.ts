import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Subject } from "rxjs/Subject";
import { Bet } from "../models/bet";
import { AmountService } from "./amount.service";

@Injectable()
export class BetService {
  currentBettings: Array<Bet> = [];
  subject: Subject<Bet[]> = new Subject();

  constructor(
    public storageService: StorageService,
    public amountService: AmountService
  ) {
    this.getBettings();
  }

  getBettings() {
    this.storageService.getObject("bettings").then(bettings => {
      this.currentBettings = bettings;
      console.log("getBettings", bettings);
      this.subject.next(this.currentBettings);
    });
  }

  addBet(bet: Bet): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storageService.getObject("bettings").then(bettings => {
        if (!bettings) {
          bettings = [];
        }

        bettings.push(bet);
        this.storageService.setObject("bettings", bettings).then(res => {
          this.amountService.addAmount(bet.amount * -1);
          this.getBettings();
          resolve(true);
        });
      });
    });
  }
}
