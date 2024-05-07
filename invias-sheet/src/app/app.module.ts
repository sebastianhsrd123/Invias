import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleHeaderComponent } from './components/title-header/title-header.component';
import { BuilderInfoComponent } from './components/builder-info/builder-info.component';
import { FormsModule } from '@angular/forms';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { CommonModule } from '@angular/common';
import { TableContentMonthComponent } from './components/table-content-month/table-content-month.component';
import { TableIntroductionComponent } from './components/table-introduction/table-introduction.component';
import { TableContractsComponent } from './components/table-contracts/table-contracts.component';
import { TableReportComponent } from './components/table-report/table-report.component';
import { ReportSheetComponent } from './components/report-sheet/report-sheet.component';
import { NoteTableComponent } from './components/note-table/note-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleHeaderComponent,
    BuilderInfoComponent,
    AddButtonComponent,
    TableContentMonthComponent,
    TableIntroductionComponent,
    TableContractsComponent,
    TableReportComponent,
    ReportSheetComponent,
    NoteTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
