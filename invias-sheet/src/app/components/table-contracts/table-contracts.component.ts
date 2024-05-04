import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';

@Component({
  selector: 'app-table-contracts',
  templateUrl: './table-contracts.component.html',
  styleUrls: ['./table-contracts.component.scss']
})
export class TableContractsComponent implements OnInit {

  @Input() contracts: string[] = [];
  rows: Content[];
  titleRow: string;
  notesRow: string;
  addRow: boolean;
  agreementTitle: string;
  changeAgreement: boolean;
  activeRow: number;
  cell: string;
  activeCol: number;


  constructor() {
    this.rows = [];
    this.titleRow = '';
    this.notesRow = '';
    this.addRow = false;
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

  validateRowForm(field: string): boolean {
    if (field === 'title' && this.titleRow.trim().length > 0) return true;
    if (field === 'notes' && this.notesRow.trim().length > 0) return true;
    if (field === 'agreement' && this.agreementTitle.trim().length > 0) return true;
    return false;
  }

  editCell(row: number, col: number) {
    this.changeAgreement = true;
    this.activeRow = row;
    this.activeCol = col;
  }

  cancelEdit(row: number, col: number) {
    this.changeAgreement = false;
    this.activeCol = -1;
    this.activeRow = -1;
  }

  saveEdit(row: number, col: number) {
    this.changeAgreement = false;
    this.rows[row].agreements![col] = this.cell;
  }

  activeOptions(field?: string): boolean {
    if (field === 'agreement' && this.validateRowForm('agreement')) return true;
    if (this.rows.length <= 0 && this.validateRowForm('title') && this.validateRowForm('notes')) return true;
    return false;
  }

  async submitRow() {
    if (this.validateRowForm('title') && this.validateRowForm('notes')) {
      const agreements: string[] = [];
      await this.contracts.forEach(element => {
        agreements.push('N/A');
      });
      const row: Content = { title: this.titleRow, Notes: this.notesRow, agreements: agreements };
      this.rows.push(row);
      this.titleRow = '';
      this.notesRow = '';
      this.addRow = false;
    }
  }


}
