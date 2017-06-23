import { Component } from '@angular/core';
import { ResultService } from '../result.service';
import { Observable , Subscription} from 'rxjs/Rx';
import { CeiboShare } from 'ng2-social-share';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent {

  private resultSubscription : Subscription;
  private monthsInEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private monthsInPortuguese = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  urlWhatsYourPic = 'http://whatsyourpic.carioca.build';
  public repoUrl = 'whatsyourplace.carioca.build';
  
  resultPlaces = []
  constructor(private resultService: ResultService) { 
    this.resultSubscription = this.resultService.resultObservable$.map((result : any) => {
      var metadata = result.input.data.metadata;
      var index = this.monthsInEnglish.indexOf(metadata.date.month);
      var monthInPortuguese = this.monthsInPortuguese[index];
      var place = {image: "https://www.gravatar.com/avatar/" + this.hashCode(result.input.data.image.url) + "?s=500&d=identicon", 
                  address : metadata.location.name, 
                  lastCheck : "Visitado em " + monthInPortuguese + " de " + metadata.date.year,
                  url : metadata.location.url};
      console.log(place.image);
      this.resultPlaces.push(place);
    }).subscribe();
  }

  contribute: string = "Contribua com esse projeto!";

  private hashCode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }

  goTo(url) {
    window.location.href=url;
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }
}
