import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Experience } from '../models/experience';
import { Persona } from '../models/persona';
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
  getExperience(): Observable<Experience[]>{
    return this.http.get<Experience[]>('/api/experienceList');
  }

  saveExperience(experience: Experience): Observable<Experience>{
    return this.http.post<Experience>('/api/experienceNew', experience);
  }

  datailExperience(id: number): Observable<Experience>{
    return this.http.get<Experience>(`/api/experienceFind/${id}`);
  }

  updateExperience(id: number, experience: Experience): Observable<Experience>{
    return this.http.put<Experience>(`/api/experience/${id}`, experience);
  }

  deleteExperience(id: number): Observable<Experience>{
    return this.http.delete<Experience>(`/api/experienceDelete/${id}`)
  }
  
}
