import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  isCheckedSubject = new BehaviorSubject<boolean>(false);
  isChecked = this.isCheckedSubject.asObservable();

  constructor() { }

  updateToggle(value: boolean){
    this.isCheckedSubject.next(value)
  }
}
