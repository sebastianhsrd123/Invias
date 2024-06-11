import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contractor } from 'src/app/interfaces/contract.interface';
import { DataService } from 'src/app/services/data.service';
import html2PDF from 'jspdf-html2canvas';


@Component({
  selector: 'app-report-sheet',
  templateUrl: './report-sheet.component.html',
  styleUrls: ['./report-sheet.component.scss']
})
export class ReportSheetComponent implements OnInit {

  date: Date;
  contractor: Contractor[];
  @Output() closeEmit: EventEmitter<any> = new EventEmitter();
  constructor(public dataService: DataService) {
    this.date = new Date();
    this.contractor = [];

  }

  ngOnInit(): void {
  }

  showTitle(): string {
    return this.dataService.getDataTitle();
  }

  showManager(): string {
    return this.dataService.getManager();
  }

  showContract(): string {
    return this.dataService.getContract();
  }

  showReport(): string {
    return this.dataService.getReport();
  }

  showInterventor(): string {
    return this.dataService.getInterventor();
  }

  showContractor(): boolean {
    this.contractor = this.dataService.getContractor();
    return this.contractor.length > 0;
  }

  generatePDF() {
    var element = document.getElementById('element-to-print');
    if (element) {
      html2PDF(element, {
        jsPDF: {
          format: 'a4',
        },

        imageType: 'image/png',
        output: 'Invias.pdf',
        html2canvas: {
          scale: 3,
        },
        margin: {
          top: 20,
          right: 20,
          bottom: 70,
          left: 0,
        },

      });
    }
  }

  close() {
    this.closeEmit.emit();
  }
}
