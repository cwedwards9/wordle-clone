import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface KeyState {
  lettersUsed: string[];
}

const initialState = {
  lettersUsed: [],
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // behavior subjects, used to house the state object(s)
  private readonly _state$ = new BehaviorSubject<Readonly<KeyState>>(initialState);


  // observables
  readonly lettersUsed$ = this._state$.pipe(
    map(state => state.lettersUsed)
  )


  constructor() { }


  // actions, settings state from other components
  addLetterAsUsed() {
    this.setAddedLetterAsUsed();
  }


  // set state
  protected setAddedLetterAsUsed() {

  }
}
