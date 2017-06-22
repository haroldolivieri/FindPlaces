import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { ConceptService } from '../concept.service';
import { SearchImageService } from '../search-image.service';
import { TitleService } from '../title.service';
import { Observable , Subscription} from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import * as Clarifai from 'clarifai';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
})

export class SetupComponent {

  colors = [];
  keywords = [];

  private dataImage;
  private subscriptionClick : Subscription;
  private subscriptionConcept : Subscription;
  private subscriptionSearchImage : Subscription;
  private clarifaiSubscription : Subscription;
  private clarifai : Clarifai.App;

  constructor(private conceptService : ConceptService, 
              private searchImageService : SearchImageService,
              private zone: NgZone, 
              private titleService : TitleService,
              private ref: ChangeDetectorRef,
              private appComponent: AppComponent) {

    this.subscriptionSearchImage = this.searchImageService.searchImageObservable$
    .subscribe(dataImage => this.dataImage = dataImage);

    this.subscriptionClick = this.appComponent.findPlacesClickObservable$
    .subscribe(_ => this.findPlaces());

    this.subscriptionConcept = this.conceptService.conceptObservable$
    .filter((concept : any) => concept.value > 0.8).take(8)
    .subscribe(concept => this.keywords.push({name: concept.name}), error => console.log(error));

    this.clarifai = new Clarifai.App(
      'bWWW2y_2tCbr79oNojh6rE1rlNo_h3-kJWL-vO5g',
      'H933Y_AqNqoWWRIZpAk2ckM-N-UQoY4sBYPzw0-x'
    );

  }

  private monthsInEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private monthsInPortuguese = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  private findPlaces() {
    
    this.setLoading(true);

    var searchObservable = Observable.fromPromise(this.clarifai.inputs.search({ concept : this.keywords, input: this.dataImage }));
    this.clarifaiSubscription = 
    searchObservable.flatMap((response : any) => {
      return Observable.from(response.hits)
    }).map((hit : any) => {
      var metadata = hit.input.data.metadata;
      var index = this.monthsInEnglish.indexOf(metadata.date.month);
      var monthInPortuguese = this.monthsInPortuguese[index];
      return {location : metadata.location, date : {month : monthInPortuguese, year : metadata.date.year }};
    }).subscribe((memory : any) => {
      console.log(memory)
    }, err => {
      this.appComponent.setStep(0);
      this.setLoading(false);
    }, () => {
      this.appComponent.setStep(2);
      this.titleService.publishData("Estes são os locais que recomendamos para você!");
      this.setLoading(false);
    });
  }

  setLoading(loading) {
    this.appComponent.setLoading({type : "setup", visible : loading});
  }

  deleteColor(index) {
    if(this.keywords.length > 2) {
      this.colors.splice(index, 1);
      console.log(this.keywords)
    }
  }

  deleteKeyword(index) {
    if(this.keywords.length > 2) {
      this.keywords.splice(index, 1);
      console.log(this.keywords)
    }
  }

  ngOnDestroy() {
    this.subscriptionClick.unsubscribe();
    this.subscriptionConcept.unsubscribe();
    this.subscriptionSearchImage.unsubscribe();
  }
}