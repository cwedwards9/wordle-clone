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
    this.loadConfig();
    this.generateGame();
  }

  /**
   * on game load, check if we have something in local storage to track our user's game history 
   */
   private loadConfig() {
    const wordleData = localStorage.getItem("wordleData");
    if(!!wordleData) return;

    this.generateWord();

    const initWordleGame = JSON.stringify({
      gamesPlayed: 0,
      gamesWon: 0,
      winStreak: 0,
      currentWord: this.state.currentWord,
      guessedWords: []
    });

    localStorage.setItem("wordleData", initWordleGame);
  }

  /**
   * after submitting a game, save the game and user's updated stats to local storage
   */
  private saveGame(status: number) {
    const wordleData = JSON.parse(localStorage.getItem("wordleData") as string);

    let { gamesPlayed, gamesWon, winStreak } = wordleData;

    const updatedData = JSON.stringify({
      gamesPlayed: gamesPlayed + 1,
      gamesWon: status === 1 ? gamesWon + 1 : gamesWon,
      winStreak: status === 1 ? winStreak + 1 : 0,
      currentWord: this.state.currentWord,
      guessedWords: this.state.guessedWordsList
    });

    localStorage.setItem("wordleData", updatedData);
  }

  private saveBeforeLeaving() {
    const wordleData = JSON.parse(localStorage.getItem("wordleData") as string);

    let { gamesPlayed, gamesWon, winStreak } = wordleData;

    const updatedData = JSON.stringify({
      gamesPlayed: gamesPlayed,
      gamesWon: gamesWon,
      winStreak: winStreak,
      currentWord: this.state.currentWord,
      guessedWords: this.state.guessedWordsList
    });

    localStorage.setItem("wordleData", updatedData);
  }

  

  /**
   * generate game, update state with user's last game history (whether it was finished or unfinished)
   */
  private generateGame() {
    const wordleData = JSON.parse(localStorage.getItem("wordleData") as string);

    let { currentWord, guessedWords } = wordleData;

    this._state$.next({
      ...this.state,
      currentWord: currentWord,
      guessedWordsList: guessedWords,
      currentRow: guessedWords.length
    });
  }

  private generateWord() {
    // if there is nothing, generate a word
    const word = wordBank[Math.floor(Math.random() * wordBank.length)];

    if(wordSet.has(word)) {
      this.generateWord();
    } else {
      wordSet.add(word);
      this.updateCurrentWord(word);
    }
  }

  /**
   * when a user leaves wordle, save the progress of the game
   */
  public saveCurrentGame() {
    this.saveBeforeLeaving();
  }

  // actions, settings state from other components

  /**
   * adds the clicked letter to the current row's word 
   * @param key the alphabetical key clicked on the keyboard in the app
   */
  public addLetterToWord(key: string) {
    this.setAddedLetter(key);
  }

  /**
   * removes the last letter from the current row
   */
  public removeLetter() {
    this.setRemoveLetter();
  }

  /**
   * enters / submits the current row's word if it is complete
   */
  public enterWord() {
    this.submitEnterWord();
  }


  /**
   * add a letter to the user's guessed word
   */
  protected setAddedLetter(key: string) {
    if(this.state.guessedWord.length === GameRules.WordLength) return;

    // update current word with new letter
    const updatedWord = this.state.guessedWord + key
    
    // update the 'current word' in state
    this._state$.next({
      ...this.state,
      guessedWord: updatedWord
    });
  }

  /**
   * remove letter from the user's guessed word
   */
  protected setRemoveLetter() {
    if(this.state.guessedWord.length === 0) return;

    // update current word with removing last letter
    const { guessedWord } = this.state;
    const updatedWord = guessedWord.substring(0, guessedWord.length - 1);
 
    // update the 'current word' in state
    this._state$.next({
      ...this.state,
      guessedWord: updatedWord
    });
  }

  /**
   * submits the current word if the guessed word is complete
   * add the complete, full word, to the list of guessed words, reset the guessed word, move to next row
   */
  protected submitEnterWord() {
    if(this.state.guessedWord.length !== GameRules.WordLength) return;

    // if we guess the correct word
    if(this.state.guessedWord === this.state.currentWord) {
      // open dialog box with stats, congrats message, update local storage with win, games played, set a new word, reset state
      this.resetState();
      this.generateWord();
      this.saveGame(1);
      return;
    }
     
    // if we are submitting our last guess
    if(this.state.currentRow === GameRules.RowAmount - 1) {
      this.resetState();
      this.generateWord();
      this.state.guessedWord === this.state.currentWord ? this.saveGame(1) : this.saveGame(0);
      return;
    }

    // update state
    const { guessedWord } = this.state;
    const nextRow = this.state.currentRow + 1;

    this._state$.next({
      guessedWordsList: [...this.state.guessedWordsList, guessedWord],
      guessedWord: "",
      currentWord: this.state.currentWord,
      currentRow: nextRow
    });
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

  /**
   * after a game has finished, reset game state
   */
  protected resetState() {
    this._state$.next({
      ...this.state,
      guessedWordsList: [],
      guessedWord: "",
      currentWord: "",
      currentRow: 0
    });
  }
}
