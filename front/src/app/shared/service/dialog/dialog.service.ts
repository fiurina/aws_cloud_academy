import { TableCreation } from 'src/app/shared/models/global.model';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) { }

  async showDialog(text: string): Promise<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: text
    });
    return await dialogRef.afterClosed().toPromise();
  }
}
