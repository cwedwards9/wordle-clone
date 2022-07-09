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
  guessedWords: ["weird", "blast", "broke"],
  currentWord: "",
  currentRow: 1,
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
  

  constructor() { }

  // actions, settings state from other components
  addLetterAsUsed(key: string) {
    this.setAddedLetterAsUsed(key);
  }


  // set state
  protected setAddedLetterAsUsed(key: string) {
    
  }
}
