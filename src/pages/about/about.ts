import { Component, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @Output() clubs: Array<object> = [];

  constructor(public navCtrl: NavController, private clubService: ClubService) {
    this.clubService.getAll()
      .then( clubs => {
        console.log(clubs);
        this.clubs = clubs as Array<object>;
      });
  }

}
