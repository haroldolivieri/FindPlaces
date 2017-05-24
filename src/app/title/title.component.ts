import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html'
})
export class TitleComponent implements OnInit {

  title : string = "Encontre lugares incríveis a partir das melhores experiências de outras pessoas"

  constructor() { }

  ngOnInit() {
  }

}
