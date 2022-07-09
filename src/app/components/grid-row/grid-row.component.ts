import { Component, OnInit , Input} from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { MainService } from '../main/main.service';

@Component({
  selector: 'grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss']
})
export class GridRowComponent implements OnInit {
  @Input() rowNum!: number;

  guessedWords$ = this.mainService.guessedWords$;

  rowWord!: string;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    // this.guessedWords$.subscribe(v => console.log(v))

    this.guessedWords$.pipe(
      map((words) => {
        return words.filter((word, idx) => {
          return idx === this.rowNum
        })
      })
    ).subscribe(value => {
      console.log(value)
      this.rowWord = value[0]
    })

    
  
  }

  

}
