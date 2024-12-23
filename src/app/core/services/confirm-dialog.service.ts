import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../presentation/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private _matDialog: MatDialog = inject(MatDialog);

  /**
   * @description create confirm modal
   * @param {string} text
   * @param {string} title
   * @returns
   */
  createConfirmDialog(text: string, title: string) {
    const dialogRef: MatDialogRef<ConfirmModalComponent> = this._matDialog.open(
      ConfirmModalComponent,
      {
        width: '400px',
        direction: 'rtl',
      }
    );
    dialogRef.componentInstance.text = text;
    dialogRef.componentInstance.title = title;

    return dialogRef;
  }
}
