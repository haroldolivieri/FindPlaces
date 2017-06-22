import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs/Rx';

@Injectable()
export class ConceptService {
  
  conceptObservable$ = Observable.empty()

  publishData(data: any[]) {
    this.conceptObservable$ = Observable.from(data)
  }
}