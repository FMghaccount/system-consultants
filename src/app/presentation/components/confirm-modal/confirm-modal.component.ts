import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: 'confirm-modal.component.html',
  styleUrls: ['confirm-modal.component.scss'],
  imports: [
    MatIconModule,
    NgIf,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  standalone: true,
})
export class ConfirmModalComponent {
  @Output() onFinish: EventEmitter<any> = new EventEmitter<any>();

  @Input() title: string = 'تاییدیه حذف';
  @Input() text: string = 'آیا از حذف این آیتم مطمئنید ؟';
  @Input() submitButtonText = 'بله';
  @Input() message: string = '';

  isChecking: boolean = false;

  /**
   * @description submit the confirmation and emit finish event
   * */
  submit() {
    this.isChecking = true;
    this.onFinish.emit(true);
  }

  /**
   * @description cancel request
   * */
  cancel() {
    this.isChecking = false;
    this.onFinish.emit(false);
  }
}
