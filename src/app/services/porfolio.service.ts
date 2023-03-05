import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Persona } from '../models/persona';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private http: HttpClient) { }

  getPerson(): Observable<Persona[]>{
    return this.http.get<Persona[]>('/api/personaVerLista');
  }

  updatePerson(id: number, persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(`/api/personaActualizar/${id}`, persona)
  }
  

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
  
}
