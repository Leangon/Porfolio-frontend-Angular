import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isChecked: boolean = false;
  persona: any;

  constructor(private porfolioService: PorfolioService, private toggle: ToggleService) {}

  ngOnInit(): void {
    this.porfolioService.getPerson().subscribe(data => {
      this.persona = data[0];
      // console.log(this.persona)
    });
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
  }
  
}
