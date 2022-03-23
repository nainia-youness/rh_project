import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { filter,map } from 'rxjs/operators';
import { getMetadataSelector } from '../../state/gestion.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldType } from '../../state/gestion.state';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit,OnDestroy {

  @Input() metadata$!:Observable<any>
  filtersForm!:FormGroup;
  chosenField!:any
  chosenFieldName!:string
  isAdvancedIntegerFilter:boolean=false

  //field
  //
  filter:any


  ngOnInit(): void {

    this.createFiltersForm()
  }

  confirm=()=>{

    const enumStringField=this.filtersForm.controls['enumStringField'].value
    const stringField=this.filtersForm.controls['stringField'].value
    const integerField=this.filtersForm.controls['integerField'].value
    const integerField2=this.filtersForm.controls['integerField2'].value

    const filter={
      field:this.chosenField.name,
      gte:undefined,
      lte:undefined
    }
    if(enumStringField){
      filter.gte=enumStringField
      filter.lte=enumStringField
    }
    else if(stringField){
      filter.gte=stringField
      filter.lte=stringField
    }
    else if(integerField){
      filter.gte= integerField
      if(integerField2 && this.isAdvancedIntegerFilter) filter.lte=integerField2
      else filter.lte=integerField
    }
    this.filter=filter
    console.log(filter)
  }

  getField=(fields:any,chosenFieldName:string)=>{
    let result=""
    fields.forEach((field:any)=>{
      if(field.name===chosenFieldName){
        result=field
      }
    });
    return result
  }
  
  createFiltersForm=()=>{
    this.filtersForm=this.fb.group({
      chooseField:[null,[Validators.required]],
      enumStringField:[null,[]],
      stringField:[null,[]],
      integerField:[null,[]],
      integerField2:[null,[]],
    })
  }


  isFieldEnum=()=>{
    return !!this.chosenField.values
  }

  updateChosenField=()=>{

    this.initializeFields()

    const chosenFieldName=this.filtersForm.controls['chooseField'].value
    
    this.metadata$.subscribe((metadata)=>{
      const fields= metadata.fields
      this.chosenField= this.getField(fields,chosenFieldName)
    })
  }

  updateIsAdvancedIntegerFilter(){
    this.isAdvancedIntegerFilter=!this.isAdvancedIntegerFilter
  }

  initializeFields=()=>{
    this.filtersForm.get( 'enumStringField' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'stringField' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'integerField' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'integerField2' )!.patchValue( null, {emitEvent: false} );
    this.isAdvancedIntegerFilter=false
  }

  ngOnDestroy(): void {
    
  }
  constructor(private fb:FormBuilder) { }
}
