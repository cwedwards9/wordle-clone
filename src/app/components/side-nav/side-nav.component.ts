import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer, 
  ) {
    this.matIconRegistry.addSvgIcon(
      `tableCells`,
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("./assets/images/table-cells-solid.svg")
    );
   }

  ngOnInit(): void {
  }

}
