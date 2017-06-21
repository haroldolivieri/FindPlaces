import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs/Rx';

@Injectable()
export class TitleService {

  constructor() { }

  private titleSubject = new BehaviorSubject<string>("Encontre lugares incríveis com base<br>nas suas melhores experiências<br>relacionadas as de outras pessoas");  
  titleObservable$ = this.titleSubject.asObservable();

  publishData(title: string) {
    this.titleSubject.next(title)
  }
}
