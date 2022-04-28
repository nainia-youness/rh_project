import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getId(action:any){
    let result=''
    for (const [key, value] of Object.entries(action)) {
      if(key!=='type')
        result+=value
    }
    return result
  }
  
}
