import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  showApp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
