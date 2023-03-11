import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public opened: boolean = true;

  public toggleSideNav() {
    this.opened = !this.opened;
  }
}
