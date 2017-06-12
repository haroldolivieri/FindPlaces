import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {

  // textHelper:string = "Cole a url ou jogue uma foto aqui que nós encontraremos locais semelhantes onde pessoas se sentiram como você já se sentiu :)"
  inputPlaceholder:string = "Cole uma URL ou arraste sua foto para cá";

  constructor() { }

  ngOnInit() {
  }

  sendURL() {
    console.log("SENDURL")
  }

}
