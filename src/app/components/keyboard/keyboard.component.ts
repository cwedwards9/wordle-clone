import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { KEY_LIST } from "../../keyList";

@Component({
  selector: 'keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  keyList: string[] = KEY_LIST;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `backspace`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/backspace.svg")
    ); }

  ngOnInit(): void {
  }

}
