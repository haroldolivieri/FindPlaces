import { Component, OnInit } from '@angular/core';
import { ConceptService } from '../concept.service';
import { Observable , Scheduler} from 'rxjs/Rx';

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
  ]

  keywords = []

  constructor(private conceptService : ConceptService) {
    
    this.conceptService.conceptObservable$
    .observeOn(Scheduler.queue)
    .subscribe(concepts => {
      concepts.map(concept => {
        this.keywords.push({name: concept.name});
      });
      console.log(this.keywords)
    }, error => {console.log(error)});
   }

  deleteColor(color) {
    console.log("Delete Color: " + color.hex);
  }

  deleteKeyword(keyword) {
    console.log("Delete Keyword: " + keyword.name);
  }

  ngOnDestroy() {

  }
}
