import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { Experience } from './experience';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillsList: any;
  experienciasList: any;

  constructor(private datosPorfolio: PorfolioService) {
    
   }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data => {
      this.skillsList = data.skills;
      this.experienciasList = data.experiencia;
    })

   
  }
  
  drop(event: CdkDragDrop<Experience[]>) {
    moveItemInArray(this.experienciasList, event.previousIndex, event.currentIndex);
    console.log(this.experienciasList);
  }
}
