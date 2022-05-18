import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `menu`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/menu.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `questionMark`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/question-mark.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `settings`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/settings.svg")
    );
  }

  ngOnInit(): void {
  }

}
