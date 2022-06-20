import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() onKeyClick = new EventEmitter<string>();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `backspace`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/backspace.svg")
    ); }

  ngOnInit(): void {
  }

  backspaceClick() {
    this.keyClick("backspace");
  }

  keyClick(key: string) {
    console.log(key)
    this.onKeyClick.emit(key);
  }

}
