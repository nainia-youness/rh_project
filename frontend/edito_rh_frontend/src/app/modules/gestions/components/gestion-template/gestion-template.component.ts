import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseEntiteComponent } from '../dialogs/choose-entite/choose-entite.component';


@Component({
  selector: 'app-gestion-template',
  templateUrl: './gestion-template.component.html',
  styleUrls: ['./gestion-template.component.scss']
})
export class GestionTemplateComponent implements OnInit {

  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.openDialog()
  }

  openDialog(): void {
    this.matDialog.open(ChooseEntiteComponent,{
      
    })
  }

}
