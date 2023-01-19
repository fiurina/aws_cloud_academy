import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-files-card',
  templateUrl: './files-card.component.html',
  styleUrls: ['./files-card.component.scss']
})
export class FilesCardComponent implements OnInit {

  constructor() { }
  @Input() file: any;

  @Output() eventFunction = new EventEmitter<any>();
  name: string;
  ngOnInit(): void {
    console.log(this.file.name)
    this.name = this.file.name;
  }

  onClick() {
    console.log("Onclick Filecard", this.name)
    this.eventFunction.emit(this.name);

  }

}
