import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent implements OnInit {
  
  educationList:any;
  isChecked: boolean = false;

  constructor(private datosPorfolio:PorfolioService, private toggle: ToggleService) { }

  ngOnInit(): void {
    // this.datosPorfolio.obtenerDatos().subscribe(data => {
    //   this.educationList = data;
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
}
