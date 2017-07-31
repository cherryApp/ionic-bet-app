import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';
import { Device } from '@ionic-native/device';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

import { HttpModule } from '@angular/http';
import { TranslateService } from '../services/translate.service';
import { TranslatePipe } from '../pipes/translate/translate';
import { ClubService } from '../services/club.service';
import { MatchService } from '../services/match.service';
import { BetModalComponent } from '../components/bet-modal/bet-modal';
import { BetModalFormComponent } from '../components/bet-modal-form/bet-modal-form';
import { StorageService } from '../services/storage.service';
import { AmountService } from '../services/amount.service';
import { BetService } from '../services/bet.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TranslatePipe,
    BetModalComponent,
    BetModalFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BetModalComponent,
    BetModalFormComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    Device,
    Contacts,
    TranslateService,
    ClubService,
    MatchService,
    StorageService,
    AmountService,
    BetService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
