import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Proyects } from 'src/app/models/proyects';
import { ImageService } from 'src/app/services/image.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-proyects-edit',
  templateUrl: './proyects-edit.component.html',
  styleUrls: ['./proyects-edit.component.css']
})
export class ProyectsEditComponent {
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

  constructor(private formBuilder: FormBuilder, private porfolioService: PorfolioService, private router: Router, private imageService: ImageService, @Inject(MAT_DIALOG_DATA) public data: Proyects ) {

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(15)]],
        urlRepository: ['', Validators.required],
        urlDemo: ['', Validators.required],
        // urlImage: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.name = this.data.name;
    this.description = this.data.description;
    this.urlRepository = this.data.urlRepository;
    this.urlDemo = this.data.urlDemo;
    this.persona = {id: this.data.persona.id}
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

  updateProyect(event: Event, id: number): void {
    event.preventDefault;

    if (this.imageService.url) {
      this.urlImage = this.imageService.url;
    } else {
      this.urlImage = this.data.urlImage;
    }

    console.log("Estoy haciendo click en agregar");
    if (this.form.valid) {

      const proyect: Proyects = new Proyects(this.name, this.description, this.urlRepository, this.urlDemo, this.urlImage, this.persona.id);
      console.log(proyect);
      
      this.porfolioService.updateProyect(id, proyect).subscribe(data => {
        alert("Proyecto editado");
        this.router.navigate(['']);
        window.location.reload();
      }, err => {
        alert("Fallo editar Proyecto")
      })
    }
  }

  uploadImage(event: Event) {
    this.imageService.uploadImage(event);
  }
}
