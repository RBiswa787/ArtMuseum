import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from 'src/shared/services/collection.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent {

  constructor(private route: ActivatedRoute, private collectionService: CollectionService){
   
  }

  ngOnInit(){
    
    this.route.queryParams
      .subscribe(params => {
        this.collectionService.getSingleArtwork(parseInt(params['image'])).subscribe(
          data => {
            console.log(data);
            const IMAGE = document.getElementById("image");
            (IMAGE as HTMLImageElement).src = "https://www.artic.edu/iiif/2/" + data['data']['image_id'] + "/full/843,/0/default.jpg";

            const TITLE = document.getElementById("title");
            (TITLE as HTMLElement).innerText = data['data']['title'];
  
            const YEAR = document.getElementById("year");
            (YEAR as HTMLElement).innerText = data['data']['date_display'];
  
            const ARTIST = document.getElementById("artist");
            (ARTIST as HTMLElement).innerText = data['data']['artist_display'];

            const DESC = document.getElementById("desc");
            (DESC as HTMLElement).innerHTML = data['data']['description'];

            const TABLE = document.getElementById("table");
            let metadata : any = {}; //change before deployment;
            metadata['Artist'] = data['data']['artist_title'];
            metadata['Title'] = data['data']['title'];
            metadata['Place'] = data['data']['place_of_origin'];
            metadata['Date'] = data['data']['date_display'];
            metadata['Medium'] = data['data']['medium_display'];
            metadata['Dimen.'] = data['data']['dimensions'];
            metadata['Credits'] = data['data']['credit_line'];
          
            Object.keys(metadata).forEach(key => {
              let row = (TABLE as HTMLTableElement).insertRow();
              let tag = (row as HTMLTableRowElement).insertCell();
              tag.innerText = key;
              let value = (row as HTMLTableRowElement).insertCell();
              value.innerText = metadata[key];

              tag.style.fontSize = "1.2em";
              tag.style.fontWeight = "bold";
              tag.style.fontFamily = "Montserrat";
              tag.style.marginRight = "3%";
              tag.style.minWidth = "5em";

              value.style.fontSize = "1.2em";
              value.style.color = "grey";
              value.style.fontFamily = "Montserrat";
              value.style.flexWrap = "wrap";

              row.style.height= "2em"
            });

            const FAV = document.getElementById('fav-icon');
            if(JSON.parse(window.localStorage.getItem('fav')!).includes(data['data']['id'])){
              (FAV as HTMLElement).className = "fa-solid fa-heart";
            }
            (FAV as HTMLElement).addEventListener('click', () => {
              if(FAV?.className == "fa-regular fa-heart"){
                FAV.className = "fa-solid fa-heart";
                this.collectionService.addToFav(parseInt(data['data']['id']));
              }
              else{
                (FAV as HTMLElement).className = "fa-regular fa-heart";
                this.collectionService.removeFromFav(parseInt(data['data']['id']));
              }
            });
          }
        )
      });
  }
}
 