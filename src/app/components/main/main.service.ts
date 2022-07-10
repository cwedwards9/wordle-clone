import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface KeyState {
  guessedWords: string[];
  currentWord: string;
  currentRow: number;
  currentTileIndex: number;
}

const initialState = {
  guessedWords: ["weird", "blast", "broke", "ocean"],
  currentWord: "stra",
  currentRow: 0,
  currentTileIndex: 0
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // behavior subjects, used to house the state object(s)
  private readonly _state$ = new BehaviorSubject<Readonly<KeyState>>(initialState);

  protected get state() {
    return this._state$.getValue();
  }

  readonly guessedWords$ = this._state$.pipe(
    filter((state) => !!state.guessedWords),
    map((state) => state.guessedWords)
  )

  readonly currentWord$ = this._state$.pipe(
    map(state => state.currentWord)
  )
  
  readonly currentRow$ = this._state$.pipe(
    map(state => state.currentRow)
  )

  constructor() { }

  // actions, settings state from other components
  addLetterToWord(key: string) {
    this.setAddedLetter(key);
  }

  removeLetter() {
    this.setRemoveLetter();
  }

  enterWord() {
    this.setEnterWord();
  }


  // set state
  protected setAddedLetter(key: string) {
    // if it is all but these two keys, look to update state
    if(key !== "enter") {
      const row = this.state.currentWord.length === 4 ? this.state.currentRow + 1 : this.state.currentRow;
      
      // only update the 'current word' in state if the word is less than 5 letters
      if(this.state.currentWord.length < 5) {
        this._state$.next({
          ...this.state,
          currentWord: this.state.currentWord + key,
          currentRow: row,
        });
      }

      console.log(this.state)
    }
  }

  protected setRemoveLetter() {
    // remove letter
    console.log("code to remove letter here")
  }

  protected setEnterWord() {
    console.log("enter the word to try")
  }
}
