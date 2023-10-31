
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from 'src/shared/services/collection.service';



@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {
  public page : string = '1';
  artworks : [];

  constructor(private route: ActivatedRoute, private collectionService: CollectionService){
    
    this.artworks = [];
  }

  ngOnInit(){


    this.route.queryParams
      .subscribe(params => {
       if(Object.keys(params).includes('page')){
        this.collectionService.getArtworks(parseInt(params['page']) || 1).subscribe(

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

            const PREV = document.getElementById("prev");
            if(parseInt(params['page']) == 1 || null){
              (PREV as HTMLButtonElement).style.display = "none";
            }
            else{
              (PREV as HTMLButtonElement).style.display = "flex";
            }
            console.log(parseInt(params['page']));
            const NEXT = document.getElementById("next");
            (NEXT as HTMLButtonElement).addEventListener("click", ()=> {
              
              if(!Number.isNaN(parseInt(params['page']))){
              let page = parseInt(params['page']) + 1;
              window.location.href = "/?page=" + page;}
              else{
                window.location.href = "/?page=" + 2;
              }
            });
            
            (PREV as HTMLButtonElement).addEventListener("click", ()=>{
              let page = parseInt(params['page']) - 1;
              window.location.href = "/?page=" + page;
            });

          
          }
        );
        const PAGE = document.getElementById("page");
       (PAGE as HTMLInputElement).value = params['page'];
       (PAGE as HTMLInputElement).addEventListener("change", () => {
        window.location.href = "./?page=" + (PAGE as HTMLInputElement).value.toString();
       });
       }
       else if(Object.keys(params).includes('query')){
        console.log('subscribing');
        this.collectionService.searchData.subscribe(

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

            const PREV = document.getElementById("prev");
            if(parseInt(params['page']) == 1 || null){
              (PREV as HTMLButtonElement).style.display = "none";
            }
            else{
              (PREV as HTMLButtonElement).style.display = "flex";
            }
            console.log(parseInt(params['page']));
            const NEXT = document.getElementById("next");
            (NEXT as HTMLButtonElement).addEventListener("click", ()=> {
              
              if(!Number.isNaN(parseInt(params['page']))){
              let page = parseInt(params['page']) + 1;
              window.location.href = "/?page=" + page;}
              else{
                window.location.href = "/?page=" + 2;
              }
            });
            
            (PREV as HTMLButtonElement).addEventListener("click", ()=>{
              let page = parseInt(params['page']) - 1;
              window.location.href = "/?page=" + page;
            });

          
          }
        );
        this.collectionService.getArtworksByQuery(params['query']);
       }
       else if(Object.keys(params).includes('fav')){
        alert("hello");
       }
       else{
        window.location.href = "./?page=137";
       }
       
      });


    
  }
}
