import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';
import * as moment from 'moment';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css'],
  providers: [DatePipe],
})
export class ExperienceEditComponent {

  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  urlLogo: string;
  persona!: {
    id: number;
  };

  dateStart: Date;
  dateEnd: Date;
  form: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private porfolioService: PorfolioService, private router: Router, private dialogRef: MatDialogRef<ExperienceEditComponent>, private imageService: ImageService, private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: Experience,) {

    this.form = this.formBuilder.group(
      {
        company: ['', [Validators.required]],
        position: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(15)]],
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    console.log(this.data);
    this.company = this.data.company;
    this.position = this.data.position;
    this.description = this.data.description;
    this.dateStart = moment(this.data.startDate, 'DD/MM/YYYY').toDate();
    this.dateEnd = moment(this.data.endDate, 'DD/MM/YYYY').toDate();
    this.persona = { id: this.data.persona.id };
  }

  get Company() {
    return this.form.get("company")
  }

  get Position() {
    return this.form.get("position")
  }

  get Description() {
    return this.form.get("description")
  }

  get StartDate() {
    return this.form.get("startDate")
  }

  get EndDate() {
    return this.form.get("endDate")
  }

  get UrlLogo() {
    return this.form.get("urlLogo")
  }

  get UrlLogoInvalid() {
    return this.UrlLogo?.touched && !this.UrlLogo?.valid;
  }

  get UrlLogoValid() {
    return this.UrlLogo?.touched && this.UrlLogo?.valid;
  }

  onUpDate(event: Event, id: number) {
    event.preventDefault;

    if (this.imageService.url) {
      this.urlLogo = this.imageService.url;
    } else {
      this.urlLogo = this.data.urlLogo;
    }

    if (this.form.valid) {
      const formattedStartDate: string = this.datePipe.transform(this.dateStart, 'dd/MM/yyyy').toString();
      const formattedEndDate: string = this.datePipe.transform(this.dateEnd, 'dd/MM/yyyy').toString();
      this.startDate = formattedStartDate;
      this.endDate = formattedEndDate;

      const experience: Experience = new Experience(this.company, this.position, this.description, this.startDate, this.endDate, this.urlLogo, this.persona.id);
      this.porfolioService.updateExperience(id, experience).subscribe(data => {
        alert("Experiencia editada");
        const urlTree = this.router.createUrlTree(['/']);
        this.router.navigateByUrl(urlTree);
        this.dialogRef.close(true);
      }, err => {
        alert("Fallo editar experiencia")
      })
    }
  }

  uploadImage(event: Event) {
    this.imageService.uploadImage(event);
  }

}
