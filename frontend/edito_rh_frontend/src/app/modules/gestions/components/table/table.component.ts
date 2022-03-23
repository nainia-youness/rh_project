import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FonctionModel } from 'src/app/shared/models/fonction.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() dataSource$?:Observable<FonctionModel[] | undefined>;
  @Input() displayedColumns:any
  @Input() columns:any[]=[]
  constructor() { }

  ngOnInit(): void {
  }

  
  goToEntity=()=>{
    console.log("i m gone")
  }
}
