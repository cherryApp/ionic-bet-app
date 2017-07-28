import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { Bet } from '../../models/bet';
import { BetModalComponent } from '../../components/bet-modal/bet-modal';
import { BetService } from '../../services/bet.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  bettings: Array<Bet> = [];

  constructor(public navCtrl: NavController,
              public betService: BetService) {

  }

  ngOnInit() {
    this.betService.subject.subscribe( bettings => {
      console.log("bettings", bettings);
      this.bettings = bettings;
    });
    this.betService.getBettings();
  }

}
