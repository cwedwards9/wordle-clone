import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TutorialDialogComponent} from "../tutorial-dialog/tutorial-dialog.component";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer, 
    private dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      `menu`,
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("./assets/images/menu.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `questionMark`,
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("./assets/images/question-mark.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `settings`,
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("./assets/images/settings.svg")
    );
  }

  ngOnInit(): void {
  }

  openTutorialDialog() {
    const dialogRef = this.dialog.open(TutorialDialogComponent, {
      position: {
        top: "50px"
      },
      maxHeight: "calc(100vh - 75px)"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
