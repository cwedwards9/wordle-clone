import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { wordBank } from "../../wordBank";

interface KeyState {
  guessedWordsList: string[];
  guessedWord: string;
  currentWord:  string;
  currentRow: number;
}

const initialState = {
  guessedWordsList: [],
  guessedWord: "",
  currentWord: "",
  currentRow: 0
}

enum GameRules {
  MaxGuesses = 6,
  WordLength = 5,
  RowAmount = 6
}

const wordSet = new Set();

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

  readonly currentWord$ = this._state$.pipe(
    map(state => state.currentWord)
  )

  constructor() { 
    this.generateWord();
  }

  private generateWord() {
    const word = wordBank[Math.floor(Math.random() * wordBank.length)];

    if(wordSet.has(word)) {
      this.generateWord();
    } else {
      wordSet.add(word);
      this.updateCurrentWord(word);
    }
  }

  // actions, settings state from other components
  addLetterToWord(key: string) {
    this.setAddedLetter(key);
  }

  removeLetter() {
    this.setRemoveLetter();
  }

  enterWord() {
    this.submitEnterWord();
  }


  /**
   * add a letter to the user's guessed word
   */
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

  /**
   * remove letter from the user's guessed word
   */
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

  /**
   * called when user clicks the "Enter" button, executes logic if the guessed word is complete and there is another row, guess
   * add the complete, full word, to the list of guessed words, reset the guessed word, move to next row
   */
  protected submitEnterWord() {
    if(this.state.guessedWord.length !== GameRules.WordLength || this.state.currentRow >= GameRules.RowAmount) return;
    console.log("enter the word to try")

    // check the letters of the word against the actual word

    // update state
    const { guessedWord } = this.state;
    const nextRow = this.state.currentRow + 1;

    this._state$.next({
      guessedWordsList: [...this.state.guessedWordsList, guessedWord],
      guessedWord: "",
      currentWord: this.state.currentWord,
      currentRow: nextRow
    })
  }

  /**
   * update the word to guess, in state
   * @param newWord randomly generated word from word bank
   */
  protected updateCurrentWord(newWord: string) {
    
    this._state$.next({
      ...this.state,
      currentWord: newWord
    });
  }
}
