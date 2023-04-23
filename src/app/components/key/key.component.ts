import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

enum ButtonColors {
  greenCorrect = "#6aaa64",
  yellowClose = "#c9b458",
  greyIncorrect = "#3a3a3c",
  greyUnused = "#818384"
}

@Component({
  selector: 'key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key!: string;
  @Output() keyClick = new EventEmitter<string>();

  currentWord$ = this.mainService.currentWord$
  guessedWordsList$ = this.mainService.guessedWordsList$

  bgColor!: string;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    combineLatest(this.currentWord$, this.guessedWordsList$).pipe(
      map(([word, guessedList]) => {
        const key = this.key.toLowerCase();
        console.log(key)
        console.log(guessedList)
        const containsLetter = guessedList.some(guessedWord => guessedWord.includes(key));
        // the key is 'enter' or hasn't been used in a guess, it is an unused status
        if(key === "enter" || !containsLetter) return ButtonColors.greyUnused;

        // if the letter/key has been used in a guess but isn't in the word, it gets an incorrect status
        if(!word.includes(key)) return ButtonColors.greyIncorrect;

        // by this point, the letter has been used at least once, find the index the letter/key is in
        const correctIndexLetter = guessedList.map(guessedWord => {
          return guessedWord.indexOf(key)
        }).filter(idx => idx !== -1).some(idx => {
          console.log(idx)
           return key === word[idx]
        })
        console.log(correctIndexLetter)

        if(correctIndexLetter) return ButtonColors.greenCorrect;
        

        return ButtonColors.yellowClose;
      })
    ).subscribe((res) => {
      console.log(res)
      this.bgColor = res;
    })
  }

  onClick() {
    this.keyClick.emit(this.key.toLowerCase());
  }
}
