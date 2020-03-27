import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  constructor(private albumService: AlbumService) { }

  fromServer: Album[] = [];
  albums: Album[] = [];
  fetched = false;
  index: number;

  click(event: any) {
    event.stopPropagation();
  }
  ngOnInit(): void {
    this.albumService.getAll()
      .subscribe((data) => {
        this.albums = data;
        this.fromServer = [...this.albums];
        this.fetched = true;
      });
  }

  showDetail(key) {
    console.log(this.albums[key]);
    this.index = key;
  }

  filter(search) {
    if (!search || search === '') { this.albums = this.fromServer; } else {
      this.albums = this.fromServer
                        .filter(album => (album.name.toLowerCase().includes(search) || album.artist.includes(search)));
    }
  }
}
