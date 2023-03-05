import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  idSubject = new Subject<number>();
  id = this.idSubject.asObservable();

  dialogRef!: MatDialogRef<any>;

  closeDialog(){
    this.dialogRef.close();
  }

  valueId(value: number) {
    return this.idSubject.next(value);
  }
  
  constructor() { }

}
