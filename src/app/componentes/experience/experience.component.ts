  import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { AuthService } from 'src/app/services/auth.service';
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
  disabled: boolean = true;
  private subscription: Subscription;

  constructor(
    private porfolioService: PorfolioService, 
    private toggle: ToggleService, 
    private dialog: MatDialog, 
    private router: Router, 
    private authService: AuthService) {
    this.subscription = this.authService.isAuthenticated$.subscribe(data => {
      this.disabled = !data;
    })
   }

   ngOnInit(): void {
    this.getExperienceList();
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
  }

  getExperienceList(){
    this.porfolioService.getExperiences().subscribe(data => {
      this.experienceList = data;
    });
  }

   toggleState() {
    return this.isChecked
  }
  
  drop(event: CdkDragDrop<Experience[]>) {
    let previousIndex = event.previousIndex;
    let currentIndex = event.currentIndex;
    moveItemInArray(this.experienceList, event.previousIndex, event.currentIndex);
    console.log(this.experienceList);
    console.log(previousIndex);
    console.log(currentIndex);
  }

  openDialogNewExperience(){
    this.router.navigate([{outlets: { dialog: 'newExperience'}}])
    const dialogRef = this.dialog.open(ExperienceNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getExperienceList();
        }
      }
    })
  }

  openDialogEdit(id: number): void{
    this.router.navigate([{outlets: { dialog: ['editExperience', id] }}]);
    this.porfolioService.datailExperience(id).subscribe(data =>{
      const experience = data;
      const dialogRef = this.dialog.open(ExperienceEditComponent, {
        data: experience
      });
      dialogRef.afterClosed().subscribe({
        next: (val: any) => {
          if (val) {
            this.getExperienceList();
          }
        }
      })
    })
  }

  onDelete(id: number): void{
    if (id != undefined) {
      alert("Experience eliminada");
      this.porfolioService.deleteExperience(id).subscribe(
        data => {
          this.getExperienceList();
        })
    }
  }
}
