import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TutorialDialogComponent } from "../tutorial-dialog/tutorial-dialog.component";
import { StatisticsDialogComponent } from '../statistics-dialog/statistics-dialog.component';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MainService } from '../main/main.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private mainService: MainService,
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

  ngOnInit(): void {}

  public openTutorialDialog() {
    this.dialog.open(TutorialDialogComponent, {
      position: {
        top: "50px"
      },
      maxHeight: "calc(100vh - 75px)"
    });
  }

  public openStatsDialog() {
    this.mainService.openStatisticsDialog();
  }
}
