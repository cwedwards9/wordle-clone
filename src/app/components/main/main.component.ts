import { Component, HostListener, OnInit } from '@angular/core';
import { MainService } from './main.service';

const ALLOWED_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private mainService: MainService) { }

  @HostListener("window:keydown", ['$event'])
  keyEvent(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (ALLOWED_CHARACTERS.includes(key))
      this.mainService.addLetterToWord(key);
    else if(key === "enter")
      this.mainService.enterWord();
    else if(key == "backspace")
      this.mainService.removeLetter();
  }

  @HostListener('window:unload', [ '$event' ])
  /**
   * before leaving the game, save the stats of the game to local storage
   */
  public unloadHandler() {
    this.mainService.saveCurrentGame();
  }

  ngOnInit(): void {}

  public keyClick(key: string) {
    this.mainService.addLetterToWord(key);
  }

  public backspaceClick() {
    this.mainService.removeLetter();
  }
  
  public enterClick() {
    this.mainService.enterWord();
  }
}
