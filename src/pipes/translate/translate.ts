import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

/**
 * Generated class for the TranslatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  currentTranslates: object = {};
  constructor(private tService: TranslateService) {
    tService.getTranslates()
      .then( tr => {
        this.currentTranslates = tr;
      });
  }

  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return this.currentTranslates[value] || "n/a";
  }
}
