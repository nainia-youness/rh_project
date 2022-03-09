import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { screenSizeChange } from './state/app.actions';
import { AppState } from './store/app.state';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{

  mediaSub!: Subscription
  screenSize!: string
  opened:boolean=false
  //this.channelName$=this.store.select(getChannelName)
  constructor(public mediaObserver:MediaObserver,private store: Store<{screenSize:AppState}>){}

  ngOnInit(): void{
    this.mediaSub=this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      this.store.dispatch(screenSizeChange({screenSize:result.mqAlias}))
    })
  }

  ngOnDestroy(): void {
      this.mediaSub.unsubscribe()
  }

}
