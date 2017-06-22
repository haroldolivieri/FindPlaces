import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { ConceptService } from '../concept.service';
import { SearchImageService } from '../search-image.service';
import { TitleService } from '../title.service';
import { ResultService } from '../result.service';
import { APIKeyService } from '../apikey.service';
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
  private isLoading = false;
  private subscriptionClick : Subscription;
  private subscriptionConcept : Subscription;
  private subscriptionSearchImage : Subscription;
  private clarifaiSubscription : Subscription;
  
  constructor(private conceptService : ConceptService, 
              private searchImageService : SearchImageService,
              private zone: NgZone, 
              private titleService : TitleService,
              private ref: ChangeDetectorRef,
              private appComponent: AppComponent,
              private resultService: ResultService,
              private apiKey: APIKeyService) {

    this.subscriptionSearchImage = this.searchImageService.searchImageObservable$
    .subscribe(dataImage => this.dataImage = dataImage);

    this.subscriptionClick = this.appComponent.findPlacesClickObservable$
    .subscribe(_ => this.findPlaces());

    this.subscriptionConcept = this.conceptService.conceptObservable$
    .filter((concept : any) => concept.value > 0.8).take(8)
    .subscribe(concept => this.keywords.push({name: concept.name}), error => console.log(error));
  }

  private findPlaces() {

    if (this.isLoading) {
      return;
    }

    this.titleService.publishData("Procurando por lugares incríveis!");
    this.setLoading(true);

    var searchObservable = Observable.fromPromise(this.apiKey.clarifai$.inputs.search({ concept : this.keywords, input: this.dataImage }));
    this.clarifaiSubscription = 
    searchObservable.subscribe((results : any) => {
      this.zone.run(() => this.resultService.publishData(results.hits));
    }, err => {
      this.appComponent.newSearch();
    }, () => {
      this.appComponent.setStep(2);
      this.titleService.publishData("Estes são os locais que recomendamos para você!");
      this.setLoading(false);
    });
  }

  setLoading(loading) {
    this.isLoading = true;
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