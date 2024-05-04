import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVIAS';
  contracts: string[] = [];

  receiveContracts(contracts: string[]) {
    this.contracts = contracts;
  }
}


