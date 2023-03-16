import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Education } from 'src/app/models/education';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css'],
  providers: [DatePipe],
})
export class EducationEditComponent {

  university: string;
  title: string;
  startDate: string;
  endDate: string;
  urlLogo: string;
  persona!: {
    id: number;
  };

  dateStart: Date;
  dateEnd: Date;
  form: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private porfolioService: PorfolioService, private router: Router, private dialogRef: MatDialogRef<EducationEditComponent>, private imageService: ImageService, private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: Education) {

    this.form = this.formBuilder.group(
      {
        university: ['', [Validators.required]],
        title: ['', [Validators.required]],
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required]
      }
    )
    console.log(this.startDate);
  }

  ngOnInit(): void {
    this.university = this.data.university;
    this.title = this.data.title;
    this.dateStart = moment(this.data.startDate, 'DD/MM/YYYY').toDate();
    this.dateEnd = moment(this.data.endDate, 'DD/MM/YYYY').toDate();
    this.persona = { id: this.data.persona.id };
  }

  get University() {
    return this.form.get("university")
  }

  get Title() {
    return this.form.get("title")
  }

  get StartDate() {
    return this.form.get("dateStart")
  }

  get EndDate() {
    return this.form.get("dateEnd")
  }

  onUpdate(event: Event, id: number): void {
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

      const education: Education = new Education(this.university, this.title, this.urlLogo, this.startDate, this.endDate, this.persona.id);

      this.porfolioService.updateEducation(id, education).subscribe(data => {
        alert("Educacion actualizada");
        const urlTree = this.router.createUrlTree(['/']);
        this.router.navigateByUrl(urlTree);
        this.dialogRef.close(true);
      }, err => {
        alert("Fallo editar educacion")
      })
    }
  }

  uploadImage(event: Event) {
    this.imageService.uploadImage(event);
  }
}
