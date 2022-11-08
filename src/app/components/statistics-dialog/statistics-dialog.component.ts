import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.scss']
})
export class StatisticsDialogComponent implements OnInit {

  public winPercentage!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { gamesPlayed: string, gamesWon: string, winStreak: string }
  ) {}

  ngOnInit(): void {
    const calc = Math.round((Number(this.data.gamesWon) / Number(this.data.gamesPlayed)) * 100);

    this.winPercentage = calc.toString() + "%";
  }

}
