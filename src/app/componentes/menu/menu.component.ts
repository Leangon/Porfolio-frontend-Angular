import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ThemePalette } from '@angular/material/core';
import { Subject, Subscription } from 'rxjs';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  miPorfolio: any;
  disabled: boolean = false;
  color: ThemePalette = 'primary';
  isChecked: boolean = false;

  constructor(private datosPorfolio:PorfolioService, private dialog: MatDialog, private dialogService: DialogService, private toggle: ToggleService) {
    
   }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      this.miPorfolio = data;
    }); 
  }

  updateIsChecked(){
    this.toggle.updateToggle(this.isChecked)
  }

  openDialog() {
    this.dialogService.dialogRef = this.dialog.open(LoginComponent);
  }

}

  
  
  
  
  
  



