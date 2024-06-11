import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.scss']
})
export class NoteTableComponent implements OnInit {
  activeInput: boolean = false;
  notes: string;
  constructor(private dataService: DataService) {
    this.notes = '';
   }

  ngOnInit(): void {
  }

  showInput() {
    this.activeInput = !this.activeInput;
    this.dataService.notesData = this.notes;
  }

}
