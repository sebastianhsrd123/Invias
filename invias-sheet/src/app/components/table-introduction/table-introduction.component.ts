import { Component, OnInit } from '@angular/core';
import { Description } from 'src/app/interfaces/description.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table-introduction',
  templateUrl: './table-introduction.component.html',
  styleUrls: ['./table-introduction.component.scss']
})
export class TableIntroductionComponent implements OnInit {

  table: Description[];
  addRow: boolean;
  introduction: string;
  description: string;
  positionRow: number;
  positionCol: number;
  cellOther: string;
  editCell: boolean;
  options: string[] = [
    "OK",
    "NO ADJUNTO",
    "FECHA NO CORRESPONDE",
    "NO RELACIONADO",
    "NO ADJUNTO Y/O NO RELACIONADO",
    "INCOMPLETO",
    "OTRO"
  ];

  constructor( private dataService: DataService) {
    this.table = [];
    this.addRow = false;
    this.introduction = '';
    this.description = '';
    this.positionRow = -1;
    this.positionCol = -1;
    this.cellOther = '';
    this.editCell = false;
  }

  ngOnInit(): void {
    this.table = [
      { description: 'Proceso de selección', descriptionStatus: '', introduction: 'Localización del proyecto', introductionStatus: '' },
      { description: 'ID SECOP (con links)', descriptionStatus: '', introduction: 'Zonda de influencia', introductionStatus: '' },
      { description: 'Infromación del programa o plan de gobierno', descriptionStatus: '', introduction: 'Inventario y estado inicial de la via', introductionStatus: '' },
      { description: 'Personal a cargo de parte del INVIAS', descriptionStatus: '', introduction: 'Caracteristicas tecnicas del proyecto', introductionStatus: '' },
    ]
    this.dataService.tableIntroduction = this.table;
  }

  validateRowForm(field: string): boolean {
    if (field === 'introduction' && this.introduction.trim().length > 0) return true;
    if (field === 'description' && this.description.trim().length > 0) return true;
    return false;
  }

  activeOptions(): boolean {
    if (this.validateRowForm('introduction') && this.validateRowForm('status') && this.validateRowForm('description') && this.validateRowForm('descriptionStatus')) return true;
    return false;
  }

  validateCell(name:string): boolean {
    if(name == "intro" && this.introduction === 'OTRO' && this.cellOther.trim().length > 0) return true;
    if(name == "intro" && this.introduction === 'OTRO' && this.cellOther.trim().length <= 0) return false;
    if(name == "intro" && this.introduction !== 'OTRO' && this.introduction.trim().length > 0) return true;

    if(name == "desc" && this.description === 'OTRO' && this.cellOther.trim().length > 0) return true;
    if(name == "desc" && this.description === 'OTRO' && this.cellOther.trim().length <= 0) return false;
    if(name == "desc" && this.description !== 'OTRO' && this.description.trim().length > 0) return true;
    return false;
  }
  submitRow() {
    // this.table.push({ introduction: this.introduction, introductionStatus: this.introductionStatus, description: this.description, descriptionStatus: this.descriptionStatus });
    this.introduction = '';
    this.description = '';
    this.addRow = false;
  }

  editActive(i: number, j: number): boolean {
    if (this.positionRow === i && this.positionCol == j) return true;
    return false;
  }

  addRows() {
    this.addRow = !this.addRow;
  }

  editPosition(i: number, j: number) {
    this.editCell = true;
    this.positionRow = i;
    this.positionCol = j;
  }

  saveData(position: number) {
    if (position == 0 && this.introduction === 'OTRO'){
      this.introduction = this.cellOther;
      this.table[this.positionRow].introductionStatus = this.introduction;
    }
    if (position == 0 && this.introduction !== 'OTRO'){
      this.table[this.positionRow].introductionStatus = this.introduction;
    }
    if (position == 1 && this.description === 'OTRO'){
      this.description = this.cellOther;
      this.table[this.positionRow].descriptionStatus = this.description;
    }
    if (position == 1 && this.description !== 'OTRO'){
      this.table[this.positionRow].descriptionStatus = this.description;
    }
    this.dataService.tableIntroduction = this.table;
    this.positionRow = -1;
    this.positionCol = -1;
    this.introduction = '';
    this.description = '';
    this.cellOther = '';
    this.editCell = false;


  }
}
