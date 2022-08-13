import { Component, OnInit, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainService } from '../main/main.service';

@Component({
  selector: 'grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss']
})
export class GridTileComponent implements OnInit {
  @Input() tileNum!: number;
  @Input() rowNum!: number;

  tileLetter!: string;

  guessedWordsList$ = this.mainService.guessedWordsList$;
  guessedWord$ = this.mainService.guessedWord$;
  currentRow$ = this.mainService.currentRow$;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.guessedWordsList$.pipe(
      map((words) => {
        return words.filter((word, idx) => {
          return idx === this.rowNum;
        })
      }),
      map(value => value[0]),
      map(word => {
        return word ? word : "";
      })
    ).subscribe(word => {
      this.tileLetter = word[this.tileNum]
    })

    // this.currentRow$.pipe(combineLatest)

    combineLatest([this.currentRow$, this.guessedWord$]).pipe(map(([currentRow, guessedWord]) => {
      if(currentRow === this.rowNum) {
        this.tileLetter = guessedWord[this.tileNum]
      }
    })).subscribe()
  }
}
