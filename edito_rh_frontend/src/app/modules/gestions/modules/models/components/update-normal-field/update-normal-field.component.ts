import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  ngOnInit(): void {
    this.createNormalFieldsForm()
    this.initializeControls()
  }

  initializeControls(){
    this.stringField.emit({label:this.modelMetadata.label,value:this.normalFieldsForm.controls['stringField'].value});
    this.numberField.emit({label:this.modelMetadata.label,value:this.normalFieldsForm.controls['numberField'].value});
    this.dateField.emit({label:this.modelMetadata.label,value:this.normalFieldsForm.controls['dateField'].value});
  }

  createNormalFieldsForm=()=>{
    //every time there is a change do this.onDatePicked.emit(date);
    this.normalFieldsForm=this.fb.group({
      stringField:[this.model[this.modelMetadata.label],[Validators.required]],
      numberField:[this.model[this.modelMetadata.label],[Validators.required]],
      dateField:[this.model[this.modelMetadata.label],[Validators.required]],
    })
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

  constructor(private fb:FormBuilder) { }

}
