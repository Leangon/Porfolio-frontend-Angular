import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { DialogService } from 'src/app/services/dialog.service';
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

  constructor(private porfolioService: PorfolioService, private toggle: ToggleService, private dialog: MatDialog, private router: Router, private dialogService: DialogService) {
   }

  ngOnInit(): void {
    this.porfolioService.getSkills().subscribe(data => {
      this.skillsList = data;
      // console.log(this.skillsList);
    });
    this.toggle.isChecked.subscribe(
      data => {
        this.isChecked = data;
      }
    );
    // console.log(`Este es toggle ${this.isChecked}`);
  }

  toggleState() {
    return this.isChecked
  }

  openDialog(): void {
    this.dialog.open(NewSkillComponent);
    this.router.navigate([{ outlets: { dialog: 'newSkill' } }]);
  }

  openDialogEdit(id: number): void {
    this.router.navigate([{ outlets: { dialog: ['editSkill', id]} }]);
    this.porfolioService.detailSkill(id).subscribe(datas =>{
      const skill = datas;
      const dialogRef = this.dialog.open(EditSkillComponent, {
        data: skill,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    },err =>{
      alert('Error al traer skill');
    })
    
  }

  delete(id: number): void {
    if (id != undefined) {
      alert("esta por eleminar una skill");
      this.porfolioService.deleteSkill(id).subscribe(
        data => {
          window.location.reload();
        })
    }
  }
}
