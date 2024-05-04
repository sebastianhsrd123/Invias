import { Component, OnInit } from '@angular/core';
import { Description } from 'src/app/interfaces/description.interface';

@Component({
  selector: 'app-table-introduction',
  templateUrl: './table-introduction.component.html',
  styleUrls: ['./table-introduction.component.scss']
})
export class TableIntroductionComponent implements OnInit {

  table: Description[];
  addRow: boolean;
  introduction: string;
  introductionStatus: string;
  description: string;
  descriptionStatus: string

  constructor() {
    this.table = [];
    this.addRow = false;
    this.introduction = '';
    this.introductionStatus = '';
    this.description = '';
    this.descriptionStatus = '';
   }

  ngOnInit(): void {
  }

  validateRowForm(field: string): boolean {
    if (field === 'introduction' && this.introduction.trim().length > 0) return true;
    if (field === 'status' && this.introductionStatus.trim().length > 0) return true;
    if (field === 'description' && this.description.trim().length > 0) return true;
    if (field === 'descriptionStatus' && this.descriptionStatus.trim().length > 0) return true;
    return false;
  }

  activeOptions():boolean{
    if(this.validateRowForm('introduction') && this.validateRowForm('status') && this.validateRowForm('description') && this.validateRowForm('descriptionStatus')) return true;
    return false;
  }

  submitRow() {
    this.table.push({ introduction: this.introduction, introductionStatus: this.introductionStatus, description: this.description, descriptionStatus: this.descriptionStatus });
    this.introduction = '';
    this.introductionStatus = '';
    this.description = '';
    this.descriptionStatus = '';
    this.addRow = false;
  }

  addRows() {
    this.addRow = !this.addRow;
  }


}
