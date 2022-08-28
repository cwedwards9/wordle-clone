import { Component, HostListener, OnInit } from '@angular/core';
import { MainService } from './main.service';

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz";

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

    if (allowedCharacters.includes(key))
      this.mainService.addLetterToWord(key);
    else if(key === "enter")
      this.mainService.enterWord();
    else if(key == "backspace")
      this.mainService.removeLetter();
  }

  ngOnInit(): void {
  }

  keyClick(key: string) {
    this.mainService.addLetterToWord(key);
  }

  backspaceClick() {
    this.mainService.removeLetter();
  }
  
  enterClick() {
    this.mainService.enterWord();
  }

}
