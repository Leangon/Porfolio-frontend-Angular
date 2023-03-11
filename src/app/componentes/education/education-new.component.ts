import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-education-new',
  templateUrl: './education-new.component.html',
  styleUrls: ['./education-new.component.css'],
  providers: [DatePipe],
})
export class EducationNewComponent {
  datosperson: any;

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

  constructor(private formBuilder: FormBuilder, private porfolioService: PorfolioService, private router: Router, private imageService: ImageService, private datePipe: DatePipe ) {

    this.form = this.formBuilder.group(
      {
        university: ['', [Validators.required]],
        title: ['', [Validators.required]],
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required],
        urlLogo: ['', Validators.required]
      }
    )
    console.log(this.startDate);
  }

  ngOnInit(): void{
    this.porfolioService.getPersonList().subscribe(data => {
      this.datosperson = data[0];
      this.persona = {id: this.datosperson.id};
      console.log(this.persona);
    })
  }

  // getFormattedDate(): string {
  //   return this.datePipe.transform(this.startDate, 'dd/MM/yyyy');
  // }

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

  get UrlLogo() {
    return this.form.get("urlLogo")
  }

  get UrlLogoInvalid(){
    return this.UrlLogo?.touched && !this.UrlLogo?.valid;
  }

  get UrlLogoValid(){
    return this.UrlLogo?.touched && this.UrlLogo?.valid;
  }

  onAdd(event: Event): void{
    event.preventDefault;

    this.urlLogo = this.imageService.url;
    console.log("Estoy haciendo click en agregar");
    if (this.form.valid) {
      const formattedStartDate: string = this.datePipe.transform(this.dateStart, 'dd/MM/yyyy').toString();
      const formattedEndDate: string = this.datePipe.transform(this.dateEnd, 'dd/MM/yyyy').toString();

      this.startDate = formattedStartDate;
      this.endDate = formattedEndDate;
      console.log(this.startDate);

      const education: Education = new Education(this.university, this.title, this.urlLogo, this.startDate, this.endDate, this.persona.id);
      console.log(education);
      
      this.porfolioService.saveEducation(education).subscribe(data => {
        alert("Educacion añadida");
        this.router.navigate(['']);
        window.location.reload();
      }, err => {
        alert("Fallo guardar educacion")
      })
    }
  }

  uploadImage(event: Event){
    this.imageService.uploadImage(event);
  }

}