import { Component, EventEmitter, Input, OnInit,AfterViewChecked, Output, ChangeDetectorRef } from '@angular/core';
import { isSameMultiYearView } from '@angular/material/datepicker/multi-year-view';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ContratBuilderService } from 'src/app/core/services/utils/builders/contrat_builder/contrat-builder.service';
import { getMetadataSelector } from 'src/app/modules/gestions/state/gestion.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.scss']
})
export class UpdateModelComponent implements OnInit,AfterViewChecked {

  @Input()
  modelData$?:Observable<any>;
  metadata$!:Observable<any>
  tempObj:any={}
  errorObj:any={}
  is_error:boolean=false
  @Input() buildModelFromTempObj!: (tempObj:any) => any;

  ngOnInit(): void {
    //the initial values are model data
    //every time a change happens,i  change the temp_obj 
    //when enregistrer is clicked i create a new model from teh temp obj, then compare it with the inital one
    //if it s different i start the update by sending the new one with put request
    /*
    temp_obj{
      'formule':"",
      'designation':"error",
      'fonction':"",
      'rubriques':""
    }
    error_obj{

    }
    */
    this.metadata$=this.store.pipe(
      select(getMetadataSelector),
      filter( val=> val !== undefined),
      map((metadata)=> {
        this.initializeTempObj(metadata)
        return metadata
      })
    )
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  updateIsError=(fieldError:any)=>{

      this.errorObj[fieldError.label]=fieldError.error
      let is_error=false
      Object.keys(this.errorObj).forEach((key, index) => {
        if(this.errorObj[key]!=='') is_error=true
      }) 
      this.is_error=is_error
  }

  submit(){
    //no value empty
    //if formule do the validatation
    const newModel=this.buildModelFromTempObj(this.tempObj)
    let oldModel
    const obs=this.modelData$?.subscribe((modelData)=>{
      oldModel=modelData
      if(this.isSameModels(oldModel,newModel)){
        console.log('same')
        this.goToList()
      }
      else{
        //send put request with new model
        console.log('not same')
      }
    })
  }

  isSameModels(oldModel:any,newModel:any){
    let result=true
    Object.keys(newModel).forEach((key, index) => {
      if(newModel[key]!==undefined){
        if(oldModel[key]!==newModel[key])
          result=false
      }
    });
    return result
  }

  goToList(){
    console.log('go to list')
  }

  cancel(){
    console.log('cancel')
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
  ) { }

}
