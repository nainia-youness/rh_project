import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-choose-entite-dialog',
  templateUrl: './choose-entite-dialog.component.html',
  styleUrls: ['./choose-entite-dialog.component.scss']
})
export class ChooseEntiteDialogComponent implements OnInit {

  entite:string=this.storageService.getItem('entite')
  entites: string[] = ['SAPRESS', 'SOCHEPRESS', 'SOTADEC', 'WARAKTRADING'];

  constructor(private storageService:StorageService) { }

  ngOnInit(): void {
    this.storageService.watchStorage().subscribe((data:any) => {
      if(data.key==='entite'){
        this.entite=this.storageService.getItem("entite")
      }
    })
  }

  updateEntite(){
    if(this.entite!==this.storageService.getItem('entite'))
      this.storageService.setItem('entite',this.entite)
  }

}
