import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key!: string;
  @Output() keyClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.keyClick.emit(this.key.toLowerCase());
  }

}
