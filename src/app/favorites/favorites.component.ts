import { Component } from '@angular/core';
import { CollectionService } from 'src/shared/services/collection.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  constructor(private collectionService: CollectionService){

  }

  ngOnInit(){
    this.collectionService.favData.subscribe(

      artworks => { 
        const INNER_CONTAINER = document.getElementById("inner-container");
        console.log(artworks);
        (INNER_CONTAINER as HTMLElement).innerHTML = '';
        artworks['data'].forEach(artwork => {
          const CARD = document.createElement('div');
          CARD.style.display = 'flex';
          CARD.style.width = '30%';
          // CARD.style.height = 'auto';
          CARD.style.flexDirection = "column";
          CARD.style.paddingTop = "2%";
          CARD.style.borderBottom = "1px solid grey";
          CARD.style.paddingBottom = "2%";
          CARD.id = artwork['id'];

          

          const IMAGE = document.createElement("img");
          (IMAGE as HTMLImageElement).src = "https://www.artic.edu/iiif/2/" + artwork['image_id'] + "/full/843,/0/default.jpg";
          IMAGE.style.width = "80%";
          IMAGE.style.aspectRatio = "1/1";
          IMAGE.style.objectFit = "contain";
          // IMAGE.style.border = "1px solid red";
          IMAGE.style.marginTop = "5%";
          IMAGE.style.marginLeft = "7%";
          IMAGE.id = artwork['id'];

          const TITLE = document.createElement("div");
          TITLE.style.display = "flex";
          TITLE.style.width = "80%";
          TITLE.style.height = "auto";
          TITLE.style.fontSize = "1.1em";
          TITLE.style.fontFamily = "Montserrat";
          TITLE.innerText = artwork['title'] + " --"+artwork['date_display'];
          TITLE.style.marginTop = "7%";
          TITLE.style.marginLeft = "7%";
          TITLE.id = artwork['id'];
          
          const ARTIST = document.createElement("div");
          ARTIST.style.display = "flex";
          ARTIST.style.width = "80%";
          ARTIST.style.height = "auto";
          ARTIST.style.fontSize = "1em";
          ARTIST.style.color = "grey";
          ARTIST.style.fontFamily = "Montserrat";
          ARTIST.innerText = artwork['artist_title'] || 'Unknown';
          ARTIST.style.marginTop = "5%";
          ARTIST.style.marginLeft = "7%";
          ARTIST.id = artwork['id'];
          // TITLE.style.alignContent

          CARD.appendChild(IMAGE);
          CARD.appendChild(TITLE);
          CARD.appendChild(ARTIST)

  

          INNER_CONTAINER?.appendChild(CARD);

        }); 

        INNER_CONTAINER?.addEventListener("click", (evt) => {
          console.log("Event Bubbling Triggered");
          console.log((evt.target as HTMLElement).id);
          if(!((evt.target as HTMLElement).id == 'inner-container'))
          window.location.href = "./detailed?image="+(evt.target as HTMLElement).id;
        });

        
      });

      this.collectionService.getFav(JSON.parse(window.localStorage.getItem('fav')!).toString());
  }
}
