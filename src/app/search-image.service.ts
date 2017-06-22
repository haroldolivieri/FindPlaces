import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class SearchImageService {

  constructor() { }

  private searchImageSubject = new Subject<any>();  
  searchImageObservable$ = this.searchImageSubject.asObservable();

  publishData(data: any) {
    this.searchImageSubject.next(data)
  }
}
