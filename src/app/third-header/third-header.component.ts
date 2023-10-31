import { Component } from '@angular/core';

@Component({
  selector: 'app-third-header',
  templateUrl: './third-header.component.html',
  styleUrls: ['./third-header.component.scss']
})
export class ThirdHeaderComponent {
    ngOnInit(){
      const FAV_LINK = document.getElementById("favourites");
      FAV_LINK?.addEventListener("click", () => {
        window.location.href = "./fav?fav=1";
      });

      const ARTWORK_LINK = document.getElementById("artworks");
      (ARTWORK_LINK as HTMLElement).addEventListener("click", () => {
        window.location.href = "./?page=137";
      });
    }
}
