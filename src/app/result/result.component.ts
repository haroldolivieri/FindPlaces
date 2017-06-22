import { Component } from '@angular/core';
import { ResultService } from '../result.service';
import { Observable , Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent {

  private resultSubscription : Subscription;
  private monthsInEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private monthsInPortuguese = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  urlWhatsYourPic = 'http://whatsyourpic.carioca.build';
  resultPlaces = []
  constructor(private resultService: ResultService) { 
    this.resultSubscription = this.resultService.resultObservable$.map((result : any) => {
      var metadata = result.input.data.metadata;
      var index = this.monthsInEnglish.indexOf(metadata.date.month);
      var monthInPortuguese = this.monthsInPortuguese[index];
      var place = {image: "https://lifecooler.com/files/registos/imagens/431244/266056.jpg", 
                  address : metadata.location.name, 
                  lastCheck : "Visitado em " + monthInPortuguese + " de " + metadata.date.year,
                  url : metadata.location.url};
      this.resultPlaces.push(place);
    }).subscribe();
  }

  contribute: string = "Contribua com esse projeto!";

  goTo(url) {
    window.location.href=url;
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }
}
