import { Component, OnInit , Input} from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';
import { MainService } from '../main/main.service';

@Component({
  selector: 'grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss']
})
export class GridRowComponent implements OnInit {
  @Input() rowNum!: number;

  constructor() { }

  ngOnInit(): void {}
}
