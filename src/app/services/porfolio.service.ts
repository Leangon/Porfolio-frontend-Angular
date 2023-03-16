import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Education } from '../models/education';
import { Experience } from '../models/experience';
import { Persona } from '../models/persona';
import { Proyects } from '../models/proyects';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  //* Person
  getPersonList(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.url + `personaVerLista`);
  }

  updatePerson(id: number, persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(this.url + `personUpdate/${id}`, persona)
  }

  getPersonDetail(id: number): Observable<Persona>{
    return this.http.get<Persona>(this.url + `personaFind/${id}`)
  }


  //* Skills
  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.url + `skillVerLista`)
  }

  saveSkill(skill: Skill): Observable<Skill>{
    return this.http.post<Skill>(this.url + `skillNew`, skill)
  }

  detailSkill(id: number): Observable<Skill>{
    return this.http.get<Skill>(this.url + `skillFind/${id}`)
  }

  updateSkill(id: number, skill: Skill): Observable<Skill>{
    return this.http.put<Skill>(this.url + `skillUpdate/${id}`, skill)
  }

  deleteSkill(id: number): Observable<Skill>{
    return this.http.delete<Skill>(this.url + `skillDelete/${id}`)
  }


  //* Experiences
  getExperiences(): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.url + `experienceList`);
  }

  saveExperience(experience: Experience): Observable<Experience>{
    return this.http.post<Experience>(this.url + `experienceNew`, experience);
  }

  datailExperience(id: number): Observable<Experience>{
    return this.http.get<Experience>(this.url + `experienceFind/${id}`);
  }

  updateExperience(id: number, experience: Experience): Observable<Experience>{
    return this.http.put<Experience>(this.url + `experienceUpdate/${id}`, experience);
  }

  deleteExperience(id: number): Observable<Experience>{
    return this.http.delete<Experience>(this.url + `experienceDelete/${id}`)
  }


  //*Education
  getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>(this.url + `educationList`);
  }

  saveEducation(education: Education): Observable<Education>{
    return this.http.post<Education>(this.url + `educationNew`, education);
  }

  detailEducation(id: number): Observable<Education>{
    return this.http.get<Education>(this.url + `educationFind/${id}`);
  }

  updateEducation(id: number, education: Education): Observable<Education>{
    return this.http.put<Education>(this.url + `educationUpdate/${id}`, education);
  }

  deleteEducation(id: number): Observable<Education>{
    return this.http.delete<Education>(this.url + `educationDelete/${id}`);
  }

  //*Proyects
  getProyect(): Observable<Proyects[]>{
    return this.http.get<Proyects[]>(this.url + `proyectsList`);
  }

  saveProyect(proyect: Proyects): Observable<Proyects>{
    return this.http.post<Proyects>(this.url + `proyectNew`, proyect);
  }

  detailProyect(id: number): Observable<Proyects>{
    return this.http.get<Proyects>(this.url + `proyectFind/${id}`);
  }

  updateProyect(id: number, proyect: Proyects): Observable<Proyects>{
    return this.http.put<Proyects>(this.url + `proyectUpdate/${id}`, proyect);
  }

  deleteProyect(id: number): Observable<Proyects>{
    return this.http.delete<Proyects>(this.url + `proyectDelete/${id}`);
  }
  
}
