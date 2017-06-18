import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit {

  private imageSubscription: Subscription;
  private validationSubscription: Subscription;
  private validationMessage: string = ""
  private inputPlaceholder: string = "Cole uma URL ou arraste sua foto para cá";

  ngOnInit() {
  }

  constructor(private appComponent: AppComponent) {
    this.imageSubscription = this.appComponent.getDroppedImageObservable()
    .subscribe(message => { });

    this.validationSubscription = this.appComponent.getValidationImageObservable()
    .map(isValid => {
      if (isValid) {
        return ""
      } else {
        return "Imagem inválida - Tente novamente com um *.png ou *jpeg de até 8MB"
      }
    }).subscribe(message => { this.validationMessage = message});
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
    this.validationSubscription.unsubscribe();
  }

  sendURL() {
    console.log("SENDURL")
  }
}
