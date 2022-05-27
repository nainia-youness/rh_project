import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { modelPageTypeChange, putModelFailure } from '../../state/model.actions';
import { isModelProgressBarSelector, modelPageSelector, modelPageTypeSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

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
  @Input() buildModelFromTempObj!: (tempObj:any) => any;
  @Input() putModel!: (newModel:any) => any;
  @Input() postModel!: (newModel:any) => any;
  @Input() deleteModel!: (id:string) => any;

  ngOnInit(): void {
    this.modelPageType$=this.store.pipe(
      select(modelPageTypeSelector),
      map((modelPage)=>{
        this.store.dispatch(putModelFailure({putError:""}))
        return modelPage
      })
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

  create=()=>{
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.CREER}))
  }

  update=()=>{
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.MODIFIER}))
  }
  
  delete=()=>{
    let id:any
    this.route.paramMap.subscribe( paramMap => {
      id = paramMap.get('id')
    })
    this.deleteModel(id)
    this.router.navigate(['/gestion'])
  }
  
  constructor(
    private store:Store<AppState>,
    private route:ActivatedRoute,
    private router:Router,
    ) { }

}
