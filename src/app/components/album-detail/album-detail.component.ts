import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../album.model';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  @Input() album: Album;
  @Input() index: number;
  @Output() indexChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.index = null;
    this.indexChange.emit((this.index));
  }
}
