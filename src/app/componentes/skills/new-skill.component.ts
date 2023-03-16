import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit{

  datosperson: any;
  name: string = '';
  urlImage: string = '';
  percent!: number;
  persona!: {
    id: number;
  };

  form: any = FormGroup;

  constructor(private porfolioService: PorfolioService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<NewSkillComponent>, public imageService: ImageService) {
    
    this.form = this.formBuilder.group(
      {
        name:['', [Validators.required, Validators.minLength(2)]],
        urlImage:['', [Validators.required]],
        percent: ['', [Validators.required, Validators.min(0) ,Validators.max(100)]]
      }
    )
  }

  ngOnInit(): void {
    this.porfolioService.getPersonList().subscribe(data => {
      this.datosperson = data[0];
      this.persona = {id: this.datosperson.id};
      // console.log(this.datosperson);
      // console.log(this.persona);
    })
  }

  onAdd(event: Event): void {
    event.preventDefault;
    this.urlImage = this.imageService.url;

    if (this.form.valid) {
      // console.log(this.form.valid);
      // console.log(this.form.value);
      const skill = new Skill(this.name, this.urlImage, this.percent, this.persona.id);
      console.log(skill);
      this.porfolioService.saveSkill(skill).subscribe(
        date => {
          alert("Skill añadida");
          const urlTree = this.router.createUrlTree(['/']);
          this.router.navigateByUrl(urlTree);
          this.dialogRef.close(true);
        }, err => {
          alert("Fallo");
        })
    }
  }

  uploadImage(event: any){
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
