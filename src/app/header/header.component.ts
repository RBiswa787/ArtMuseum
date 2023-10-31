import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  ngOnInit(){
    const LOGO = document.getElementById("image-holder");
    (LOGO as HTMLElement).addEventListener("click", ()=>{
      window.location.href='./?page=137';
    });
  }
}
