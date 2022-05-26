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

  removeUnderscores(model:any){
    let newObj:any={}
    Object.keys(model).map((key) => {
      const newKey = key.substring(1);
      newObj[newKey]=model[key]
    });
    return newObj
  }
}
