import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { Bet } from '../../models/bet';
import { BetModalComponent } from '../../components/bet-modal/bet-modal';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  bettings: Array<Bet> = [];

  constructor(public navCtrl: NavController,
              public storageService: StorageService) {
    this.storageService.getObject("bettings")
                .then( bettings => {
                  this.bettings = bettings;
                  console.log( this.bettings );
                });
  }

}
