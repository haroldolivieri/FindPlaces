import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs/Rx';

@Injectable()
export class ConceptService {
  private conceptSubject = new Subject<any>();  
  conceptObservable$ = Observable.empty()

  publishData(data: any[]) {
    this.conceptObservable$ = Observable.from(data)
  }
}