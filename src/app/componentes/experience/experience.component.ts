import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { ExperienceEditComponent } from './experience-edit.component';
import { ExperienceNewComponent } from './experience-new.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  experienceList: any;
  isChecked: boolean = false;

  constructor(private porfolioService: PorfolioService, private toggle: ToggleService, private dialog: MatDialog, private router: Router, ) {
    
   }

   ngOnInit(): void {
    this.porfolioService.getExperiences().subscribe(data => {
      this.experienceList = data;
    });
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
  }

   toggleState() {
    return this.isChecked
  }
  
  drop(event: CdkDragDrop<Experience[]>) {
    moveItemInArray(this.experienceList, event.previousIndex, event.currentIndex);
    console.log(this.experienceList);
  }

  openDialogNewExperience(){
    this.router.navigate([{outlets: { dialog: 'newExperience'}}])
    const dialogRef = this.dialog.open(ExperienceNewComponent);
    dialogRef.afterClosed().subscribe(data => {
      console.log(`Resultado de dialogo ExperienceNew: ${data}`);
    })
  }

  openDialogEdit(id: number): void{
    this.router.navigate([{outlets: { dialog: ['editExperience', id] }}]);
    this.porfolioService.datailExperience(id).subscribe(data =>{
      const experience = data;
      const dialogRefEdit = this.dialog.open(ExperienceEditComponent, {
        data: experience
      });
      dialogRefEdit.afterClosed().subscribe(data => {
        console.log(`Resultado de dialogo ExperienceEdit: ${data}`);
      })
    })
  }

  onDelete(id: number): void{
    this.porfolioService.deleteExperience(id).subscribe(data => {
      console.log("Experiencia eliminada");
      window.location.reload();
    })
  }
}
