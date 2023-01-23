import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  miPorfolio: any;

  constructor(private datosPorfolio:PorfolioService, private dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      this.miPorfolio = data;
    });    
  }
  
  openDialog() {
    this.dialogService.dialogRef = this.dialog.open(LoginComponent);
  }

}

  
  
  
  
  
  



