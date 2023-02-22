import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  experienceList: any;
  isChecked: boolean = false;

  constructor(private datosPorfolio: PorfolioService, private toggle: ToggleService) {
    
   }

   ngOnInit(): void {
    // this.datosPorfolio.obtenerDatos().subscribe(data => {
    //   this.experienceList = data;
    // });
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
}
