import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private mainService: MainService) { }

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
