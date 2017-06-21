import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
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
  test = "lalala"

  constructor(private conceptService : ConceptService, 
              private zone: NgZone, 
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.conceptService.conceptObservable$
    .filter((concept : any) => concept.value > 0.8)
    .take(8)
    .subscribe(concept => {
      this.keywords.push({name: concept.name});
    }, error => {console.log(error)});
  }

  deleteColor(color) {
    console.log("Delete Color: " + color.hex);
  }

  deleteKeyword(keyword) {
    console.log("Delete Keyword: " + keyword.name);
  }
}