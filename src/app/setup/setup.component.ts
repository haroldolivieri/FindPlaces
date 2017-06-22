import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { ConceptService } from '../concept.service';
import { SearchImageService } from '../search-image.service';
import { Observable , Subscription} from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import * as Clarifai from 'clarifai';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
})

export class SetupComponent {

  colors = [
    {hex: "#E7D3CC"},
    {hex: "#929C5F"},
    {hex: "#7D975A"},
    {hex: "#727D36"},
    {hex: "#223330"}
  ];

  keywords = [];
  private dataImage;
  private subscriptionClick : Subscription;
  private subscriptionConcept : Subscription;
  private subscriptionSearchImage : Subscription;

  constructor(private conceptService : ConceptService, 
              private searchImageService : SearchImageService,
              private zone: NgZone, 
              private ref: ChangeDetectorRef,
              private appComponent: AppComponent) {

    this.subscriptionSearchImage = this.searchImageService.searchImageObservable$.subscribe(dataImage => this.dataImage = dataImage);
    this.subscriptionClick = this.appComponent.findPlacesClickObservable$.subscribe(_ => this.findPlaces());
  }

  ngOnInit() {
    

    this.subscriptionConcept = this.conceptService.conceptObservable$
    .filter((concept : any) => concept.value > 0.8)
    .take(8)
    .subscribe(concept => {
      console.log(concept)
      this.keywords.push({name: concept.name});
    }, error => {console.log(error)});
  }

  private findPlaces() {
    console.log(this.dataImage)
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