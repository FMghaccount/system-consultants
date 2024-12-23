import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  showLogout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showApp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
