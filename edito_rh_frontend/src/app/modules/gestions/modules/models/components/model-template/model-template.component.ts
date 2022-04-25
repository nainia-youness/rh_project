import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { modelPageSelector, modelPageTypeSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-model-template',
  templateUrl: './model-template.component.html',
  styleUrls: ['./model-template.component.scss']
})
export class ModelTemplateComponent implements OnInit {

  modelPageType$!:Observable<ModelPageType>
  modelPage$!:Observable<ModelPage>

  ngOnInit(): void {
    this.modelPageType$=this.store.pipe(
      select(modelPageTypeSelector),
      map((modelPage)=>modelPage)
    )
    this.modelPage$=this.store.pipe(
      select(modelPageSelector),
      map((modelPage)=>modelPage)
    )
  }

  constructor(
    private store:Store<AppState>,
    ) { }

  create(){
    console.log('creer')
  }

  update(){
    console.log('update')
  }
}
