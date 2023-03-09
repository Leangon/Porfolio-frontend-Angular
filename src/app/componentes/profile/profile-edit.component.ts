import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {

  id: number;
  title: string;
  description: string;
  aboutMe: string;
  urlImage: string;

  form: any = FormGroup;

  constructor(private porfolioService: PorfolioService, private formBuilder: FormBuilder, private route: Router, public dialogRef: MatDialogRef<ProfileEditComponent>, @Inject(MAT_DIALOG_DATA) public data: Persona, private imageService: ImageService) {
    
    this.form = this.formBuilder.group({
      title:['', [Validators.required, Validators.minLength(20)]],
      description:['', [Validators.required, Validators.minLength(50)]],
      aboutMe:['', [Validators.required, Validators.minLength(50)]],
      urlImage:['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.title = this.data.title;
    this.description = this.data.description;
  
    this.aboutMe = this.data.aboutMe;
  }

  onUpdate(event: Event): void{
    event.preventDefault;

    this.urlImage = this.imageService.url;
    if (this.form.valid) {
      let personUp = new Persona(this.title,  this.description, this.urlImage, this.aboutMe);
      console.log(personUp);
      this.porfolioService.updatePerson(this.id, personUp).subscribe(
        date =>{
          alert('Persona actualizada');
          this.route.navigate(['']);
          window.location.reload();
        }, err => {
          alert('Fallo');
        }
      )
    }
  }

  uploadImage(event: any){
    // const name = `skill_${nameParam}`
    this.imageService.uploadImage(event)
  }

  get Title() {
    return this.form.get("title");
  }

  get Description() {
    return this.form.get("description");
  }

  get AboutMe() {
    return this.form.get('aboutMe');
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
