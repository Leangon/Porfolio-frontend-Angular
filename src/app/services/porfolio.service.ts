import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Education } from '../models/education';
import { Experience } from '../models/experience';
import { Persona } from '../models/persona';
import { Proyects } from '../models/proyects';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private http: HttpClient) { }


  //* Person
  getPersonList(): Observable<Persona[]>{
    return this.http.get<Persona[]>('/api/personaVerLista');
  }

  updatePerson(id: number, persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(`/api/personUpdate/${id}`, persona)
  }

  getPersonDetail(id: number): Observable<Persona>{
    return this.http.get<Persona>(`/api/personaFind/${id}`)
  }


  //* Skills
  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>('/api/skillVerLista')
  }

  saveSkill(skill: Skill): Observable<Skill>{
    return this.http.post<Skill>('/api/skillNew', skill)
  }

  detailSkill(id: number): Observable<Skill>{
    return this.http.get<Skill>(`/api/skillFind/${id}`)
  }

  updateSkill(id: number, skill: Skill): Observable<Skill>{
    return this.http.put<Skill>(`/api/skillUpdate/${id}`, skill)
  }

  deleteSkill(id: number): Observable<Skill>{
    return this.http.delete<Skill>(`/api/skillDelete/${id}`)
  }


  //* Experiences
  getExperiences(): Observable<Experience[]>{
    return this.http.get<Experience[]>('/api/experienceList');
  }

  saveExperience(experience: Experience): Observable<Experience>{
    return this.http.post<Experience>('/api/experienceNew', experience);
  }

  datailExperience(id: number): Observable<Experience>{
    return this.http.get<Experience>(`/api/experienceFind/${id}`);
  }

  updateExperience(id: number, experience: Experience): Observable<Experience>{
    return this.http.put<Experience>(`/api/experienceUpdate/${id}`, experience);
  }

  deleteExperience(id: number): Observable<Experience>{
    return this.http.delete<Experience>(`/api/experienceDelete/${id}`)
  }


  //*Education
  getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>('/api/educationList');
  }

  saveEducation(education: Education): Observable<Education>{
    return this.http.post<Education>('/api/educationNew', education);
  }

  detailEducation(id: number): Observable<Education>{
    return this.http.get<Education>(`/api/educationFind/${id}`);
  }

  updateEducation(id: number, education: Education): Observable<Education>{
    return this.http.put<Education>(`/api/educationUpdate/${id}`, education);
  }

  deleteEducation(id: number): Observable<Education>{
    return this.http.delete<Education>(`/api/educationDelete/${id}`);
  }

  //*Proyects
  getProyect(): Observable<Proyects[]>{
    return this.http.get<Proyects[]>('/api/proyectsList');
  }

  saveProyect(proyect: Proyects): Observable<Proyects>{
    return this.http.post<Proyects>('/api/proyectNew', proyect);
  }

  detailProyect(id: number): Observable<Proyects>{
    return this.http.get<Proyects>(`/api/proyectFind/${id}`);
  }

  updateProyect(id: number, proyect: Proyects): Observable<Proyects>{
    return this.http.put<Proyects>(`/api/proyectUpdate/${id}`, proyect);
  }

  deleteProyect(id: number): Observable<Proyects>{
    return this.http.delete<Proyects>(`/api/proyectDelete/${id}`);
  }
  
}
