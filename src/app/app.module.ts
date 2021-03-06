import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { FooterComponent } from './components/footer/footer.component';
import {AlbumService} from './services/album.service';
import {HttpClientModule} from '@angular/common/http';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    FooterComponent,
    AlbumDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule
    ],
  providers: [AlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
