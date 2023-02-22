import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isChecked: boolean = false;
  
  constructor(private toggle: ToggleService) { }

  ngOnInit(): void {
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
