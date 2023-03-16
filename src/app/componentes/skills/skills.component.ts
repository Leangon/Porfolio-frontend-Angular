import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { EditSkillComponent } from './edit-skill.component';
import { NewSkillComponent } from './new-skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillsList!: any[];
  isChecked: boolean = false;

  constructor(private porfolioService: PorfolioService, private toggle: ToggleService, private dialog: MatDialog, private router: Router,) {
  }

  ngOnInit(): void {
    this.getSkillsList();
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
  }

  getSkillsList(){
    this.porfolioService.getSkills().subscribe(data => {
      this.skillsList = data;
      // console.log(this.skillsList);
    });
  }

  toggleState() {
    return this.isChecked
  }

  openDialog(): void {
    this.router.navigate([{ outlets: { dialog: 'newSkill' } }]);
    const dialogRef = this.dialog.open(NewSkillComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getSkillsList();
        }
      }
    })
  }

  openDialogEdit(id: number): void {
    this.router.navigate([{ outlets: { dialog: ['editSkill', id] } }]);
    this.porfolioService.detailSkill(id).subscribe(datas => {
      const skill = datas;
      const dialogRef = this.dialog.open(EditSkillComponent, {
        data: skill,
      });
      dialogRef.afterClosed().subscribe({
        next: (val: any) => {
          if (val) {
            this.getSkillsList();
          }
        }
      })
    }, err => {
      alert('Error al traer skill');
    })
  }

  delete(id: number): void {
    if (id != undefined) {
      alert("Skill eliminada");
      this.porfolioService.deleteSkill(id).subscribe(
        data => {
          this.getSkillsList();
        })
    }
  }
}
