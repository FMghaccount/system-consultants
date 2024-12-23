// snack-bar.service.ts
import { DestroyRef, inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../../presentation/components/custom-snack-bar/custom-snack-bar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackBarQueue } from '../models/snack-bar.model';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  snackbarQueue: SnackBarQueue[] = [];
  private isSnackbarActive: boolean = false;
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private snackBar: MatSnackBar) {}

  /**
   * @description push received config to snackbarQueue then show message
   * @param {MatSnackBarConfig} config
   */
  showSnackbar(config?: MatSnackBarConfig) {
    this.snackbarQueue.push({ config });
    this.displayNextSnackbar();
  }

  /**
   * @description dismiss all snackBars if there is more than one message
   */
  dismissAllSnackBars() {
    this.isSnackbarActive = false;
    this.snackbarQueue = [];
    this.snackBar.dismiss();
  }

  /**
   * @description display next message from snackbarQueue
   */
  private displayNextSnackbar() {
    if (this.isSnackbarActive || this.snackbarQueue.length === 0) {
      return;
    }

    const { config } = this.snackbarQueue.shift()!;
    this.isSnackbarActive = true;

    this.snackBar
      .openFromComponent(CustomSnackBarComponent, config)
      .afterDismissed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isSnackbarActive = false;
        this.displayNextSnackbar();
      });
  }
}
