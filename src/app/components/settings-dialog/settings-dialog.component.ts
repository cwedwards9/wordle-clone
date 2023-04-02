import { Component, OnInit } from '@angular/core';
import { MainService } from '../main/main.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  public year!: number
  public toggleColor = "#6aaa64";

  constructor(private mainService: MainService) { }
  
  ngOnInit(): void {
    const date = new Date();

    this.year = date.getFullYear();
  }

  public resetGame() {
    // clear local storage data
    localStorage.removeItem("usedWordsList");
    localStorage.removeItem("wordleData");

    // update state and reset the local storage in main service
    this.mainService.resetStats();
  }

}
