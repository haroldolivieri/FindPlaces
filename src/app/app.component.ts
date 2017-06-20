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

  private droppedImageSubject = new Subject<any>();
  private validationImageSubject = new Subject<string>();

  setStep(step) {
    this.currentStep = step
  }

  private supportedFileTypes: string[] = ['image/png', 'image/jpeg'];
  private maximumFileSizeInBytes: number = 8e+6;

  // File being dragged has moved into the drop region
  private dragFileOverStart() {
    console.log("dragStart");
    this.dragging = true;
  }

  // File being dragged has moved out of the drop region
  private dragFileOverEnd() {
    console.log("dragover");
    this.dragging = false;
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    this.validationImageSubject.next("");

    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.droppedImageSubject.next(fileReader.result);
      this.droppedImageSubject.complete();
    };

    fileReader.readAsDataURL(acceptedFile.file);
  }

  // File being dragged has been dropped and has been rejected
  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
    this.validationImageSubject.next("Imagem inválida - Tente novamente com um *.png ou *jpeg de até 8MB");
  }

  getDroppedImageObservable() {
    return this.droppedImageSubject.asObservable();
  }

  getValidationImageObservable() {
    return this.validationImageSubject.asObservable();
  }
}


