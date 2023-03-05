import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ThemePalette } from '@angular/material/core';
import { ToggleService } from 'src/app/services/toggle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class MenuComponent implements OnInit {
  miPorfolio: any;
  disabled: boolean = true;
  color: ThemePalette = 'primary';
  isChecked: boolean = false;
  showPopover: boolean = false;
  isAuthenticated: boolean = false
  
  constructor(private datosPorfolio:PorfolioService, private matDialog: MatDialog, private dialogService: DialogService, private toggle: ToggleService, private auth: AuthService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.datosPorfolio.getPerson().subscribe(data =>{
      this.miPorfolio = data;
    }); 
    if (this.auth.logIn) {
      this.disabled = false;
      this.isChecked = true;
      this.updateIsChecked();
      this.isAuthenticated = true;
    }else{
      this.disabled = true;
    }
    if (this.disabled) {
      this.showPopover = true;
    }
  }

  updateIsChecked(){
    return this.toggle.updateToggle(this.isChecked)
  }

  openDialog() {
    this.dialogService.dialogRef = this.matDialog.open(LoginComponent);
    this.router.navigate([{outlets: { dialog: 'login'}}])
  }

  onLogout():void {
    this.auth.logout();
    window.location.reload();
  }

}
