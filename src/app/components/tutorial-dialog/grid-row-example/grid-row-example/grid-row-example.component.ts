import { Component, Input, OnInit } from '@angular/core';
import { IWordExample } from '../../tutorial-dialog.component';

@Component({
  selector: 'grid-row-example',
  templateUrl: './grid-row-example.component.html',
  styleUrls: ['./grid-row-example.component.scss']
})
export class GridRowExampleComponent implements OnInit {
  @Input() wordExampleObject!: IWordExample;
  public wordExample!: string[];

  constructor() {}
  
  ngOnInit(): void {
    this.wordExample = this.wordExampleObject.word.split("");
  }

}
