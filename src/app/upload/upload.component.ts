import { Component, NgZone } from '@angular/core';
import { AppComponent } from '../app.component';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { ConceptService } from '../concept.service';
import { TitleService } from '../title.service';
import { SearchImageService } from '../search-image.service';
import { APIKeyService } from '../apikey.service';
import * as Clarifai from 'clarifai';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})


export class UploadComponent{

  private imageSubscription: Subscription;
  private validationSubscription: Subscription;
  private clarifaiSubscription: Subscription;

  validationMessage: string = ""
  inputPlaceholder: string = "Cole uma URL de uma imagem ou arraste sua foto para cá";
  url: string = ""

  inputClear: boolean = true;

  constructor(private appComponent: AppComponent, 
              private conceptService : ConceptService,
              private zone: NgZone, 
              private titleService : TitleService,
              private searchImageService : SearchImageService,
              private apiKey: APIKeyService) {

    this.imageSubscription = this.appComponent.getDroppedImageObservable()
      .subscribe(base64 => { this.predictByBytes(base64) });

    this.validationSubscription = this.appComponent.getValidationImageObservable()
      .subscribe(message => { this.setValidationMessage(message) });

  }

  keyDownFunction(event) {
  if(event.keyCode == 13) {
    this.sendURL();
  }
}

  valuechange(newValue) {
    if (newValue == "") {
      this.inputClear = true
    } else {
      this.inputClear = false
    }
  }

  sendURL() {
    this.predictByUrl(this.url)
  }

  private predictByUrl(url) {
    this.predict({url : url })
  }
  
  private predictByBytes(base64) {
    this.predict({ base64: base64 })
  }

  private predict(object) {
    
    this.titleService.publishData("Carregando informações da sua foto :)");
    this.setLoading(true);

    var predictObservable : Observable<any> = Observable.fromPromise(this.apiKey.clarifai$.models.predict(Clarifai.GENERAL_MODEL, object));
    this.clarifaiSubscription = predictObservable
    .map(predicts => {
      return predicts.outputs[0].data.concepts;
    }).subscribe(concepts => {
      if (this.url) {
        this.appComponent.selectedImage$ = this.url;
      }
      this.zone.run(() => this.conceptService.publishData(concepts));
    }, error => { 
      this.appComponent.newSearch();
      this.setValidationMessage("Erro ao buscar imagem :( Tente novamente");
    }, () => {
      this.titleService.publishData("Percebemos as seguintes características na sua foto. Você concorda?");
      this.zone.run(() => {
        this.setLoading(false);
        this.appComponent.setStep(1);
        this.searchImageService.publishData(object);
      });
    });
  }

  setLoading(loading) {
    this.appComponent.setLoading({type : "setup", visible : loading});
  }

  private setValidationMessage(message) {
    this.validationMessage = message;
  }

  ngOnDestroy() {
    if (this.clarifaiSubscription) {
      this.clarifaiSubscription.unsubscribe();
    }
  
    this.imageSubscription.unsubscribe();
    this.validationSubscription.unsubscribe();
  }
}