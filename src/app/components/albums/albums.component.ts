import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  constructor(private albumService: AlbumService,
              private cdRef: ChangeDetectorRef) { }
  @Input() search: string;
  fromServer: Album[] = [];
  albums: Album[] = [];
  fetched = false;
  index: number;

  click(){

  }
  ngOnInit(): void {
    this.albumService.getAlbums()
      .subscribe((data) => {
        const {entry} = data.feed;
        this.albums = this.parseForAlbums(entry);
        this.fromServer = [...this.albums];
        this.fetched = true;
      });
  }

  parseForAlbums(entry): Album[] {
    console.log(entry);
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

  showDetail(key) {
    console.log(this.albums[key]);
    this.index = key;
  }

  setSearch(event: any) {
    this.search = event.target.value;
  }

  filter() {
    if (!this.search || this.search === '') { this.albums = this.fromServer; } else {
      this.albums = this.fromServer
                        .filter(album => (album.name.toLowerCase().includes(this.search) || album.artist.includes(this.search)));
    }
  }
}
