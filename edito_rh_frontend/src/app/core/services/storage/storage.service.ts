import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Observable, Subject } from 'rxjs';
import { UserBuilderService } from '../utils/builders/user_builder/user-builder.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor(private store:Store,private userBuilder:UserBuilderService) { }


  private storageSub= new Subject<any>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key:string,value:any) {
    const jsonData = JSON.stringify(value)
    localStorage.setItem(key, jsonData)
    this.storageSub.next({
      type:'set',
      key,
      value
    });
  }

  private isElemInArray(arr:any[],value:any){
    const array=arr.filter((item:any) => JSON.stringify(value) === JSON.stringify(item))
    return !!(array.length!==0)
  }

  setArray(key:string,value:any) {
    this.setItem(key,value)
  }

  pushElemInArray(key:string,value:any){
    if(this.getItem(key)){
      const arrayOfElems=this.getItem(key)
      if(this.isElemInArray(arrayOfElems,value)) return
      arrayOfElems.push(value)
      this.setItem(key,arrayOfElems)
    }
    else{
      this.setItem(key,[value])
    }
  }

  getArray(key:string){
    return this.getItem(key)
  }

  removeItemFromArray(key:string,value:any){
    const arrayOfelems=this.getItem(key)    
    let newArrayOfElems=arrayOfelems.filter((item:any) => JSON.stringify(value) !== JSON.stringify(item))
    this.setArray(key,newArrayOfElems)

  }

  getItem(key:string){
    const data=<string>localStorage.getItem(key)
    const parsedData=JSON.parse(data)
    if(parsedData && key==='user') return this.userBuilder.fromParsedData(parsedData)
    return parsedData
  }

  removeItem(key:string) {
      localStorage.removeItem(key)
      this.storageSub.next({
        type:'remove',
        key
      });
  }

  clear(){
    localStorage.clear()
    this.storageSub.next({
      type:'clear'
    });
  }

  isLoggedIn(){
    return !!(localStorage.getItem('access_token') && localStorage.getItem('refresh_token'))
  }

}
