import { MatRippleModule } from '@angular/material/core';
import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarService } from '../../../core/services/snack-bar.service';

@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [MatButtonModule, MatRippleModule],
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss',
})
export class CustomSnackBarComponent {
  private _snackBarService: SnackBarService = inject(SnackBarService);

  constructor(
    private snackBarRef: MatSnackBarRef<CustomSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  /**
   * @description dismiss current snackbar
   */
  dismiss() {
    this.snackBarRef.dismiss();
  }

  /**
   * @description dismiss all snackBars
   */
  dismissAll() {
    this._snackBarService.dismissAllSnackBars();
  }
}
