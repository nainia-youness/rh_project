import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { filter,map } from 'rxjs/operators';
import { filtersSelector, getMetadataSelector } from '../../state/gestion.selectors';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { FieldType, Filter, FilterMode } from '../../state/gestion.state';
import { filtersChange } from '../../state/gestion.actions';
import { rangeValidator } from './filters.validators';




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
  isAdvancedNumberFilter:boolean=false
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


  formatDate(date:Date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
  }

  @Input() filterApiCall!: () => void;

  removeFilter=(filter:Filter)=>{    
    const newSelectedFilters=this.selectedFilters.filter((item:any) => JSON.stringify(filter) !== JSON.stringify(item))
    const deepCopy=JSON.parse(JSON.stringify(newSelectedFilters))
    this.selectedFilters=this.selectedFilters.filter(item => JSON.stringify(item) !== JSON.stringify(filter))
    this.store.dispatch(filtersChange({filters:deepCopy}))
    this.filterApiCall()
  }

  confirm=()=>{

    const enumStringField=this.filtersForm.controls['enumStringField'].value
    const stringField=this.filtersForm.controls['stringField'].value
    const numberField=this.filtersForm.controls['numberField'].value
    const numberField2=this.filtersForm.controls['numberField2'].value
    let dateField=this.filtersForm.controls['dateField'].value
    let dateField2=this.filtersForm.controls['dateField2'].value
    const filterMode=this.filtersForm.controls['filterMode'].value
    
    const filter:Filter={
      field:this.chosenField.label,
      filterMode:filterMode,
    }
    if(enumStringField){
      filter.value=enumStringField
    }
    else if(stringField){
      filter.value=stringField
    }
    else if(numberField){
      if(numberField2 && this.isAdvancedNumberFilter){
        filter.gte= numberField
        filter.lte=numberField2
      } 
      else filter.value=numberField
    }
    else if(dateField){
      dateField=this.formatDate(dateField)
      if(dateField2 && this.isAdvancedNumberFilter){
        dateField2=this.formatDate(dateField2)
        filter.gte= dateField
        filter.lte=dateField2
      } 
      else filter.value=dateField
    }
    if(this.isElemInArray(this.selectedFilters,filter)) return
    this.selectedFilters.push(filter)
    const deepCopy=JSON.parse(JSON.stringify(this.selectedFilters))
    this.store.dispatch(filtersChange({filters:deepCopy}))
    this.filterApiCall()//does the action getFonctionsStart()
  }

  getChipValue(filter:Filter){
    let value=<string | undefined>filter.value
    if(this.chosenField.type===FieldType.STRING || this.chosenField.type===FieldType.DATE)
      value=`"${value}"`
    switch (filter.filterMode)
    {
      case FilterMode.CONTIENT:
        return `${value} C ${filter.field}`
      case FilterMode.EGAL:
        return `${filter.field} = ${value}`
      case FilterMode.DIFFERENT:
        return `${filter.field} != ${value}`
      case FilterMode.SUPPERIEUR_STRICT:
        return `${filter.field} > ${value}`
      case FilterMode.INFERIEUR_STRICT:
        return `${filter.field} < ${value}`
      case FilterMode.SUPPERIEUR:
        return `${filter.field} >= ${value}`
      case FilterMode.INFERIEUR:
        return `${filter.field} <= ${value}`
      case FilterMode.COMPRIS_ENTRE:
        return `${filter.gte} <= ${filter.field} <= ${filter.lte}`
      default: 
        return ''
    }
  }
  
  capitalizeFirstLetter(s:string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  handleLabel=(label:string)=>{
    const s=label.replace('_',' ')
    return this.capitalizeFirstLetter(s)
  }

  private isElemInArray(arr:any[],value:any){
    const array=arr.filter((item:any) => JSON.stringify(value) === JSON.stringify(item))
    return !!(array.length!==0)
  }


  
  createFiltersForm=()=>{
    const numberFieldPattern='^[0-9]+$'

    this.filtersForm=this.fb.group({
      chooseField:[null,[Validators.required]],
      enumStringField:[null,[]],
      stringField:[null,[]],
      numberField:[null,[Validators.pattern(numberFieldPattern)]],
      numberField2:[null,[Validators.pattern(numberFieldPattern)]],
      dateField:[null,[]],
      dateField2:[null,[]],
      filterMode:[FilterMode.EGAL,[]],
    },
    { validator: [
      rangeValidator('dateField', 'dateField2'),
      rangeValidator('numberField', 'numberField2'),
    ]}
    )
  }

  isFieldsEmpty(){
    return this.filtersForm.controls['enumStringField'].value  || this.filtersForm.controls['stringField'].value ||
    (this.filtersForm.controls['numberField'].value && !this.isAdvancedNumberFilter) || 
    (this.filtersForm.controls['numberField2'].value && this.isAdvancedNumberFilter && this.filtersForm.controls['numberField'].value) ||
    (this.filtersForm.controls['dateField'].value && !this.isAdvancedNumberFilter) || 
    (this.filtersForm.controls['dateField2'].value && this.isAdvancedNumberFilter && this.filtersForm.controls['dateField'].value)
  }

  isFieldEnum=()=>{
    return !!this.chosenField.values
  }

  filterModes:FilterMode[]=[FilterMode.EGAL]

  updateChosenField=()=>{
    this.initializeFields()
    this.filtersForm.get( 'filterMode' )!.patchValue( FilterMode.EGAL, {emitEvent: false} );
    this.isAdvancedNumberFilter=false
    const chosenFieldName=this.filtersForm.controls['chooseField'].value
    this.metadata$.subscribe((metadata)=>{
      const fields= metadata.fields
      this.chosenField= this.getField(fields,chosenFieldName)
      this.updateFilterMode()
    })
  }

  updateFilterMode(){
    if(this.chosenField.type===FieldType.STRING && this.isFieldEnum()){//string with choices
      this.filterModes=[FilterMode.EGAL]
    }
    if(this.chosenField.type===FieldType.STRING && !this.isFieldEnum()){//string without choices
      this.filterModes=[FilterMode.EGAL,FilterMode.CONTIENT,FilterMode.DIFFERENT]
    }
    if(this.chosenField.type===FieldType.NUMBER){//number
      this.filterModes=[FilterMode.EGAL,FilterMode.CONTIENT,FilterMode.DIFFERENT,FilterMode.SUPPERIEUR_STRICT,
        FilterMode.INFERIEUR_STRICT,FilterMode.SUPPERIEUR,FilterMode.INFERIEUR,FilterMode.COMPRIS_ENTRE
      ]
    }
    if(this.chosenField.type===FieldType.DATE){//date
      this.filterModes=[FilterMode.EGAL,FilterMode.DIFFERENT,FilterMode.SUPPERIEUR_STRICT,
        FilterMode.INFERIEUR_STRICT,FilterMode.SUPPERIEUR,FilterMode.INFERIEUR,FilterMode.COMPRIS_ENTRE
      ]
    }
  }

  getField=(fields:any,chosenFieldName:string)=>{
    let result=""
    fields.forEach((field:any)=>{
      if(field.label===chosenFieldName){
        result=field
      }
    });
    return result
  }

  updateIsAdvancedNumberFilter(){
    if(this.filtersForm.controls['filterMode'].value===FilterMode.COMPRIS_ENTRE){
      this.isAdvancedNumberFilter=true
    }
    else{
      this.isAdvancedNumberFilter=false
    }
    this.initializeFields()
  }

  initializeFields=()=>{
    //to make sure the values are intialized when the chosenfield change
    this.filtersForm.get( 'enumStringField' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'stringField' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'numberField' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'numberField2' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'dateField' )!.patchValue( null, {emitEvent: false} );
    this.filtersForm.get( 'dateField2' )!.patchValue( null, {emitEvent: false} );
  }


  constructor(private fb:FormBuilder,private storageService:StorageService,private store:Store<AppState>,) { }
}
