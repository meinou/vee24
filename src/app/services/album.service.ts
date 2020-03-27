import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../album.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getAll(): Observable<Album[]>  {
    return this.getAlbums()
      .pipe(map ((data) => {
        const {entry} = data.feed;
        return this.parseForAlbums(entry);
      }));
  }

  parseForAlbums(entry): Album[] {
    return entry.map((album, key) => {
      if (album) {
        return {
          key,
          id: album.id.label,
          name: album['im:name'].label,
          artist: album['im:artist'].label,
          image: album['im:image'] && album['im:image'][2] ? album['im:image'][2].label : '',
          itemCount: +album['im:itemCount'].label,
          price: +album['im:price'].attributes.amount,
          currency: album['im:price'].attributes.currency,
          rights: album.rights.label,
          title: album.title.label,
          link: album.link && album.link.attributes ? album.link.attributes.href : '',
          category: album.category && album.category.attributes ? album.category.attributes.label : '',
          releaseDate: album['im:releaseDate'].label,
        };
      }
    });
  }
}
