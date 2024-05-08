import { Component } from '@angular/core';
import { Contractor } from './interfaces/contract.interface';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVIAS';
  contracts: string[] = [];
  intervenor: string = '';
  owner: string = '';
  activeOwner: boolean = true;
  showPdf: boolean = false;

  constructor(private dataService: DataService) {}

  receiveContracts(contracts: Contractor) {
      this.contracts.push("CONVENIO " +contracts.agreement);
  }

  receiveInt(data: string) {
    this.intervenor = data;
  }

  showOwner() {
    this.activeOwner = !this.activeOwner;
    this.dataService.owner = this.owner;
  }

  modalPdf(){
    this.showPdf = !this.showPdf;
  }

  firedContractor(){
    this.contracts.pop();
  }
}


