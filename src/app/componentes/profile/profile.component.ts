import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isCollapsed: boolean = true;
  isChecked: boolean = false;
  miPorfolio: any;

  constructor(private datosPorfolio: PorfolioService, private toggle: ToggleService) {

  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data => {
      this.miPorfolio = data;
    });
    this.toggle.isChecked$.subscribe(
      data => {
        this.isChecked = data;
      }
    );
  }

  toggleState() {
    return this.isChecked
  }

}
