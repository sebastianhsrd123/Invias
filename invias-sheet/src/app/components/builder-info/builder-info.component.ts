import { Component, OnInit } from '@angular/core';
import { Contractor } from 'src/app/interfaces/contract.interface';

@Component({
  selector: 'app-builder-info',
  templateUrl: './builder-info.component.html',
  styleUrls: ['./builder-info.component.scss']
})
export class BuilderInfoComponent implements OnInit {

  audit: string;
  contractorsData: Contractor[];
  contractor: string;
  agreement: string;
  activeContractor: boolean;
  constructor() {
    this.audit = 'CONTRATISTA 123'
    this.contractorsData = [];
    this.contractor = '';
    this.agreement = '';
    this.activeContractor = false;
  }

  ngOnInit(): void {
  }

  addContractorActive() {
    this.activeContractor = !this.activeContractor;
  }

  addContractor() {
    this.contractorsData.push({ contractor: this.contractor, agreement: this.agreement });
  }

  activeOptions(field: string):boolean{
    if (field === 'contractor' && this.validateForm('contractor') && this.validateForm('agreement')) return true;
    return false;

  }

  submitContractor() {
    if (this.validateForm('contractor') && this.validateForm('agreement')) {
      this.addContractor();
      this.contractor = '';
      this.agreement = '';
      this.activeContractor = false;
    }
  }

  validateForm(field: string): boolean {
    if (field === 'contractor' && this.contractor.trim().length > 0) return true;
    if (field === 'agreement' && this.agreement.trim().length > 0) return true;
    if (field === 'contractor' && this.contractor.trim().length <= 0) return false;
    if (field === 'agreement' && this.contractor.trim().length <= 0) return false;
    return false
  }



}
