import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
