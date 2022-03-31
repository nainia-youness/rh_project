import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { filter,map } from 'rxjs/operators';
import { filtersSelector, getMetadataSelector } from '../../state/gestion.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Filter } from '../../state/gestion.state';
import { filtersChange } from '../../state/gestion.actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() metadata$!:Observable<any>
  filtersForm!:FormGroup;
  chosenField!:any
  chosenFieldName!:string
  isAdvancedIntegerFilter:boolean=false
  filters$!:Observable<Filter[] | undefined>
  selectedFilters:Filter[]=[]

  allFilters:Filter[]=this.storageService.getItem('filters')

  ngOnInit(): void {

    this.createFiltersForm()

    this.filters$=this.store.pipe(
      select(filtersSelector),
      map((filters)=> filters)
    )

    this.storageService.watchStorage().subscribe((data:any) => {
      if(data.key==='filters'){
        this.allFilters=this.storageService.getItem('filters')
      }
    })
  }


  @Input() filterApiCall!: () => void;

  removeFilter=(filter:Filter)=>{    
    const newSelectedFilters=this.selectedFilters.filter((item:any) => JSON.stringify(filter) !== JSON.stringify(item))
    const deepCopy=JSON.parse(JSON.stringify(newSelectedFilters))
    this.store.dispatch(filtersChange({filters:deepCopy}))
  }

  confirm=()=>{

    const enumStringField=this.filtersForm.controls['enumStringField'].value
    const stringField=this.filtersForm.controls['stringField'].value
    const integerField=this.filtersForm.controls['integerField'].value
    const integerField2=this.filtersForm.controls['integerField2'].value

    const filter={
      field:this.chosenField.name,
      value:undefined,
      gte:undefined,
      lte:undefined
    }
    if(enumStringField){
      filter.value=enumStringField
    }
    else if(stringField){
      filter.value=stringField
    }
    else if(integerField){
      
      if(integerField2 && this.isAdvancedIntegerFilter){
        filter.gte= integerField
        filter.lte=integerField2
      } 
      else filter.value=integerField
    }
    if(this.isElemInArray(this.selectedFilters,filter)) return
    this.selectedFilters.push(filter)
    const deepCopy=JSON.parse(JSON.stringify(this.selectedFilters))

    this.store.dispatch(filtersChange({filters:deepCopy}))
    this.filterApiCall()
  }
  

  private isElemInArray(arr:any[],value:any){
    const array=arr.filter((item:any) => JSON.stringify(value) === JSON.stringify(item))
    return !!(array.length!==0)
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
    const integerFieldPattern='^[0-9]+$'

    this.filtersForm=this.fb.group({
      chooseField:[null,[Validators.required]],
      enumStringField:[null,[]],
      stringField:[null,[]],
      integerField:[null,[Validators.pattern(integerFieldPattern)]],
      integerField2:[null,[Validators.pattern(integerFieldPattern)]],
    })
  }

  isFieldsEmpty(){
    return this.filtersForm.controls['enumStringField'].value  || this.filtersForm.controls['stringField'].value ||
    this.filtersForm.controls['integerField'].value  || this.filtersForm.controls['integerField2'].value
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


  constructor(private fb:FormBuilder,private storageService:StorageService,private store:Store<AppState>,) { }
}
