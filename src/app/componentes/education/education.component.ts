import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { EducationEditComponent } from './education-edit.component';
import { EducationNewComponent } from './education-new.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent implements OnInit {
  
  educationList:any;
  isChecked: boolean = false;

  constructor(private datosPorfolio:PorfolioService, private toggle: ToggleService, private router: Router, private dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.datosPorfolio.getEducation().subscribe(data => {
      this.educationList = data;
    });
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
  }

  openDialogNewEducation(){
    this.router.navigate([{outlets: { dialog: 'newExperience'}}])
    const dialogRef = this.dialog.open(EducationNewComponent);
    dialogRef.afterClosed().subscribe(data => {
      console.log(`Resultado de dialogo EducationNew: ${data}`);
    })
  }

  openDialogEdit(id: number) {
    this.router.navigate([{ outlets: { dialog: ['editEducation', id] } }]);
    this.datosPorfolio.detailEducation(id).subscribe(data => {
      const education = data;
      const dialogRef = this.dialog.open(EducationEditComponent, {
        data: education
      });
      dialogRef.afterClosed().subscribe(data =>{
        console.log(`Resultado educationEditDialog: ${data}`);
      })
    })

  }

  onDelete(id: number){
    this.datosPorfolio.deleteEducation(id).subscribe(data =>{
      alert("Edu eliminada")
      window.location.reload();
    })
  }

  toggleState() {
    return this.isChecked
  }
}
