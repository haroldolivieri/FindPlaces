import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  isLoading: boolean = false;

  contribute: string = "Contribua com esse projeto!";

  loadingMessages = [
    {text: "Reconhecimento de cena"},
    {text: "Criando paleta de cores"},
    {text: "Encontrando sentimentos relacionados"},
  ]

  resultPlaces = [
    {
      image: "https://lifecooler.com/files/registos/imagens/431244/266056.jpg",
      address: "Rua de Exemplo",
      lastCheck: "Visitado em 30/09/2011"
    },
    {
      image: "https://oportocool.files.wordpress.com/2012/01/moustache11.jpg",
      address: "Rua de Exemplo",
      lastCheck: "Visitado em 30/09/2011"
    },
    {
      image: "http://www.moustache.pt/conceito/images/2.jpg",
      address: "Rua de Exemplo",
      lastCheck: "Visitado em 30/09/2011"
    },
    {
      image: "https://media-cdn.tripadvisor.com/media/photo-s/05/d7/f7/ec/main-entry.jpg",
      address: "Rua de Exemplo",
      lastCheck: "Visitado em 30/09/2011"
    },
    {
      image: "https://dessertswithbenefits.com/wp-content/uploads/2016/04/Healthy-Mocha-Mousse1.jpg",
      address: "Rua de Exemplo",
      lastCheck: "Visitado em 30/09/2011"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
