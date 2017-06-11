import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html'
})

export class TitleComponent implements OnInit {

  // title : string = "Encontre lugares incríveis com base nas suas melhores experiências relacionadas as de outras pessoas"

  // title : string = "Carregando informações da sua foto"

  // title : string = "Percebemos as seguintes características na sua foto. Você concorda?"

  title : string = "Estes são os locais que recomendamos para você!"
  

  constructor() {}

  ngOnInit() {}

}
