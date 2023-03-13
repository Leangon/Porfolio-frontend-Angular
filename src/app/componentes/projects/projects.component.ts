import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { ProyectsEditComponent } from './proyects-edit.component';
import { ProyectsNewComponent } from './proyects-new.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  proyectsList: any;
  isChecked: boolean = false;
  
  constructor(private toggle: ToggleService, private porfolioService: PorfolioService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
    this.porfolioService.getProyect().subscribe(data =>{
      this.proyectsList = data;
    })

  }

  openDialogNewProyect(){
    this.router.navigate([{outlets: { dialog: 'newProyect'}}]);
    const dialoRef = this.dialog.open(ProyectsNewComponent);
    dialoRef.afterClosed().subscribe(data =>{
     console.log('Se cerro'); 
    })
  }

  openDialogEditProyect(id: number){
    this.router.navigate([{outlets: { dialog: ['editProyect', id]}}])
    this.porfolioService.detailProyect(id).subscribe(data =>{
      const proyect = data;
      const dialogRefEdit = this.dialog.open(ProyectsEditComponent, {
        data: proyect
      });
      dialogRefEdit.afterClosed().subscribe(data =>{
        console.log(`Se cerro ${data}`);
      })
    })
  }

  onDelete(id: number){
    this.porfolioService.deleteProyect(id).subscribe(data =>{
      alert('Proyecto eliminado');
      window.location.reload();
    })
  }

  toggleState() {
    return this.isChecked
  }
}
