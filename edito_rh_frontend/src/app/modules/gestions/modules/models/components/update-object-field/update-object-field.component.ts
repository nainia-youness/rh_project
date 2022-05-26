import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { modelPageTypeSelector } from '../../state/model.selectors';
import { ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-update-object-field',
  templateUrl: './update-object-field.component.html',
  styleUrls: ['./update-object-field.component.scss']
})
export class UpdateObjectFieldComponent implements OnInit {

  @Input()
  modelMetadata:any;
  @Input()
  model:any;
  fieldValue!:any
  objectFieldsForm!:FormGroup;
  @Output() 
  objectField: EventEmitter<{label:string,value:any}> = new EventEmitter();
  @Output()
  fieldError: EventEmitter<{label:string,error:string}> = new EventEmitter();

  ngOnInit(): void {
    this.store.pipe(
      select(modelPageTypeSelector),
      map((modelPage)=>{
        if(modelPage===ModelPageType.MODIFIER){
          if(this.model[this.modelMetadata.label].designation){
            this.fieldValue=this.model[this.modelMetadata.label].designation
          }
          else if(this.model[this.modelMetadata.label].nom && !this.model[this.modelMetadata.label].prenom ){
            this.fieldValue=this.model[this.modelMetadata.label].nom
          }
          else if(this.model[this.modelMetadata.label].nom && this.model[this.modelMetadata.label].prenom ){
            this.fieldValue=this.model[this.modelMetadata.label].prenom+' '+this.model[this.modelMetadata.label].nom
          }
        }
        else if(modelPage===ModelPageType.CREER){
          this.fieldValue=""
        }
        return modelPage
      })
    ).subscribe()
    this.createNormalFieldsForm()
    this.initializeControls()
  }

  
  initializeControls(){
    this.objectField.emit({label:this.modelMetadata.label,value:this.model[this.modelMetadata.label].id});
    this.fieldError.emit({label:this.modelMetadata.label,error:""})
  }

  createNormalFieldsForm=()=>{
    this.objectFieldsForm=this.fb.group({
      objectField:[this.fieldValue,[Validators.required]],
    })
  }

  showObjectFieldError=()=>{
    let error =''
    const objectFieldForm=this.objectFieldsForm.controls['objectField']
    if(objectFieldForm.value === '')
      error="le champ est requis"
    else if(objectFieldForm.touched && objectFieldForm.invalid){
      error='le champ est invalide'
    } 
    const change={
      label:this.modelMetadata.label,
      error:error
    }
    this.fieldError.emit(change);
    return error
  }

  updateId(value:any){
    const change={
      label:this.modelMetadata.label,
      value:value.id
    }
    this.objectField.emit(change);
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
