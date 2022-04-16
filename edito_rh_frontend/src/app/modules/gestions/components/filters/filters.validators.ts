
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const rangeValidator=(fromField: string, toField: string, errorName: string = 'fromTo'): ValidatorFn=> {
        return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
            const from = formGroup.get(fromField)?.value;
            const to = formGroup.get(toField)?.value;
            if(!from || !to){
              return null
            }
            else{
              if(from>to){
                formGroup.get(fromField)?.setErrors({notEquivalent: true});
                formGroup.get(toField)?.setErrors({notEquivalent: true});
                return {[errorName]: true};
              }
              else{
                return null
              }
            }
        };
}