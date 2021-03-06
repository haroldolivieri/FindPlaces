import { Component, NgZone } from '@angular/core';
import { Subject, Observable} from 'rxjs/Rx';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html'
})

export class TitleComponent {

  title : string
  
  constructor(private titleService : TitleService, private zone: NgZone) {
    this.titleService.titleObservable$
    .subscribe(title => this.zone.run(() => this.title = title));
  }
}
