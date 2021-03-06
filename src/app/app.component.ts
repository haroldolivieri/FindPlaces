import { Component, Injectable, ChangeDetectorRef } from '@angular/core';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile } from 'ng2-file-drop';
import { Subject } from 'rxjs/Subject';
import { TitleService } from './title.service';

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
  selectedImage$ = "../assets/img/background.jpg";
  urlWhatsYourPic = 'http://whatsyourpic.carioca.build';

  isLoadingSetup: boolean = false;
  isLoadingResult: boolean = false;

  private droppedImageSubject = new Subject<any>();
  private validationImageSubject = new Subject<string>();

  private findPlacesClickSubject = new Subject<void>()
  findPlacesClickObservable$ = this.findPlacesClickSubject.asObservable();
  
  private supportedFileTypes: string[] = ['image/png', 'image/jpeg'];
  private maximumFileSizeInBytes: number = 8e+6;

  constructor(private ref: ChangeDetectorRef, private titleService : TitleService) {}

  private dragFileOverStart() {
    this.dragging = true;
  }

  private dragFileOverEnd() {
    this.dragging = false;
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    this.validationImageSubject.next("");

    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.selectedImage$ = fileReader.result;
      var base64 = fileReader.result.split(',')[1];
      this.droppedImageSubject.next(base64);
      this.droppedImageSubject.complete();
      this.validationImageSubject.complete();
    };

    fileReader.readAsDataURL(acceptedFile.file);
  }

  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
    this.validationImageSubject.next("Imagem inválida - Tente novamente com um *.png ou *jpeg de até 8MB");
  }

  findPlaces() {
    this.findPlacesClickSubject.next();
  }

  newSearch() {
    this.isLoadingSetup = false;
    this.isLoadingResult = false;
    this.currentStep = 0;
    this.selectedImage$ = "../assets/img/background.jpg";
    this.titleService.publishData("Encontre lugares incríveis com base<br>nas suas melhores experiências<br>relacionadas as de outras pessoas");
  }

  getDroppedImageObservable() {
    return this.droppedImageSubject.asObservable();
  }

  getValidationImageObservable() {
    return this.validationImageSubject.asObservable();
  }

  setLoading(loading) {
    if (loading.type == "setup") {
        this.isLoadingSetup = loading.visible
      } else {
        this.isLoadingResult = loading.visible
      }

    this.ref.detectChanges();
  }

  setStep(step) {
    this.currentStep = step;
    this.ref.detectChanges();
  }
}


