import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

  textHelper:string = "Cole a url ou jogue uma foto aqui que nós encontraremos locais semelhantes onde pessoas se sentiram como você já se sentiu :)"

  constructor() { }

  ngOnInit() {
  }

  sendURL() {
    console.log("SENDURL")
  }

}
