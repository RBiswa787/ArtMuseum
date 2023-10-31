import { Component } from '@angular/core';
import { CollectionService } from 'src/shared/services/collection.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'art-musuem';

  constructor(private collectionService : CollectionService){

    this.init();
  }

  init(){
    if(window.localStorage.getItem('fav') == null){
      window.localStorage.setItem('fav',JSON.stringify([]));
    }
  }

  
}
