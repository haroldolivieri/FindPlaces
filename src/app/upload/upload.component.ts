import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../app.component';
import * as Clarifai from 'clarifai';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { ConceptService } from '../concept.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent{

  private imageSubscription: Subscription;
  private validationSubscription: Subscription;
  private clarifaiSubscription: Subscription;

  private validationMessage: string = ""
  private inputPlaceholder: string = "Cole uma URL ou arraste sua foto para cá";
  private url: string = ""
  private clarifai;

  constructor(private appComponent: AppComponent, 
              private ref: ChangeDetectorRef,
              private conceptService : ConceptService) {
                
    this.imageSubscription = this.appComponent.getDroppedImageObservable()
      .subscribe(base64 => { this.predictByBytes(base64) });

    this.validationSubscription = this.appComponent.getValidationImageObservable()
      .subscribe(message => { this.setValidationMessage(message) });

    this.clarifai = new Clarifai.App(
      'iO89ClgM9SXqvORVQt8dc3KJLRKlrejwYGBEgGHO',
      'GLMRYd5y-PmSjLNXgLyOfCqz4eW347y_hh_mWlZi'
    );
  }

  sendURL() {
    this.predictByUrl(this.url)
  }

  private predictByUrl(url) {
    this.predict(url)
  }
  
  private predictByBytes(base64) {
    this.predict({ base64: base64 })
  }

  private predict(object) {
    var predictObservable : Observable<any> = Observable.fromPromise(this.clarifai.models.predict(Clarifai.GENERAL_MODEL, object));
    this.setLoading(true)

    this.clarifaiSubscription = predictObservable
    .map(predicts => {
      return predicts.outputs[0].data.concepts;
    }).subscribe(concepts => {
      console.log(concepts)
      this.conceptService.publishData(concepts);
    }, error => { 
      this.setLoading(false);
      this.setValidationMessage("Erro ao buscar imagem :( Tente novamente");
    }, () => {
      this.setLoading(false);
      this.appComponent.setStep(1);
      this.conceptService.finish();
    });
  }

  setLoading(loading) {
    this.appComponent.setLoading({type : "setup", visible : loading});
  }

  private setValidationMessage(message) {
    this.validationMessage = message;
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    if (this.clarifaiSubscription) {
      this.clarifaiSubscription.unsubscribe();
    }
  
    this.imageSubscription.unsubscribe();
    this.validationSubscription.unsubscribe();
  }
}
