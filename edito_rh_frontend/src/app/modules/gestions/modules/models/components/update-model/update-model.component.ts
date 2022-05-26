import { Component, EventEmitter, Input, OnInit,AfterViewChecked, Output, ChangeDetectorRef } from '@angular/core';
import { isSameMultiYearView } from '@angular/material/datepicker/multi-year-view';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ContratBuilderService } from 'src/app/core/services/utils/builders/contrat_builder/contrat-builder.service';
import { getMetadataSelector } from 'src/app/modules/gestions/state/gestion.selectors';
import { AppState } from 'src/app/store/app.state';
import { DeleteEmployeRubriqueStart, DeleteFormuleVariableStart, modelPageTypeChange, PutEmployeRubriqueStart, PutFormuleVariableStart, PutVilleStart } from '../../state/model.actions';
import { modelPageSelector, modelPageTypeSelector, putModelFailureSelector } from '../../state/model.selectors';
import {ActivatedRoute} from '@angular/router';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.scss']
})
export class UpdateModelComponent implements OnInit,AfterViewChecked {

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
  @Input() putModel!: (newModel:any) => any;

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
    console.log(newModel)
    let oldModel:any
    const obs=this.modelData$?.subscribe((modelData)=>{
      oldModel=modelData
      if(this.isSameModels(oldModel,newModel)){//new model and old model are the same 
        console.log('sammeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        this.goToList()
      }
      else{
        console.log('not sameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        //the tempobj have the montant, but newObj doens t have it TODO 
        
        let pageType:string=''
        this.pageType$.subscribe((p:string)=>{
          pageType=p
        })
        this.modelPage$.subscribe((modelPage:string)=>{
          if(pageType===ModelPageType.MODIFIER){
            if(modelPage===ModelPage.EMPLOYE){
              const deletePutArr=this.getDeletePutList(oldModel.rubriques,this.tempObj.rubriques)
              const deleteArr=deletePutArr[0]
              const putArr=deletePutArr[1]
              let employeId:any
              this.route.paramMap.subscribe( paramMap => {
                employeId = Number(paramMap.get('id'))
              })
              if(deleteArr.length!==0){
                console.log('deleteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
                deleteArr.forEach((e:any) => {
                  const rubriqueId=e.id
                  this.store.dispatch(DeleteEmployeRubriqueStart({employeId:employeId,rubriqueId:rubriqueId}))
                });
              }
              if(putArr.length!==0){
                console.log('puttttttttttttttttttttttttttttttttttttttt')
                putArr.forEach((e:any) => {
                  const rubriqueId=e.id
                  const montant=e.montant
                  this.store.dispatch(PutEmployeRubriqueStart({employeId,rubriqueId,montant}))
                });
              }
            }
            else if(modelPage===ModelPage.FORMULE){
              const deletePutArr=this.getDeletePutList(oldModel.variables,this.tempObj.variables)
              const deleteArr=deletePutArr[0]
              const putArr=deletePutArr[1]
              let formuleId:any
              this.route.paramMap.subscribe( paramMap => {
                formuleId = Number(paramMap.get('id'))
              })
              if(deleteArr.length!==0){//delete formule
                console.log('deleteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
                deleteArr.forEach((e:any) => {
                  const variableId=e.id
                  this.store.dispatch(DeleteFormuleVariableStart({formuleId:formuleId,variableId:variableId}))
                });
              }
              if(putArr.length!==0){//put formule
                console.log('puttttttttttttttttttttttttttttttttttttttt')
                putArr.forEach((e:any) => {
                  const variableId=e.id
                  this.store.dispatch(PutFormuleVariableStart({formuleId:formuleId,variableId:variableId}))
                });
              }
            }
          }
        })


        //when an error occur, show a dialog
        this.putModel(newModel)
        this.goToList()
      }
    })
  }


  getDeletePutList(oldArr:any,newArr:any){
    let deleteArr:number[]=[]
    let putArr:any=[]
    if(oldArr.length===0 && newArr.length!==0){
      return [[],newArr]
    }
    else if(oldArr.length!==0 && newArr.length===0){
      return [oldArr,[]]
    }
    else{
      //added fields and montant change
      newArr.forEach((e1:any) => {
        let isInOldArr:boolean=false
        let shouldMontantPut:boolean=true
        let isEmploye:boolean=false
        oldArr.forEach((e2:any) => {
          if(e2.id===e1.id){
            if(e1.montant!==undefined){
              isEmploye=true
              if(e1.montant===e2.montant){
                shouldMontantPut=false
              }
            }
            isInOldArr=true
          }
        })
        if(!isInOldArr || (isInOldArr && shouldMontantPut && isEmploye)){
          putArr.push(e1)
        }
      })
      //for delete 
      oldArr.forEach((e1:any,index:any) => {
        let isInOldArr:boolean=false
        newArr.forEach((e2:any) => {
          if(e1.id===e2.id){
            isInOldArr=true
          }
        })
        if(!isInOldArr){
          deleteArr.push(e1)
        }
      });
    }
    return [deleteArr,putArr]
  }

  isSameModels(oldModel:any,newModel:any){
    let result=true
    Object.keys(newModel).forEach((key, index) => {

      if(oldModel[key]!==undefined &&  newModel[key]!==undefined){
        if(Array.isArray(newModel[key])){//if is array
          if((oldModel[key].length===0 && newModel[key].length!==0) || (oldModel[key].length!==0 && newModel[key].length===0)){
            result=false
          }
          else if(oldModel[key].length !==0 && newModel[key].length!==0){
            oldModel[key].forEach((e1:any)=>{
                let isMontantChanged=false
                const removedUnderscoreKey=key.substring(1)
                this.tempObj[removedUnderscoreKey].forEach((e2:any)=>{
                  if(e1.montant!==undefined){
                    if(e1.id===e2.id && e1.montant!==e2.montant){
                      isMontantChanged=true
                    }
                  }
                  else{
                    if(e1.id===e2.id){
                      isMontantChanged=true
                    }
                  }
                })
                if(isMontantChanged){
                  result=false
                }
              let is_equal=false
              newModel[key].forEach((e2:any)=>{
                if(e1.id===e2){
                  is_equal=true
                }
              })
              if(!is_equal){
                result=false
              }
            })
          }
        }
        else if(typeof oldModel[key] === 'object'){//for example delegue or affectation
            if(newModel[key]!==oldModel[key].id){
              result=false
            }
        }
        else{
            if(oldModel[key]!==newModel[key]){
              result=false
            }
        }    
      }

    });
    return result
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
