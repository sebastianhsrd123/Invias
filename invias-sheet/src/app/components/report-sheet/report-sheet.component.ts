import { Component, OnInit } from '@angular/core';
import { Contractor } from 'src/app/interfaces/contract.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-report-sheet',
  templateUrl: './report-sheet.component.html',
  styleUrls: ['./report-sheet.component.scss']
})
export class ReportSheetComponent implements OnInit {

  date: Date;
  contractor: Contractor[];
  constructor(public dataService: DataService) {
    this.date = new Date();
    this.contractor = [];

   }

  ngOnInit(): void {
  }

  showTitle():string{
    return this.dataService.getDataTitle();
  }

  showManager():string{
    return this.dataService.getManager();
  }

  showContract():string{
    return this.dataService.getContract();
  }

  showReport():string{
    return this.dataService.getReport();
  }

  showInterventor():string{
    return this.dataService.getInterventor();
  }

  showContractor():boolean{
    this.contractor = this.dataService.getContractor();
    return this.contractor.length > 0;
  }

}
