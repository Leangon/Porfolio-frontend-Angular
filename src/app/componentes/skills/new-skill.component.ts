import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
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

  constructor(private porfolioService: PorfolioService, private formBuilder: FormBuilder, private route: Router) {
    
    this.form = this.formBuilder.group(
      {
        name:['', [Validators.required, Validators.minLength(2)]],
        urlImage:['', [Validators.required, Validators.minLength(1)]],
        percent: ['', [Validators.required, Validators.min(0) ,Validators.max(100)]]
      }
    )
  }

  ngOnInit(): void {
    this.porfolioService.getPerson().subscribe(data => {
      this.datosperson = data[0];
      this.persona = {id: this.datosperson.id};
      // console.log(this.datosperson);
      // console.log(this.persona);
    })
  }

  onAdd(event: Event): void {
    event.preventDefault;

    if (this.form.valid) {
      // console.log(this.form.valid);
      // console.log(this.form.value);
      const skill = new Skill(this.name, this.urlImage, this.percent, this.persona.id);
      // console.log(skill.persona.id);
      this.porfolioService.saveSkill(skill).subscribe(
        date => {
          alert("Experiencia añadida");
          window.location.reload();
        }, err => {
          alert("Fallo");
        })
    }
  }

  get Name() {
    return this.form.get("name");
  }

  get Percent() {
    return this.form.get("percent");
  }
}
