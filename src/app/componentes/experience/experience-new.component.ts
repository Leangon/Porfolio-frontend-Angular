import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-experience-new',
  templateUrl: './experience-new.component.html',
  styleUrls: ['./experience-new.component.css'],
  providers: [DatePipe],
})
export class ExperienceNewComponent {

  datosperson: any;

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

  constructor(private formBuilder: FormBuilder, private porfolioService: PorfolioService, router: Router, private imageService: ImageService, private datePipe: DatePipe ) {

    this.form = this.formBuilder.group(
      {
        company: ['', [Validators.required]],
        position: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(15)]],
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
      const experience: Experience = new Experience(this.company, this.position, this.description, this.startDate, this.endDate, this.urlLogo, this.persona.id);
      console.log(experience);
      
      this.porfolioService.saveExperience(experience).subscribe(data => {
        alert("Experiencia añadida");
        window.location.reload();
      }, err => {
        alert("Fallo guardar experiencia")
      })
    }
  }

  uploadImage(event: Event){
    this.imageService.uploadImage(event);
  }
  
  mostrarFecha(){
    const formattedDate: string = this.datePipe.transform(this.dateStart, 'dd/MM/yyyy');
  this.startDate = formattedDate.toString();
  console.log(this.startDate);
  }

}
