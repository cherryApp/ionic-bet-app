import { Component, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubService } from '../../services/club.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @Output() rounds: Array<object> = [];

  constructor(public navCtrl: NavController, private mService: MatchService) {
    this.mService.getAll()
      .then( rounds => {
        console.log(rounds);
        this.rounds = rounds;
      });
  }

}
