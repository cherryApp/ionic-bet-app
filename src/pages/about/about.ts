import { Component, Output } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ClubService } from '../../services/club.service';
import { MatchService } from '../../services/match.service';
import { BetModalComponent } from '../../components/bet-modal/bet-modal';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @Output() rounds: Array<object> = [];

  constructor(public navCtrl: NavController, private mService: MatchService,
            public modalController: ModalController) {
    this.mService.getAll()
      .then( rounds => {
        console.log(rounds);
        this.rounds = rounds;
      });
  }

  matchDaySelected(round) {
    console.log(round);

    let betModal = this.modalController.create(BetModalComponent, round);
    betModal.present();
  }

}
