import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { ProfileEditComponent } from './profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isChecked: boolean = false;
  persona: any;

  constructor(private porfolioService: PorfolioService, private toggle: ToggleService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPerson();
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
  }

  getPerson(){
    this.porfolioService.getPersonList().subscribe(data => {
      this.persona = data[0];
    });
  }

  openDialogEditPerson(id: number): void {
    this.router.navigate([{ outlets: { dialog: ['editPerson', id]} }]);
    this.porfolioService.getPersonDetail(id).subscribe(datas =>{
      const persona = datas;
      const dialogRef = this.dialog.open(ProfileEditComponent, {
        data: persona,
      });
      dialogRef.afterClosed().subscribe({
        next: (val: any) => {
          if (val) {
            this.getPerson();
          }
        }
      })
    },err =>{
      alert('Error al traer persona');
    })
  }
  
}
