import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface KeyState {
  guessedWordsList: string[];
  guessedWord: string;
  currentRow: number;
}

const initialState = {
  guessedWordsList: [],
  guessedWord: "",
  currentRow: 0
}

enum GameRules {
  MaxGuesses = 6,
  WordLength = 5,
  RowAmount = 6
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

  readonly guessedWordsList$ = this._state$.pipe(
    filter((state) => !!state.guessedWordsList),
    map((state) => state.guessedWordsList)
  )

  readonly guessedWord$ = this._state$.pipe(
    map(state => state.guessedWord)
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
    if(this.state.guessedWord.length === GameRules.WordLength) return;

    // update current word with new letter
    const newWord = this.state.guessedWord + key
    
    // update the 'current word' in state
    this._state$.next({
      ...this.state,
      guessedWord: newWord
    });
  }

  // remove letter
  protected setRemoveLetter() {
    if(this.state.guessedWord.length === 0) return;

    // update current word with removing last letter
    const { guessedWord } = this.state;
    const newWord = guessedWord.substring(0, guessedWord.length - 1);
 
    // update the 'current word' in state
    this._state$.next({
      ...this.state,
      guessedWord: newWord
    });
  }

  protected setEnterWord() {
    if(this.state.guessedWord.length !== GameRules.WordLength || this.state.currentRow >= GameRules.RowAmount) return;
    console.log("enter the word to try")

    // check the letters of the word against the actual word

    // update state
    const { guessedWord } = this.state;
    const nextRow = this.state.currentRow + 1;

    this._state$.next({
      guessedWordsList: [...this.state.guessedWordsList, guessedWord],
      guessedWord: "",
      currentRow: nextRow
    })
  }
}
