import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import * as Clarifai from 'clarifai';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit {

  private imageSubscription: Subscription;
  private validationSubscription: Subscription;
  private conceptsSubject = new Subject<any>();

  private validationMessage: string = ""
  private inputPlaceholder: string = "Cole uma URL ou arraste sua foto para cá";
  private url: string = ""
  private clarifai;

  ngOnInit() {
  }

  constructor(private appComponent: AppComponent) {
    this.imageSubscription = this.appComponent.getDroppedImageObservable()
      .subscribe(base64 => { this.predictByBytes(base64) });

    this.validationSubscription = this.appComponent.getValidationImageObservable()
      .subscribe(message => { this.validationMessage = message });

    this.clarifai = new Clarifai.App(
      'iO89ClgM9SXqvORVQt8dc3KJLRKlrejwYGBEgGHO',
      'GLMRYd5y-PmSjLNXgLyOfCqz4eW347y_hh_mWlZi'
    );
  }

  sendURL() {
    this.predictByUrl(this.url)
  }

  private predictByUrl(url) {
    console.log("recebeu url")
    this.predict(url)
  }
  
  private predictByBytes(base64) {
    console.log("recebeu base 64")
    this.predict({ base64: base64 })
  }

  private predict(object) {
    var observable : Observable<any> = Observable.fromPromise(this.clarifai.models.predict(Clarifai.GENERAL_MODEL, object));
    this.setLoading(true)
    
    observable.subscribe(response => {
      this.setLoading(false)
      this.conceptsSubject.next(response.outputs[0].data.concepts);
      this.conceptsSubject.complete();
    }, error => { 
      this.setLoading(false)
      this.validationMessage = "Erro ao buscar imagem :( Tente novamente" 
    });
  }

  setLoading(loading) {
    this.appComponent.getLoadingSubject().next({type : "setup", visible : loading});
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
    this.validationSubscription.unsubscribe();
  }
}
