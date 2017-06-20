import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html'
})
export class SetupComponent {

  colors = [
    {hex: "#E7D3CC"},
    {hex: "#929C5F"},
    {hex: "#7D975A"},
    {hex: "#727D36"},
    {hex: "#223330"}
  ]

  keywords = [
    {name: "crianças"},
    {name: "árvores"},
    {name: "água"},
    {name: "mar"},
    {name: "alegria"}
  ]

  constructor() { }

  ngOnInit() {
  }

  deleteColor(color) {
    console.log("Delete Color: " + color.hex);
  }

  deleteKeyword(keyword) {
    console.log("Delete Keyword: " + keyword.name);
  }

}
