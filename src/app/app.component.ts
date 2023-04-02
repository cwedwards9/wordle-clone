import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public opened: boolean = false;

  public toggleSideNav() {
    this.opened = !this.opened;
  }
}
