import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ResultService {

  constructor() { }

  resultObservable$ = Observable.empty()

  publishData(data: any[]) {
    this.resultObservable$ = Observable.from(data)
  }
  
}
