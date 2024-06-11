import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table-content-month',
  templateUrl: './table-content-month.component.html',
  styleUrls: ['./table-content-month.component.scss']
})
export class TableContentMonthComponent implements OnInit, OnChanges {
  @Input() intervenor: string = '';
  @Input() agreements: string[];
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
  otherCell: string;
  intStatus: string;
  intStatusOther: string;
  intStatusActive: boolean;
  options: string[] = [
    "OK",
    "NO ADJUNTO",
    "FECHA NO CORRESPONDE",
    "NO RELACIONADO",
    "NO ADJUNTO Y/O NO RELACIONADO",
    "INCOMPLETO",
    "OTRO"
  ];
  constructor(private dataService: DataService) {
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
    this.intStatus = '';
    this.intStatusOther = '';
    this.intStatusActive = false;
    this.otherCell = '';
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agreements']) {
      this.rows.forEach(element => {
        element.agreements!.push('N/A');
      });
    }
  }

  ngOnInit(): void {
    this.rows.push({ title: 'LISTA DE CHEQUEO', format: 'MEPI-MN1-IN-15-FR-1', Notes: ' ', agreements: [] });
    this.rows.push({ title: 'RESUMEN MENSUAL ESTADO GENERAL DEL PROYECTO', format: 'MEPI-MN1-IN-15-FR-2', Notes: ' ', agreements: [] });
    this.dataService.dataMonth = this.rows;
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
  }

  validateRowForm(field: string): boolean {
    if (field === 'intervenor' && this.intStatus !== 'OTRO' && this.intStatus.trim().length > 0) return true;
    if (field === 'intervenor' && this.intStatus === 'OTRO' && this.intStatusOther.trim().length > 0) return true;
   // if (field === 'intervenor' && this.intervenor.trim().length > 0) return true;
    if (field === 'agreement' && this.agreementTitle.trim().length > 0) return true;
    if (field === 'cell' && this.cell === 'OTRO' && this.otherCell.trim().length > 0) return true;
    if (field === 'cell' && this.cell === 'OTRO' && this.otherCell.trim().length <= 0) return false;
    if (field === 'cell' && this.cell.trim().length > 0 && this.cell) return true;
    if (field === 'title' && this.titleRow.trim().length > 0) return true;
    if (field === 'format' && this.formatRow.trim().length > 0) return true;
    if (field === 'notes' && this.notesRow.trim().length > 0) return true;
    return false;
  }

  editCell(row: number, col: number, isFirst: boolean) {
    if (isFirst) {
      this.changeAgreement = false;
    } else {
      this.changeAgreement = true;
      this.activeRow = row;
      this.activeCol = col;
    }
  }

  cancelEdit(row: number, col: number) {
    this.changeAgreement = false;
    this.activeCol = -1;
    this.activeRow = -1;
    this.cell = '';
    this.otherCell = '';
  }

  saveEdit(row: number, col: number) {
    if (this.cell === 'OTRO') {
      this.cell = this.otherCell;
      this.otherCell = '';
    }
    this.changeAgreement = false;
    this.rows[row].agreements![col] = this.cell;
    this.dataService.dataMonth = this.rows;
    this.cell = '';
    this.otherCell = '';
  }

  saveInt() {
    if (this.intStatus.trim().length > 0) {
      this.intStatusActive = false;
      this.dataService.monthIntervenor = this.intStatus;
    }
  }
  saveIntOther() {
    if (this.intStatusOther.trim().length > 0) {
      this.intStatus = this.intStatusOther;
      this.intStatusOther = '';
      this.intStatusActive = false;
      this.dataService.monthIntervenor = this.intStatus;

    }
  }
  editInt(first: boolean) {
    if (first) {
      this.intStatusActive = true;
    }

  }

  async submitRow() {
    if (this.rows.length > 0) {
      if (this.validateRowForm('title') && this.validateRowForm('format')) {
        const agreements: string[] = [];
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
      const agreements: string[] = [];
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

  activeOptions(field?: string): boolean {
    if (field === 'agreement' && this.validateRowForm('agreement')) return true;
    if (field === 'intervenor' && this.validateRowForm('intervenor')) return true;
    if (field === 'cell' && this.validateRowForm('cell')) return true;
  //  if (this.rows.length > 0 && this.validateRowForm('title') && this.validateRowForm('format')) return true;
   // if (this.rows.length <= 0 && this.validateRowForm('title') && this.validateRowForm('format') && this.validateRowForm('notes')) return true;
    return false;
  }
}

