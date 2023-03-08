import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent {

  datosperson: any;

  id!: number;
  name: string = '';
  urlImage: string = '';
  percent!: number;
  persona!: {
    id: number;
  };

  form: any = FormGroup;

  constructor(private porfolioService: PorfolioService, private formBuilder: FormBuilder, private route: Router, public dialogRef: MatDialogRef<EditSkillComponent>, @Inject(MAT_DIALOG_DATA) public data: Skill, private imageService: ImageService) {
    
    this.form = this.formBuilder.group(
      {
        name:['', [Validators.required, Validators.minLength(2)]],
        urlImage:['', [Validators.required, Validators.minLength(1)]],
        percent: ['', [Validators.required, Validators.min(0) ,Validators.max(100)]]
      }
    )
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.name = this.data.name;
    this.urlImage = this.data.urlImage;
    this.percent = this.data.percent;
    
    this.porfolioService.getPerson().subscribe(data => {
      this.datosperson = data[0];
      this.persona = {id: this.datosperson.id};
    })
  }

  onUpdate(event: Event): void {
    event.preventDefault;
    this.urlImage = this.imageService.url;
    
    if (this.form.valid) {
      let skillUp = new Skill(this.name, this.urlImage, this.percent, this.persona.id);
      console.log(skillUp);
      this.porfolioService.updateSkill(this.id, skillUp).subscribe(
        date => {
          alert("Skill Actualizada");
          this.route.navigate([''])
          window.location.reload();
        }, err => {
          alert("Fallo");
        })
    }
  }

  uploadImage(event: any){
    // const name = `skill_${nameParam}`
    this.imageService.uploadImage(event)
  }

  get Name() {
    return this.form.get("name");
  }

  get Percent() {
    return this.form.get("percent");
  }

  get UrlImage() {
    return this.form.get("urlImage");
  }

  get UrlImageInvalid(){
    return this.UrlImage?.touched && !this.UrlImage?.valid;
  }

  get UrlImageValid(){
    return this.UrlImage?.touched && this.UrlImage.valid;
  }
}
