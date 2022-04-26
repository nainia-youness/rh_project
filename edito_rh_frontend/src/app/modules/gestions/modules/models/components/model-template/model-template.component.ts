import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { isModelProgressBarSelector, modelPageSelector, modelPageTypeSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-model-template',
  templateUrl: './model-template.component.html',
  styleUrls: ['./model-template.component.scss']
})
export class ModelTemplateComponent implements OnInit {

  modelPageType$!:Observable<ModelPageType>
  modelPage$!:Observable<ModelPage>
  isModelProgressBar$!:Observable<boolean>
  @Input()
  modelData$?:Observable<any>;

  ngOnInit(): void {
    this.modelPageType$=this.store.pipe(
      select(modelPageTypeSelector),
      map((modelPage)=>modelPage)
    )
    this.modelPage$=this.store.pipe(
      select(modelPageSelector),
      map((modelPage)=>modelPage)
    )
    this.isModelProgressBar$=this.store.pipe(
      select(isModelProgressBarSelector),
      map((isModelProgressBar)=>isModelProgressBar)
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

  delete(){
    console.log('delete')
  }
}
