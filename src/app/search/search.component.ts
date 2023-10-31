import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
   
  ngOnInit(){
    const SEARCH = document.getElementById("search");
    const BUTTON = document.getElementById("button");
    (BUTTON as HTMLButtonElement).addEventListener("click" , () => {
      window.location.href = '/?query='+(SEARCH as HTMLInputElement).value;
    });
  }
}
