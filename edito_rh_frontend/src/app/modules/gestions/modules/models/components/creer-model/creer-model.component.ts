import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { getMetadataSelector } from 'src/app/modules/gestions/state/gestion.selectors';
import { AppState } from 'src/app/store/app.state';
import { modelPageTypeChange } from '../../state/model.actions';
import { modelPageSelector, modelPageTypeSelector, putModelFailureSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-creer-model',
  templateUrl: './creer-model.component.html',
  styleUrls: ['./creer-model.component.scss']
})
export class CreerModelComponent implements OnInit {


  @Input()
  modelData$?:Observable<any>;
  metadata$!:Observable<any>
  pageType$!:Observable<any>
  tempObj:any={}
  errorObj:any={}
  is_error:boolean=false
  putError$!:Observable<any>
  modelPage$!:Observable<any>
  @Input() buildModelFromTempObj!: (tempObj:any) => any;
  @Input() postModel!: (newModel:any) => any;

  ngOnInit(): void {
    this.metadata$=this.store.pipe(
      select(getMetadataSelector),
      filter( val=> val !== undefined),
      map((metadata)=> {
        this.initializeTempObj(metadata)
        return metadata
      })
    )

    this.putError$=this.store.pipe(
      select(putModelFailureSelector),
      filter( val=> val !== undefined),
      map((putError)=> {
        return putError
      })
    )

    this.pageType$=this.store.pipe(
      select(modelPageTypeSelector),
      filter( val=> val !== undefined),
      map((pageType)=> {
        return pageType
      })
    )

    this.modelPage$=this.store.pipe(
      select(modelPageSelector),
      filter( val=> val !== undefined),
      map((page)=> {
        return page
      })
    )
    }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  updateIsError=(fieldError:any)=>{
    //console.log(fieldError)
      this.errorObj[fieldError.label]=fieldError.error
      let is_error=false
      Object.keys(this.errorObj).forEach((key, index) => {
        if(this.errorObj[key]!=='') is_error=true
      }) 
      this.is_error=is_error
  }

  submit(){
    //let tempObj=JSON.parse(JSON.stringify(this.tempObj))
    let tempObj={...this.tempObj}
    console.log(this.tempObj)
    //check the page, it's better

    this.modelPage$.subscribe((p:string)=>{
      const rubriques=tempObj.rubriques
      const variables=tempObj.variables
      if(p===ModelPage.EMPLOYE){
        if(rubriques!==undefined){
          let L:number[]=[]
          rubriques.forEach((e:any)=>{
            L.push(e.id)
          })
          tempObj.rubriques=L
        }
      }
      else if(p===ModelPage.FORMULE){
        if(variables!==undefined){
          let L:number[]=[]
          variables.forEach((e:any)=>{
            L.push(e.id)
          })
          
          tempObj.variables=L
        } 
      }
    })
    const newModel=this.buildModelFromTempObj(tempObj)
    this.postModel(newModel)
    this.goToList()
  }


  initializeTempObj(metadata:any){
    metadata!.fields.forEach((field_metadata:any) => {
      this.tempObj[field_metadata.label]=this.getFieldValue(field_metadata.label)
    });
  }

  getFieldValue=(field_metadata_label:string)=>{
    let result
    const obs=this.modelData$?.subscribe((modelData)=>{
      result=modelData[field_metadata_label]
    })
    obs?.unsubscribe()
    return result
  }

  updateTempObj(field:any){
    this.tempObj[field.label]=field.value
  }

  goToList(){
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
  }

  cancel(){
    this.goToList()
  }

  is_ignore(label:string){
    if(label==='montant') return true
    return false
  }
  capitalizeFirstLetter(s:string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  
  handleLabel=(label:string)=>{
    const s=label.replace('_',' ')
    return this.capitalizeFirstLetter(s)
  }

  constructor(
    private store:Store<AppState>,
    private cdRef : ChangeDetectorRef,
    private route:ActivatedRoute
  ) { }


}
