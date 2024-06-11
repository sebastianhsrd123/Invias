import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contractor } from 'src/app/interfaces/contract.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-builder-info',
  templateUrl: './builder-info.component.html',
  styleUrls: ['./builder-info.component.scss']
})
export class BuilderInfoComponent implements OnInit {

  @Output() sendContract: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendContractor: EventEmitter<Contractor> = new EventEmitter();
  @Output() deleteContract: EventEmitter<any> = new EventEmitter();
  contractorsData: Contractor[];
  contractor: string;
  agreement: string;
  activeContractor: boolean;
  interventory:string;
  intNameActive:boolean;
  legalManager: string;
  legalManagerActive: boolean;
  contract: string;
  contractActive: boolean;
  report: string;
  reportActive: boolean;

  constructor(private service: DataService) {
    this.contractorsData = [];
    this.contractor = '';
    this.agreement = '';
    this.activeContractor = false;
    this.interventory = ''
    this.intNameActive = true;
    this.legalManager = '';
    this.legalManagerActive = true;
    this.contract = '';
    this.contractActive = true;
    this.report = '';
    this.reportActive = true;
  }

  ngOnInit(): void {

  }

  addContractorActive() {
    this.activeContractor = !this.activeContractor;
  }

  addContractor() {
    this.contractorsData.push({ contractor: this.contractor, agreement: this.agreement });
    this.sendContractor.emit({ contractor: this.contractor, agreement: this.agreement });
    this.service.setContractor(this.contractorsData);
  }

  deleteContractor(index:number) {
    this.contractorsData.splice(index, 1);
    this.deleteContract.emit(index);
    this.service.setContractor(this.contractorsData);
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


  checkInt():boolean{
    if(this.interventory.trim().length > 0) return true;
    return false
  }

  checkManager():boolean{
    if(this.legalManager.trim().length > 0) return true;
    return false
  }

  checkContract():boolean{
    if(this.contract.trim().length > 0) return true;
    return false
  }
  checkReport():boolean{
    if(this.report.trim().length > 0) return true;
    return false
  }

  submitIntName(){
    if(this.checkInt()){
      this.intNameActive = !this.intNameActive;
    }
  }

  submitManager(){
    if(this.checkManager()){
      this.legalManagerActive = !this.legalManagerActive;
      this.service.setManager(this.legalManager);
    }
  }

  submitContract(){
    if(this.checkContract()){
      this.contractActive = !this.contractActive;
      this.sendContract.emit(this.contract);
      this.service.setContract(this.contract);
    }
  }

  submitReport(){
    if(this.checkReport()){
      this.reportActive = !this.reportActive;
      this.service.setReport(this.report);
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
