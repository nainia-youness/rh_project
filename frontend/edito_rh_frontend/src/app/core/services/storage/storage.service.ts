import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor(private store:Store) { }


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
 
  getItem(key:string){
    const date=<string>localStorage.getItem(key)
    return JSON.parse(date)
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
    return !!localStorage.getItem('user')
  }
}
