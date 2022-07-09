import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss']
})
export class GridTileComponent implements OnInit {
  @Input() rowWord!: string;
  @Input() tileNum!: number;

  tileLetter!: string;

  constructor() { }

  ngOnInit(): void {
    if(this.rowWord && this.rowWord.length > this.tileNum) {
      this.tileLetter = this.rowWord[this.tileNum];
    }
  }

}
