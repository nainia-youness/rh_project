import { Component,Input, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, Observer } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { modelPageTypeSelector } from '../../state/model.selectors';
import { ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-update-normal-field',
  templateUrl: './update-normal-field.component.html',
  styleUrls: ['./update-normal-field.component.scss']
})
export class UpdateNormalFieldComponent implements OnInit {

  @Input()
  modelMetadata:any;
  @Input()
  model:any;
  normalFieldsForm!:FormGroup;
  @Output() 
  stringField: EventEmitter<{label:string,value:string}> = new EventEmitter();
  @Output() 
  numberField: EventEmitter<{label:string,value:number}> = new EventEmitter();
  @Output()
  dateField: EventEmitter<{label:string,value:Date}> = new EventEmitter();
  @Output()
  fieldError: EventEmitter<{label:string,error:string}> = new EventEmitter();
  fieldValue!:string
  modelPageType$!:Observable<ModelPageType>
  
  ngOnInit(): void {
    this.modelPageType$=this.store.pipe(
      select(modelPageTypeSelector),
      map((modelPage)=>{
        if(modelPage===ModelPageType.MODIFIER){
          this.fieldValue=this.model[this.modelMetadata.label]
        }
        else if(modelPage===ModelPageType.CREER){
          this.fieldValue=""
        }
        return modelPage
      })
    )
    this.modelPageType$.subscribe()
    this.createNormalFieldsForm()
    this.initializeControls()
  }

  initializeControls(){
    this.stringField.emit({label:this.modelMetadata.label,value:this.normalFieldsForm.controls['stringField'].value});
    this.numberField.emit({label:this.modelMetadata.label,value:this.normalFieldsForm.controls['numberField'].value});
    this.dateField.emit({label:this.modelMetadata.label,value:this.normalFieldsForm.controls['dateField'].value});
    this.fieldError.emit({label:this.modelMetadata.label,error:""})
  }

  createNormalFieldsForm=()=>{
    //every time there is a change do this.onDatePicked.emit(date);
    this.normalFieldsForm=this.fb.group({
      stringField:[this.fieldValue,[Validators.required]],
      numberField:[this.fieldValue,[Validators.required]],
      dateField:[this.fieldValue,[Validators.required]],
    })
  }

  showStringFieldError=()=>{
    let error =''
    const stringFieldForm=this.normalFieldsForm.controls['stringField']
    if(stringFieldForm.value === '')
      error="le champ est requis"
    else if(stringFieldForm.touched && stringFieldForm.invalid){
      error='le champ est invalide'
    } 
    const change={
      label:this.modelMetadata.label,
      error:error
    }
    this.fieldError.emit(change);
    return error
  }

  showNumberFieldError=()=>{
    let error =''
    const stringFieldForm=this.normalFieldsForm.controls['numberField']
    if(stringFieldForm.value === '')
      error="le champ est requis"
    else if(stringFieldForm.touched && stringFieldForm.invalid){
      error='le champ est invalide'
    } 
    const change={
      label:this.modelMetadata.label,
      error:error
    }
    this.fieldError.emit(change);
    return error
  }

  showDateFieldError=()=>{
    let error =''
    const stringFieldForm=this.normalFieldsForm.controls['dateField']
    if(stringFieldForm.value === '')
      error="le champ est requis"
    else if(stringFieldForm.touched && stringFieldForm.invalid){
      error='le champ est invalide'
    } 
    const change={
      label:this.modelMetadata.label,
      error:error
    }
    this.fieldError.emit(change);
    return error
  }

  updateNumberField=(e:any)=>{
    const change={
      label:this.modelMetadata.label,
      value:this.normalFieldsForm.controls['numberField'].value
    }
    this.numberField.emit(change);
  }

  updateStringField=(e:any)=>{
    const change={
      label:this.modelMetadata.label,
      value:this.normalFieldsForm.controls['stringField'].value
    }
    this.stringField.emit(change);
  }

  updateDateField=(e:any)=>{
    const change={
      label:this.modelMetadata.label,
      value:this.normalFieldsForm.controls['dateField'].value
    }
    this.dateField.emit(change);
  }

  capitalizeFirstLetter(s:string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  
  handleLabel=(label:string)=>{
    const s=label.replace('_',' ')
    return this.capitalizeFirstLetter(s)
  }

  constructor(
    private fb:FormBuilder,
    private store:Store<AppState>,
    ) { }

}
