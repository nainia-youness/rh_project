import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-creer-model',
  templateUrl: './creer-model.component.html',
  styleUrls: ['./creer-model.component.scss']
})
export class CreerModelComponent implements OnInit {

  @Input()
  modelData$?:Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
