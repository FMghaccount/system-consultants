import { inject, Injectable } from '@angular/core';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _snackBarService: SnackBarService = inject(SnackBarService);

  /**
   * @description show warn message with angular material snackbar
   * @param message
   * @param action
   */
  showWarnMessage(message: string, action: string) {
    this._snackBarService.showSnackbar({
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      direction: 'rtl',
      panelClass: 'warn-message',
      data: {
        message: message,
        action: action,
      },
    });
  }

  /**
   * @description show warn message with angular material snackbar
   * @param message
   * @param action
   */
  showSuccessMessage(message: string, action: string) {
    this._snackBarService.showSnackbar({
      duration: 500000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      direction: 'rtl',
      panelClass: 'success-message',
      data: {
        message: message,
        action: action,
      },
    });
  }
}
