import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillsList!: any[];
  isChecked: boolean = false;

  constructor(private datosPorfolio: PorfolioService, private toggle: ToggleService) {
    
   }

  ngOnInit(): void {
    this.datosPorfolio.getSkills().subscribe(data => {
      this.skillsList = data;
      console.log(this.skillsList);
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
}
