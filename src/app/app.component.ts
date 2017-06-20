import { Component } from '@angular/core';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile } from 'ng2-file-drop';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent {
  title = 'World!';
  currentStep = 0;
  dragging = false;

  isLoadingSetup: boolean = false;
  isLoadingResult: boolean = false;

  private droppedImageSubject = new Subject<any>();
  private validationImageSubject = new Subject<string>();
  private loadingSubject = new Subject<any>();

  private supportedFileTypes: string[] = ['image/png', 'image/jpeg'];
  private maximumFileSizeInBytes: number = 8e+6;

  constructor() {
    this.loadingSubject.subscribe(loading => {
      console.log(loading)
      if (loading.type == "setup") {
        this.isLoadingSetup = loading.visible
      } else {
        this.isLoadingResult = loading.visible
      }
    });
  }

  private dragFileOverStart() {
    console.log("dragStart");
    this.dragging = true;
  }

  private dragFileOverEnd() {
    console.log("dragover");
    this.dragging = false;
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    this.validationImageSubject.next("");

    let fileReader = new FileReader();
    fileReader.onload = () => {
      var base64 = fileReader.result.split(',')[1];
      this.droppedImageSubject.next(base64);
      this.droppedImageSubject.complete();
    };

    fileReader.readAsDataURL(acceptedFile.file);
  }

  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
    this.validationImageSubject.next("Imagem inválida - Tente novamente com um *.png ou *jpeg de até 8MB");
  }

  getDroppedImageObservable() {
    return this.droppedImageSubject.asObservable();
  }

  getValidationImageObservable() {
    return this.validationImageSubject.asObservable();
  }

  getLoadingSubject() : Subject<any> {
    return this.loadingSubject;
  }

  setStep(step) {
    this.currentStep = step;
  }
}


