import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { BehaviorSubject } from 'rxjs'; 

interface IArtwork{
  'config' : {},
  'data' : [],
  'info' : {},
  'pagination' : {}
}

interface ISingleArtwork{
  'config' : {},
  'data' : any,
  'info' : {},
  'pagination' : {}
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  COLLECTION_BASE_URL = "https://api.artic.edu/api/v1/artworks"

  searchData = new BehaviorSubject<IArtwork>({
    'config':{},
    'data': [],
    'info': {},
    'pagination':{}
  }); 

  favData = new BehaviorSubject<IArtwork>({
    'config':{},
    'data': [],
    'info': {},
    'pagination':{}
  }); 

  constructor(private http: HttpClient) { }

  getArtworks(page: number){
    let params = new HttpParams();
    params = params.append('page', page);

    return this.http.get<IArtwork>(this.COLLECTION_BASE_URL, {params : params});
  }

  getSingleArtwork(id: number){
    return this.http.get<ISingleArtwork>(this.COLLECTION_BASE_URL + "/" + id);
  }



  getArtworksByQuery(query: string){
    this.http.get<IArtwork>(this.COLLECTION_BASE_URL + "/search?q=" + query).subscribe(
      data => {
        let ids : string[] = [];
        data['data'].forEach(item => {
          ids.push(item['id']);
        });
        
        this.http.get<IArtwork>(this.COLLECTION_BASE_URL + "/?ids=" + ids.toString()).subscribe(
          response => {
            this.searchData.next(response);
            console.log(response);
          }
        );
      }
    );

  }

  addToFav(id: number) : void{
    let fav = JSON.parse(window.localStorage.getItem('fav')!);
    fav.push(id);
    window.localStorage.setItem('fav',JSON.stringify(fav));
  }

  removeFromFav(id: number) : void{
    let fav = JSON.parse(window.localStorage.getItem('fav')!);
    fav.splice(fav.indexOf(id),1);
    window.localStorage.setItem('fav',JSON.stringify(fav));
  }

  getFav(ids: string) : void{
    this.http.get<IArtwork>(this.COLLECTION_BASE_URL + "/?ids=" + ids.toString()).subscribe(
      response => {
        this.favData.next(response);
        console.log(ids);
        console.log(response);
      });
  }

}
