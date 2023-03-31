import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ThemePalette } from '@angular/material/core';
import { ToggleService } from 'src/app/services/toggle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


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
  isAuthenticated: boolean = false;
  private subscription: Subscription;

  constructor(
    private datosPorfolio: PorfolioService, 
    private matDialog: MatDialog, 
    private toggleService: ToggleService, 
    private authService: AuthService, 
    private router: Router) {
    
      this.subscription = this.authService.isAuthenticated$.subscribe(data => {
      this.isAuthenticated = data;
      this.disabled = !data;
      this.isChecked = data;
      this.showPopover = !data;
      this.updateIsChecked();
    })
  }

  ngOnInit(): void {
    this.datosPorfolio.getPersonList().subscribe(data => {
      this.miPorfolio = data;
    });
  }

  updateIsChecked() {
    return this.toggleService.updateToggle(this.isChecked)
  }

  openDialog() {
    const dialogRef = this.matDialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.router.navigate([''])
        }
      }
    })
  }

  onLogout(): void {
    this.authService.logout();
  }

}
