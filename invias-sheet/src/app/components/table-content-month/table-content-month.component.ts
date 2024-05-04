import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';

@Component({
  selector: 'app-table-content-month',
  templateUrl: './table-content-month.component.html',
  styleUrls: ['./table-content-month.component.scss']
})
export class TableContentMonthComponent implements OnInit {
  @Output() sendContracts: EventEmitter<string[]> = new EventEmitter();
  agreements: string[];
  rows: Content[];
  titleRow: string;
  formatRow: string;
  notesRow: string;
  addRow: boolean;
  addCol: boolean;
  agreementTitle: string;
  changeAgreement: boolean;
  activeRow: number;
  activeCol: number;
  cell: string;
  constructor() {
    this.agreements = [];
    this.rows = [];
    this.titleRow = '';
    this.notesRow = '';
    this.formatRow = '';
    this.addRow = false;
    this.addCol = false;
    this.agreementTitle = '';
    this.changeAgreement = false;
    this.activeRow = -1;
    this.activeCol = -1;
    this.cell = '';
  }

  ngOnInit(): void {
  }

  addRows() {
    this.addRow = !this.addRow;
  }

  addCols() {
    this.addCol = !this.addCol;
  }

  submitCol() {
    this.rows.forEach(element => {
      element.agreements!.push('N/A');
    });
    this.agreements.push(this.agreementTitle);
    this.agreementTitle = '';
    this.addCol = false;
    this.sendContracts.emit(this.agreements);
  }

  validateRowForm(field: string): boolean {
    if (field === 'title' && this.titleRow.trim().length > 0) return true;
    if (field === 'format' && this.formatRow.trim().length > 0) return true;
    if (field === 'notes' && this.notesRow.trim().length > 0) return true;
    if (field === 'agreement' && this.agreementTitle.trim().length > 0) return true;
    return false;
  }

  editCell(row: number, col: number) {
    this.changeAgreement = true;
    this.activeRow = row;
    this.activeCol = col;
  }

  cancelEdit(row : number, col: number) {
    this.changeAgreement = false;
    this.activeCol = -1;
    this.activeRow = -1;
  }

  saveEdit(row: number, col: number) {
  this.changeAgreement = false;
  this.rows[row].agreements![col] = this.cell;
  }

  async submitRow() {
    if (this.rows.length > 0) {
      if (this.validateRowForm('title') && this.validateRowForm('format')) {
        const agreements:string[] = [];
        await this.agreements.forEach(element => {
          agreements.push('N/A');
        });
        const row: Content = { title: this.titleRow, format: this.formatRow, Notes: this.notesRow, agreements: agreements };
        this.rows.push(row);
        this.titleRow = '';
        this.formatRow = '';
        this.addRow = false;
      }
    } else if (this.validateRowForm('title') && this.validateRowForm('format') && this.validateRowForm('notes')) {
      const agreements:string[] = [];
      await this.agreements.forEach(element => {
        agreements.push('N/A');
      });
      const row: Content = { title: this.titleRow, format: this.formatRow, Notes: this.notesRow, agreements: agreements };
      this.rows.push(row);
      this.titleRow = '';
      this.formatRow = '';
      this.notesRow = '';
      this.addRow = false;
    }
  }

  activeOptions(field?: string):boolean{
    if(field === 'agreement' && this.validateRowForm('agreement')) return true;
    if(this.rows.length > 0 && this.validateRowForm('title') && this.validateRowForm('format')) return true;
    if(this.rows.length <= 0 && this.validateRowForm('title') && this.validateRowForm('format') && this.validateRowForm('notes')) return true;
    return false;
  }
}

