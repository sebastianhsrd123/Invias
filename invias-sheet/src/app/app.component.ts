import { Component } from '@angular/core';
import { Contractor } from './interfaces/contract.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVIAS';
  contracts: string[] = [];
  intervenor: string = '';

  receiveContracts(contracts: Contractor) {
      this.contracts.push("CONVENIO " +contracts.agreement);
  }

  receiveInt(data: string) {
    this.intervenor = data;
  }
}


