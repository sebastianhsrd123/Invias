import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table-contracts',
  templateUrl: './table-contracts.component.html',
  styleUrls: ['./table-contracts.component.scss']
})
export class TableContractsComponent implements OnInit {

  @Input() contracts: string[] = [];
  @Input() intervenor: string = '';
  rows: Content[];
  titleRow: string;
  notesRow: string;
  addRow: boolean;
  agreementTitle: string;
  changeAgreement: boolean;
  activeRow: number;
  cell: string;
  activeCol: number;
  intStatus: string[];
  intStatusActive: boolean;
  intStatusOther: string;
  options: string[] = [
    "OK",
    "NO ADJUNTO",
    "FECHA NO CORRESPONDE",
    "NO RELACIONADO",
    "NO ADJUNTO Y/O NO RELACIONADO",
    "INCOMPLETO",
    "OTRO"
  ];
  positionRow: number;
  cellOther: string;



  constructor(private dataService: DataService) {
    this.rows = [];
    this.titleRow = '';
    this.notesRow = '';
    this.addRow = false;
    this.agreementTitle = '';
    this.changeAgreement = false;
    this.activeRow = -1;
    this.activeCol = -1;
    this.cell = '';
    this.intStatus = [];
    this.intStatusActive = false;
    this.intStatusOther = '';
    this.positionRow = -1;
    this.cellOther = '';
  }

  ngOnInit(): void {
    this.rows.push(
      { title: 'Información general del contrato', Notes: '', agreements: [] },
      { title: 'Descripción de actividades ejecutadas mes', Notes: '', agreements: [] },
      { title: 'Items no previstos', Notes: '', agreements: [] },
      { title: 'Avances y acciones a seguir', Notes: '', agreements: [] }
    )

    this.rows.forEach(() => this.intStatus.push(''))
    this.dataService.contractIntervenor = this.intStatus;
    this.dataService.dataContracts = this.rows;
  }

  addRows() {
    this.addRow = !this.addRow;
  }

  validateRowForm(field: string, row?:number): boolean {
    if (field === 'intervenor' && this.intStatus[row!].trim().length > 0) return true;
    if (field === 'title' && this.titleRow.trim().length > 0) return true;
    if (field === 'notes' && this.notesRow.trim().length > 0) return true;
    if (field === 'agreement' && this.agreementTitle.trim().length > 0) return true;
    if (field === 'contract' && this.cell !== 'OTRO' && this.cell.trim().length > 0) return true;
    if (field === 'contract' && this.cell == 'OTRO' && this.cellOther.trim().length > 0) return true;
    return false;
  }

  editCell(row: number, col: number, last:boolean) {
    if(last) {
      this.changeAgreement = false;
    }else{
      this.changeAgreement = true;
      this.activeRow = row;
      this.activeCol = col;
    }
  }

  editInt(row: number) {
    this.positionRow = row;
    this.intStatusActive = true;
  }

  saveInt(row: number) {
    if (this.intStatus[row].trim().length > 0) {
      this.intStatusActive = false;
      this.positionRow = -1;
      this.dataService.contractIntervenor = this.intStatus;
    }
  }
  saveIntOther(row: number) {
    if (this.intStatusOther.trim().length > 0) {
      this.intStatus[row] = this.intStatusOther;
      this.intStatusOther = '';
      this.intStatusActive = false;
      this.positionRow = -1;
    }
  }

  cancelEdit(row: number, col: number) {
    this.changeAgreement = false;
    this.activeCol = -1;
    this.activeRow = -1;
    this.cell = '';
  }

  saveEdit(row: number, col: number) {
    if(this.validateRowForm('contract')) {
      if(this.cell === 'OTRO') {
        this.cell = this.cellOther;
      }
    }
    this.rows[row].agreements![col] = this.cell;
    this.changeAgreement = false;
    this.cell = '';
    this.cellOther = '';
    this.dataService.dataContracts = this.rows;

  }

  activeOptions(field?: string, row?:number): boolean {

    if (this.rows.length <= 0 && this.validateRowForm('title') && this.validateRowForm('notes')) return true;
    if (field === 'intervenor' && this.validateRowForm('intervenor', row)) return true;
    if (field === 'agreement' && this.validateRowForm('agreement')) return true;
    if (field === 'contract' && this.validateRowForm('contract')) return true;
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
