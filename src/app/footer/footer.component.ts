import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  hasResult: boolean = false;

  leftButton: string = "Contribua com esse projeto!"
  // leftButton: string = "Gostou? Contribua com esse projeto!"

  rightButton: string = "Encontrar Locais!"
  // rightButton: string = "Fazer Nova Busca!"

  constructor() { }

  ngOnInit() { }

}
