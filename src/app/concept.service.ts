import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class ConceptService {
  private conceptSubject = new Subject<any>();  

  conceptObservable$ = this.conceptSubject.asObservable();

  publishData(data: any) {
    console.log("next caralho")
    this.conceptSubject.next(data);
  }

  finish() {
    console.log("fim")
    this.conceptSubject.complete();
  }
}