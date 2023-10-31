import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SecondHeaderComponent } from './second-header/second-header.component';
import { ThirdHeaderComponent } from './third-header/third-header.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailedComponent } from './detailed/detailed.component';
import { SharedModule } from 'src/shared/shared.module';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SecondHeaderComponent,
    ThirdHeaderComponent,
    ShowcaseComponent,
    CollectionComponent,
    DetailedComponent,
    SearchComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
