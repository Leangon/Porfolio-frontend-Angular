import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proyects } from 'src/app/models/proyects';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-proyects-new',
  templateUrl: './proyects-new.component.html',
  styleUrls: ['./proyects-new.component.css']
})
export class ProyectsNewComponent {
  datosperson: any;

  name: string;
  description: string;
  urlRepository: string;
  urlDemo: string;
  urlImage: string;
  persona!: {
    id: number;
  };

  form: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private porfolioService: PorfolioService, private router: Router, private imageService: ImageService,) {

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(15)]],
        urlRepository: ['', Validators.required],
        urlDemo: ['', Validators.required],
        urlImage: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.porfolioService.getPersonList().subscribe(data => {
      this.datosperson = data[0];
      this.persona = { id: this.datosperson.id };
      console.log(this.persona);
    })
  }

  get Name() {
    return this.form.get("name")
  }

  get Description() {
    return this.form.get("description")
  }

  get UrlRepository() {
    return this.form.get("urlRepository")
  }

  get UrlDemo() {
    return this.form.get("urlDemo")
  }

  get UrlImage() {
    return this.form.get("urlImage")
  }

  get UrlImageInvalid() {
    return this.UrlImage?.touched && !this.UrlImage?.valid;
  }

  get UrlImageValid() {
    return this.UrlImage?.touched && this.UrlImage?.valid;
  }

  onAdd(event: Event): void {
    event.preventDefault;

    this.urlImage = this.imageService.url;

    console.log("Estoy haciendo click en agregar");
    if (this.form.valid) {

      const proyect: Proyects = new Proyects(this.name, this.description, this.urlRepository, this.urlDemo, this.urlImage, this.persona.id);
      console.log(proyect);
      
      this.porfolioService.saveProyect(proyect).subscribe(data => {
        alert("Proyecto añadido");
        this.router.navigate(['']);
        window.location.reload();
      }, err => {
        alert("Fallo guardar Proyecto")
      })
    }
  }

  uploadImage(event: Event) {
    this.imageService.uploadImage(event);
  }
}
