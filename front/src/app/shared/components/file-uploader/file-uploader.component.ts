import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  fileToUpload: File | null;
  @Input() accept: string;

  constructor(
    public dialogRef: MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.accept = this.data.accept;
  }

  handleFile(target: any) {
    let files: FileList = target.files;
    if (files !== null) {
      this.fileToUpload = files.item(0);
    }
  }

  uploadFile() {
    this.dialogRef.close(this.fileToUpload);
  }

}
