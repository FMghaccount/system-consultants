import { MatButtonModule } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private _router: Router = inject(Router);

  navigateToHome() {
    this._router.navigateByUrl('/');
  }
}
