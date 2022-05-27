import { isNgTemplate } from '@angular/compiler';
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

  formatDates(body:any) {
    for (const key in body) {
      if(body[key] instanceof Date){
        body[key]=this.formatDate(body[key])
      }
    }
    return body
  }

  formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  convertString(s:string){
    const numbers='0123456789'
    let is_number=true
    for (let x = 0; x < s.length; x++)
    {
        let c = s.charAt(x);
        if( numbers.indexOf(c) <= -1){//c not a number
          is_number=false
        }        
    }
    if(is_number){
      return Number(s)
    }
    else{
      return s
    }
  }

  removeUnderscores(model:any){
    let newObj:any={}
    Object.keys(model).map((key) => {
      const newKey = key.substring(1);
      if(typeof model[key] === 'string' || model[key] instanceof String){
        newObj[newKey]=this.convertString(model[key])
      }
      else{
        newObj[newKey]=model[key]
      }
    });
    return newObj
  }
}
