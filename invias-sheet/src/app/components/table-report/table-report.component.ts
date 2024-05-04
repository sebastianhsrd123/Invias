import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss']
})
export class TableReportComponent implements OnInit {

  @Input() contracts: string[];
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
    this.contracts = [];
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




  validateRowForm(field: string): boolean {
    if (field === 'title' && this.titleRow.trim().length > 0) return true;
    if (field === 'format' && this.formatRow.trim().length > 0) return true;
    if (field === 'notes' && this.notesRow.trim().length > 0) return true;
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

  async submitRow() {
    if (this.validateRowForm('title') && this.validateRowForm('format') && this.validateRowForm('notes')) {
      const agreements: string[] = [];
      await this.contracts.forEach(element => {
        agreements.push('DIGITE EL NUMERO DE FORMATO');
      });
      const row: Content = { title: this.titleRow, format: this.formatRow, Notes: this.notesRow, agreements: agreements };
      this.rows.push(row);
      this.titleRow = '';
      this.formatRow = '';
      this.addRow = false;
    }
  }

  activeOptions(field?: string): boolean {
    if (this.validateRowForm('title') && this.validateRowForm('format') && this.validateRowForm('notes')) return true;
    return false;
  }

}
