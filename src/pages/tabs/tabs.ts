import { Component, Output } from "@angular/core";

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TranslateService } from '../../services/translate.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @Output() tabArray: Array<{title: string, root: object, icon: string}> = [];
  @Output() tabStart: boolean = false;

  constructor(private translate: TranslateService) {
    this.translate.getTranslates()
      .then( tr => {
        this.addTab(tr["HOME"], HomePage, "home");
        this.addTab(tr["BETTING"], AboutPage, "cash");
        this.addTab(tr["HISTORY"], ContactPage, "clock");
        this.tabStart = true;
      });
  }

  addTab(title: string, root: object, icon: string) {
    this.tabArray.push({
      title: title,
      root: root,
      icon: icon
    });
  }
}
