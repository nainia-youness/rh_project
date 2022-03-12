import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { History } from '../state/layout.interface';
import { getHistory, getShowFooter } from '../state/layout.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showFooter$!:Observable<boolean>
  history$!:Observable<History>
  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {
    this.showFooter$= this.store.select(getShowFooter)
    this.history$= this.store.select(getHistory)
  }

  formatDate=(date:Date)=>{
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const result= mm + '/' + dd + '/' + yyyy
    return result;
  }
}
