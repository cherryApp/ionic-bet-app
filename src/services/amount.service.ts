import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Subject } from "rxjs/Subject";


@Injectable()
export class AmountService {

  currentAmount: number = 0;
  amountSubject: Subject<number> = new Subject();

  constructor(public storageService: StorageService) {
    this.getAmount();
  }

  checkAmount(): number {
    return this.currentAmount;
  }

  getAmount() {
    this.storageService.getValue("amount")
      .then( amount => {
        if (!amount) {
          amount = 250000;
          this.storageService.setValue("amount", amount);
        }

        this.currentAmount = amount;
        this.amountSubject.next(this.currentAmount);
      });
  }

  addAmount(diff) {
    this.currentAmount += diff;
    this.storageService.setValue("amount", this.currentAmount)
      .then( () => {
         this.amountSubject.next(this.currentAmount);
      });
  }
}
