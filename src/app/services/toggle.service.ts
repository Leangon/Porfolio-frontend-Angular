import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  isCheckedSubject = new Subject<boolean>();
  isChecked = this.isCheckedSubject.asObservable();

  constructor() { }

  updateToggle(value: boolean){
    this.isCheckedSubject.next(value)
  }
}
