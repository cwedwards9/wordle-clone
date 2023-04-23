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
        const containsLetter = guessedList.some(guessedWord => guessedWord.includes(key));

        // the key is 'enter' or hasn't been used in a guess, it has an unused status
        if(key === "enter" || !containsLetter) return ButtonColors.greyUnused;

        // if the key has been used in a guess but isn't in the word, it gets an incorrect status
        if(!word.includes(key)) return ButtonColors.greyIncorrect;

        // look thru each guessed word and find where the key has been used and if it is in the correct spot
        const correctIndex = guessedList
          .map(guessedWord => {
            // find all indices that contain the key
            const indices = [];
            const wordArray = guessedWord.split("");

            let idx = guessedWord.indexOf(key)
            while(idx !== -1) {
              indices.push(idx);
              idx = wordArray.indexOf(key, idx + 1);
            }

            return indices;
          })
          .flat()
          .filter(idx => idx !== -1)
          .some(idx => {
            return key === word[idx]
          })

        // if an instance of the key is in the correct spot in the word, return the correct status
        if(correctIndex) return ButtonColors.greenCorrect;
        
        // if none of the key instances are in the correct spot (but in the word), return close status
        return ButtonColors.yellowClose;
      })
    ).subscribe((res) => {
      this.bgColor = res;
    })
  }

  onClick() {
    this.keyClick.emit(this.key.toLowerCase());
  }
}
