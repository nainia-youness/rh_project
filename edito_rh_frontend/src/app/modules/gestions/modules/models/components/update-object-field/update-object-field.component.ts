import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

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
  fieldValue!:string
  objectFieldsForm!:FormGroup;


  ngOnInit(): void {

    if(this.model[this.modelMetadata.label].designation){
      this.fieldValue=this.model[this.modelMetadata.label].designation
    }
    else if(this.model[this.modelMetadata.label].nom && !this.model[this.modelMetadata.label].prenom ){
      this.fieldValue=this.model[this.modelMetadata.label].nom
    }
    this.createNormalFieldsForm()
  }

  
  initializeControls(){
    /*this.objectField.emit({label:this.modelMetadata.label,value:this.normalFieldsForm.controls['dateField'].value});
    this.fieldError.emit({label:this.modelMetadata.label,error:""})*/
  }

  createNormalFieldsForm=()=>{
    this.objectFieldsForm=this.fb.group({
      objectField:[this.fieldValue,[Validators.required]],
    })
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
