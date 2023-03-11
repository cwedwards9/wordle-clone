import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  public year!: number

  constructor() { }
  
  ngOnInit(): void {
    const date = new Date();

    this.year = date.getFullYear();
  }

}
