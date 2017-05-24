import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html'
})

export class TitleComponent implements OnInit {

  title : string = "Encontre lugares incríveis com base nas suas melhores experiências relacionadas as de outras pessoas"

  constructor() {}

  ngOnInit() {}

}
