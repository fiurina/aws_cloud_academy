import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { PrimengModule } from './../../primeng.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components

// Modules
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    PrimengModule,
  ],
  declarations: [
    FileUploaderComponent,
    ConfirmationDialogComponent,
  ],
  exports: [
    FileUploaderComponent,
    ConfirmationDialogComponent,
  ],
})
export class ComponentsModule {}
