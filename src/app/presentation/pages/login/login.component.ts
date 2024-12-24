import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../../core/services/notification.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _authService: AuthService = inject(AuthService);
  private _notificationService: NotificationService =
    inject(NotificationService);
  private router: Router = inject(Router);

  username: string = '';
  password: string = '';

  /**
   * @description login user
   */
  login() {
    if (this._authService.login(this.username, this.password)) {
      localStorage.setItem(
        environment.user,
        JSON.stringify({ username: this.username })
      );
      this.router.navigate(['/']); // Redirect to home or desired route
    } else {
      this._notificationService.showWarnMessage(
        'نام کاربری یا رمز عبور اشتباه است',
        'متوجه شدم'
      );
    }
  }
}
