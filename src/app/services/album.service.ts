import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
