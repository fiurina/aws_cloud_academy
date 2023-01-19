import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AsyncSubject, lastValueFrom } from 'rxjs';
import { AppRoutes } from 'src/app/shared/config/constants/router.constants';
import { UploadFilesService } from './service/upload-files.service';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.scss']
})
export class SubirArchivosComponent implements OnInit {

  // selectedFiles = new Array();
  files = new Array();
  size: Number;
  subir: boolean;


  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  loadingContent: boolean;
  constructor(
    private uploadFilesService: UploadFilesService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.subir = false;
  }

  async onUpload() {
    try {
      this.loadingContent = true;
      console.log('Files', this.files);

      this.toBase64(this.files, []).subscribe(async (res) => {
        if (res) {
          await lastValueFrom(this.uploadFilesService.uploadFiles(res));
          this.snackBar.open("Files uploaded successfully", 'Accept', {duration: 5000,});
          this.files = [];
          this.subir = false;
        }
      });
      this.loadingContent = false;
    } catch (error) {
      console.log(error);
      this.loadingContent = false;
    }
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }


  fileBrowseHandler(event) {
    console.log(event.target.files);
    this.prepareFilesList(event.target.files);


  }


  deleteFile(name: any) {
    // console.log("Borrando fichero: ", name);
    this.files = this.files.filter(e => e.name != name);
    // console.log("Arrayat tras borado:", this.files);
    if (this.files.length > 0) {
      this.subir = true;
    } else {
      this.subir = false;
    }
  }


  prepareFilesList(files: FileList) {

    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      this.files.push(element);
    }

    if (this.files.length > 0) {
      this.subir = true;
    } else {
      this.subir = false;
    }

    // console.log(this.files);

    // this.fileDropEl.nativeElement.value = "";
  }


  private toBase64(files: File[], selectedFiles: any[]): AsyncSubject<any[]> {
    const result = new AsyncSubject<any[]>();
    if (files?.length) {
      Object.keys(files)?.forEach((file, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          selectedFiles = selectedFiles?.filter(f => f?.name != files[i]?.name);
          selectedFiles.push({ name: files[i]?.name, base64: reader?.result as string});
          result.next(selectedFiles);
          if (files?.length === (i + 1)) {
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }

}


