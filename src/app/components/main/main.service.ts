import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface KeyState {
  guessedWords: string[];
  currentWord: string;
  currentRow: number;
}

const initialState = {
  guessedWords: [],
  currentWord: "",
  currentRow: 0
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
    if(this.state.currentWord.length === 5) return;

    // update current word with new letter
    const newWord = this.state.currentWord + key
    
    // update the 'current word' in state
    this._state$.next({
      ...this.state,
      currentWord: newWord
    });
  }

  // remove letter
  protected setRemoveLetter() {
    if(this.state.currentWord.length === 0) return;

    // update current word with removing last letter
    const { currentWord } = this.state;
    const newWord = currentWord.substring(0, currentWord.length - 1);
 
    // update the 'current word' in state
    this._state$.next({
      ...this.state,
      currentWord: newWord
    });
  }

  protected setEnterWord() {
    console.log("enter the word to try")
  }
}
