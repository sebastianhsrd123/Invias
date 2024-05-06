import { Injectable } from '@angular/core';
import { Contractor } from '../interfaces/contract.interface';
import { Description } from '../interfaces/description.interface';
import { Content } from '../interfaces/content.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataTitle: string;
  manager: string;
  contract: string;
  report: string;
  interventor: string;
  contractor: Contractor[];
  tableIntroduction: Description[] = [];
  contractIntervenor: string[] = [];
  monthIntervenor: string = '';
  reportIntervenor: string[] = [];
  dataContracts: Content[] = [];
  dataMonth: Content[] = [];
  dataReport: Content[] = [];
  constructor() {
    this.dataTitle = '';
    this.manager = '';
    this.contract = '';
    this.report = '';
    this.interventor = '';
    this.contractor = [];
   }

  setDataTitle(data: string){
    this.dataTitle = data;
  }

  getDataTitle(){
    return this.dataTitle;
  }

  setManager(data: string){
    this.manager = data;
  }

  getManager(){
    return this.manager;
  }

  setContract(data: string){
    this.contract = data;
  }

  getContract(){
    return this.contract;
  }

  setReport(data: string){
    this.report = data;
  }

  getReport(){
    return this.report;
  }

  setInterventor(data: string){
    this.interventor = data;
  }

  getInterventor(){
    return this.interventor;
  }

  setContractor(data: Contractor[]){
    this.contractor = data;
  }

  getContractor(){
    return this.contractor;
  }



}
