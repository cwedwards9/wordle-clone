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
  letterStatus!: string;

  guessedWordsList$ = this.mainService.guessedWordsList$;
  guessedWord$ = this.mainService.guessedWord$;
  currentRow$ = this.mainService.currentRow$;
  currentWord$ = this.mainService.currentWord$

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
    ).subscribe(guessedWord => {
      this.tileLetter = guessedWord[this.tileNum]
    })

    // compare letter to the current, real, word's letter in this index
    this.currentWord$.subscribe(currentWord => {
      if(this.tileLetter === currentWord[this.tileNum]) 
        this.letterStatus = "correct";
      else if(currentWord.includes(this.tileLetter)) 
        this.letterStatus = "close";
      else if(!currentWord.includes(this.tileLetter) && !!this.tileLetter) 
        this.letterStatus = "incorrect";
      else this.letterStatus = "";
    })


    combineLatest([this.currentRow$, this.guessedWord$]).pipe(map(([currentRow, guessedWord]) => {
      if(currentRow === this.rowNum) {
        this.tileLetter = guessedWord[this.tileNum]
      }
    })).subscribe()
  }
}
