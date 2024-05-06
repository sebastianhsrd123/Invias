import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss']
})
export class TableReportComponent implements OnInit {

  @Input() intervenor: string | null = null;
  @Input() contracts: string[] = [];
  cols: string[] = [];
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
  cellOther: string;
  intStatus: string[];
  intStatusOther: string;
  intStatusActive: boolean;
  positionRow: number;
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
    this.positionRow = -1;
    this.cell = '';
    this.intStatus = [];
    this.intStatusOther = '';
    this.intStatusActive = false;
    this.cellOther = '';
  }


  ngOnInit(): void {
    this.rows.push(
      { title: 'INFORME SEMANAL', format: 'MEPI-MN1-IN-15-FR-3', Notes: '', agreements: [] },
      { title: 'MAQUINARIA Y EQUIPO', format: 'MEPI-MN1-IN-15-FR-4', Notes: '', agreements: [] },
      { title: 'EQUIPO Y VEHICULOS', format: 'MEPI-MN1-IN-15-FR-5', Notes: '', agreements: [] },
      { title: 'PERSONAL, CONTROL DE APORTES Y SEGURIDAD SOCIAL', format: 'MEPI-MN1-IN-15-FR-6', Notes: '', agreements: [] },
      { title: 'PERSONAL, CONTROL DE APORTES Y SEGURIDAD SOCIAL', format: 'MEPI-MN1-IN-15-FR-7', Notes: '', agreements: [] },
      { title: 'INFORME FINANCIERO Y PRESUPUESTAL CONTRATO DE OBRA', format: 'MEPI-MN1-IN-15-FR-8', Notes: '', agreements: [] },
      { title: 'INFORME FINANCIERO Y PRESUPUESTAL CONTRATO DE INTERVENTORÍA', format: 'MEPI-MN1-IN-15-FR-9', Notes: '', agreements: [] },
      { title: 'ESTADO GENERAL DEL TIEMPO', format: 'MEPI-MN1-IN-15-FR-10', Notes: '', agreements: [] },
      { title: 'ENSAYOS DE LABORATORIO', format: 'MEPI-MN1-IN-15-FR-11', Notes: '', agreements: [] },
      { title: 'SEGUIMIENTO DE GARANTIAS Y SEGUROS', format: 'MEPI-MN1-IN-15-FR-12', Notes: '', agreements: [] },
      { title: 'SEGUIMIENTO DE GARANTIAS Y SEGUROS', format: 'MEPI-MN1-IN-15-FR-13', Notes: '', agreements: [] },
      { title: 'INFORME DE INVERSION Y BUEN MANEJO DEL DESEMBOLSO CONVENIOS', format: '', Notes: '', agreements: [] },
      { title: 'PLAN DE CARGAS O REPROGRAMACION PLAN DE CARGAS APROBADO', format: 'MEPI-MN1-IN-15-FR-2', Notes: '', agreements: [] },
      { title: 'SEGUIMIENTO AL PLAN DE CARGAS', format: 'MEPI-MN1-IN-15-FR-2', Notes: '', agreements: [] },
      { title: 'ACTAS DE COMITE DE OBRA', format: 'MEPI-MN1-IN-15-FR-1', Notes: '', agreements: [] },
      { title: 'ACTAS DE REUNIÓN', format: 'MEPI-MN1-IN-15-FR-2', Notes: '', agreements: [] },
      { title: 'CONCLUSIONES Y RECOMENDACIONES', format: '', Notes: '', agreements: [] },
    )

    this.rows.forEach(() => this.intStatus.push(''))
    this.dataService.reportIntervenor = this.intStatus;
    this.dataService.dataReport = this.rows;
  }

  validateFieldsIntervenor(field: number): boolean {
    if (field === 0 || field === 3 || field === 5 || field === 7 || field === 9 || field === 14 || field === 15) return true;
    return false;
  }

  validateFieldsContract(field: number): boolean {
    if (field === 4 || field === 6 || field === 10 || field === 11 || field === 12 || field === 13 || field === 16) return true;
    return false;
  }

  addRows() {
    this.addRow = !this.addRow;
  }

  validateRowForm(field: string, row?: number): boolean {
    if (field === 'intervenor' && this.intStatus[row!].trim().length > 0) return true;
    if (field === 'contract' && this.cell !== 'OTRO' && this.cell.trim().length > 0) return true;
    if (field === 'contract' && this.cell === 'OTRO' && this.cellOther.trim().length > 0) return true;
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
    if (this.cell === 'OTRO') {
      this.cell = this.cellOther;
    }
    this.changeAgreement = false;
    this.rows[row].agreements![col] = this.cell;
    this.activeCol = -1;
    this.activeRow = -1;
    this.cell = '';
    this.cellOther = '';
    this.dataService.dataReport = this.rows;

  }

  editInt(row: number) {
    this.positionRow = row;
    this.intStatusActive = true;
  }

  saveInt(row: number) {
    if (this.intStatus[row].trim().length > 0) {
      this.intStatusActive = false;
      this.positionRow = -1;
      this.dataService.reportIntervenor = this.intStatus;
    }
  }
  saveIntOther(row: number) {
    if (this.intStatusOther.trim().length > 0) {
      this.intStatus[row] = this.intStatusOther;
      this.intStatusOther = '';
      this.intStatusActive = false;
      this.positionRow = -1;
      this.dataService.reportIntervenor = this.intStatus;
    }
  }

  async submitRow() {
    if (this.validateRowForm('title') && this.validateRowForm('format') && this.validateRowForm('notes')) {
      const agreements: string[] = [];
      await this.contracts.forEach(element => {
        agreements.push('');
      });
      const row: Content = { title: this.titleRow, format: this.formatRow, Notes: this.notesRow, agreements: agreements };
      this.rows.push(row);
      this.titleRow = '';
      this.formatRow = '';
      this.addRow = false;
      this.dataService.reportIntervenor = this.intStatus;

    }
  }

  activeOptions(field?: string, row?: number): boolean {
    if (this.validateRowForm('title') && this.validateRowForm('format') && this.validateRowForm('notes')) return true;
    if (field === 'intervenor' && this.validateRowForm('intervenor', row)) return true;
    if (field === 'contract' && this.validateRowForm('contract', row)) return true;
    return false;
  }

}
