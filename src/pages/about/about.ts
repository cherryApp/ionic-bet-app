import { Component, Output, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ClubService } from '../../services/club.service';
import { MatchService } from '../../services/match.service';
import { BetModalComponent } from '../../components/bet-modal/bet-modal';
import { AmountService } from '../../services/amount.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  @Output() rounds: Array<object> = [];
  @Output() amount: number = 0;

  constructor(
    public navCtrl: NavController,
    private mService: MatchService,
    public modalController: ModalController,
    public amountService: AmountService
  ) {
    this.mService.getAll()
      .then( rounds => {
        console.log(rounds);
        this.rounds = rounds;
      });
  }

  ngOnInit() {
    this.amount = this.amountService.checkAmount();
    this.amountService.amountSubject.subscribe(
      amount => {
        this.amount = amount;
      }
    );
  }

  matchDaySelected(round) {
    console.log(round);

    let betModal = this.modalController.create(BetModalComponent, round);
    betModal.present();
  }

}
