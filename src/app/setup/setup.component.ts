import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { ConceptService } from '../concept.service';
import { Observable , Scheduler} from 'rxjs/Rx';
import { AppComponent } from '../app.component';

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
  private subscriptionClick;
  private subscriptionConcept;

  constructor(private conceptService : ConceptService, 
              private zone: NgZone, 
              private ref: ChangeDetectorRef,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    console.log("a")
    this.subscriptionClick = this.appComponent.findPlacesClickObservable$.subscribe(x => console.log("clicked"))

    this.subscriptionConcept = this.conceptService.conceptObservable$
    .filter((concept : any) => concept.value > 0.8)
    .take(8)
    .subscribe(concept => {
      console.log(concept)
      this.keywords.push({name: concept.name});
    }, error => {console.log(error)});
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
  }
}