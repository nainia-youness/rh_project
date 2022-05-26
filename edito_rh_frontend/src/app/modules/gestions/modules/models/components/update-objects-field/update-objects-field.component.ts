import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { modelPageTypeSelector } from '../../state/model.selectors';
import { ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-update-objects-field',
  templateUrl: './update-objects-field.component.html',
  styleUrls: ['./update-objects-field.component.scss']
})
export class UpdateObjectsFieldComponent implements OnInit {

  @Input()
  modelMetadata:any;
  @Input()
  model:any;
  fieldValues!:{designation: string,id: number,montant?: number}[]
  objectsFieldsForm!:FormGroup;
  errors:any={}
  objectsFieldList:{id: number, montant?: number}[]=[]//contain what will be emmited  in objectsField
  @Output()
  objectsField: EventEmitter<{label:string,value:any[]}> = new EventEmitter();
  @Output()
  fieldError: EventEmitter<{label:string,error:string}> = new EventEmitter();
  listObjectFieldsThatCanBeAdded:{id: number, designation:string, montant?:number}[]=[]

  ngOnInit(): void {


    this.store.pipe(
      select(modelPageTypeSelector),
      map((modelPage)=>{
        if(modelPage===ModelPageType.MODIFIER){
          this.fieldValues=this.model[this.modelMetadata.label]
          this.fieldValues.forEach((e:any) => {
              let a:any={
                'id':e.id,
              }
              if(e.montant!==undefined)
                a.montant=e.montant
              this.objectsFieldList.push(a)
          });
        }
        else if(modelPage===ModelPageType.CREER){
          this.fieldValues=[]
        }
        return modelPage
      })
    ).subscribe()
    
    this.intializeListObjectFieldsThatCanBeAdded()
    this.createObjectsFieldsForm()
    this.initializeControls()
  }

  intializeListObjectFieldsThatCanBeAdded(){
    const objectsValues=this.modelMetadata.values
    objectsValues.forEach((e1:any)=>{
      let isInObjectsFieldList=false
      this.objectsFieldList.forEach((e2:any)=>{
        if(e1.id===e2.id){
          isInObjectsFieldList=true
        }
      })
      if(!isInObjectsFieldList){
        const copy=JSON.parse(JSON.stringify(e1)) 
        copy.designation = copy.value;
        delete copy.value;
        //check if field have montant, if it does add montant=0 by default 
        if(this.isMontantExist()){
          copy.montant=0
        }
        this.listObjectFieldsThatCanBeAdded.push(copy)
      }
    })
  }

  isMontantExist(){
    let result=false
    this.modelMetadata.children_metadata.forEach((e:any)=>{
      if(e.label==='montant'){
        result=true
      }
    })
    return result
  }

  updateObjectsField=(e:any,fieldControl:any,id:number)=>{
    const value=this.objectsFieldsForm.controls[fieldControl].value
    this.objectsFieldList.forEach((e:any)=>{
      if(e.id===id && e.montant!==undefined){
        e.montant=Number(value)
      }
    })
    const change={
      label:this.modelMetadata.label,
      value:this.objectsFieldList
    }
    this.objectsField.emit(change);
  }

  initializeControls(){
    this.objectsField.emit({label:this.modelMetadata.label,value:this.objectsFieldList});
    this.fieldError.emit({label:this.modelMetadata.label,error:""})
  }


  addModelRelationship=()=>{
    const addedField=this.objectsFieldsForm.controls['addedFieldName'].value
    if(addedField==='' || addedField===undefined) return
    const copy=Array.from(this.fieldValues);
    //find the field to add
    this.listObjectFieldsThatCanBeAdded.forEach((e,index)=>{
      if(e.designation===addedField)
      {
        copy.push(e)
        if(e.montant!==undefined)
          this.objectsFieldList.push({'id':e.id,'montant':e.montant})
        else
          this.objectsFieldList.push({'id':e.id,})
        this.listObjectFieldsThatCanBeAdded.splice(index, 1)

      }
    })
    this.fieldValues=copy
    if(this.listObjectFieldsThatCanBeAdded.length!==0){
      this.objectsFieldsForm.patchValue({
        addedFieldName: this.listObjectFieldsThatCanBeAdded[0].designation
      });
    }

    const change={
      label:this.modelMetadata.label,
      value:this.objectsFieldList
    }
    this.objectsField.emit(change);
  }
  
  deleteModelRelationShip(id:number){
    const copy=Array.from(this.fieldValues);
    this.objectsFieldList.forEach((objectField,index)=>{
      if(id===objectField.id){
        const a=copy[index]
        let  newObj
        if(a.montant!==undefined) newObj={'id':a.id,'designation':a.designation,montant:a.montant}
        else newObj={'id':a.id,'designation':a.designation}
        this.listObjectFieldsThatCanBeAdded.push(newObj)
        copy.splice(index, 1)
        this.objectsFieldList.splice(index, 1)
        let patchedValue:any={
          addedFieldName: newObj.designation,
        }
        if(a.montant!==undefined) patchedValue[a.designation+'Montant']=a.montant
        this.objectsFieldsForm.patchValue(patchedValue);
      }
    })

    this.fieldValues=copy
    const change={
      label:this.modelMetadata.label,
      value:this.objectsFieldList
    }
    this.objectsField.emit(change);
  }

  createObjectsFieldsForm=()=>{
    let initializeFormsObj:any={}
    const isMontantExist=this.isMontantExist()
    //
    //this is the fieldObjects that already exist
    this.fieldValues.forEach((fieldValue:any) => {
      if(isMontantExist){
        initializeFormsObj[fieldValue.designation+'Montant']=[fieldValue.montant,[Validators.required]]
      }
    });
    //field objects that can be added
    this.listObjectFieldsThatCanBeAdded.forEach((fieldValue:any) => {
      if(isMontantExist){
        initializeFormsObj[fieldValue.designation+'Montant']=[fieldValue.montant,[Validators.required]]
      }
    });
    const designation=this.listObjectFieldsThatCanBeAdded[0] ? this.listObjectFieldsThatCanBeAdded[0].designation : ''
    initializeFormsObj['addedFieldName']=[designation,[Validators.required]]



    this.objectsFieldsForm=this.fb.group(initializeFormsObj)
  }
  

  showObjectsFieldError=(controlForm:any)=>{
    let error =''
    const objectsFieldForm=this.objectsFieldsForm.controls[controlForm]
    if(objectsFieldForm.value === '')
      error="le champ est requis"
    else if(objectsFieldForm.touched && objectsFieldForm.invalid){
      error='le champ est invalide'
    } 
    this.errors[controlForm]=error
    let is_error=false
    Object.keys(this.errors).forEach((key, index)=>{
      if(this.errors[key]!==''){
        is_error=true
        const change={
          label:this.modelMetadata.label,
          error:this.errors[key]
        }
        this.fieldError.emit(change);
      }
    })
    if(!is_error){
      const change={
        label:this.modelMetadata.label,
        error:''
      }
      this.fieldError.emit(change);
    }
      
    return error
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
