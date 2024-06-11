import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent implements OnInit {
  title:string;
  editTitle:boolean;
  newTitle:string;

  constructor(private dataService: DataService) {
    this.title = 'PROGRAMA CAMINOS COMUNITARIOS PARA LA PAZ TOTAL';
    this.editTitle = false;
    this.newTitle = '';
   }

  ngOnInit(): void {
    this.dataService.setDataTitle(this.title);
  }

  changeTitle(){
    this.editTitle = !this.editTitle;
  }

  saveTitle(){
    this.editTitle = false;
    this.title = this.newTitle;
    this.dataService.setDataTitle(this.title);
  }


}
