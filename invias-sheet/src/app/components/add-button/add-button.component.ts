import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  @Input() col:boolean = false;
  @Input() text:string;
  @Output() activeButton: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.text = 'Agregar';
  }

  ngOnInit(): void {
  }

  activeEvent(){
    this.activeButton.emit();
  }

}
