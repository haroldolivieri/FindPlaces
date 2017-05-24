import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html'
})
export class TitleComponent implements OnInit {

  title:string = "Título"

  constructor() { }

  ngOnInit() {
  }

}
