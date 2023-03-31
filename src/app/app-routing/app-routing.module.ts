import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../componentes/login/login.component';
import { NewSkillComponent } from '../componentes/skills/new-skill.component';
import { PorfolioComponent } from '../componentes/porfolio/porfolio.component';
import { EditSkillComponent } from '../componentes/skills/edit-skill.component';
import { ProfileEditComponent } from '../componentes/profile/profile-edit.component';
import { ExperienceNewComponent } from '../componentes/experience/experience-new.component';
import { ExperienceEditComponent } from '../componentes/experience/experience-edit.component';
import { EducationNewComponent } from '../componentes/education/education-new.component';
import { EducationEditComponent } from '../componentes/education/education-edit.component';
import { ProyectsEditComponent } from '../componentes/projects/proyects-edit.component';
import { ProyectsNewComponent } from '../componentes/projects/proyects-new.component';
import { ProjectsComponent } from '../componentes/projects/projects.component';

const routes: Routes = [
  {path: '', component: PorfolioComponent},
  {path: 'login', component: LoginComponent, outlet: 'dialog' },
  {path: 'newSkill', component: NewSkillComponent, outlet: 'dialog'},
  {path: 'editSkill/:id', component: EditSkillComponent, outlet: 'dialog'},
  {path: 'editPerson/:id', component: ProfileEditComponent, outlet: 'dialog'},
  {path: 'newExperience', component: ExperienceNewComponent, outlet: 'dialog'},
  {path: 'editExperience/:id', component: ExperienceEditComponent, outlet: 'dialog'},
  {path: 'newEducation', component: EducationNewComponent, outlet: 'dialog'},
  {path: 'editEducation/:id', component: EducationEditComponent, outlet: 'dialog'},
  {path: 'newProyect', component: ProyectsNewComponent, outlet: 'dialog'},
  {path: 'editProyect/:id', component: ProyectsEditComponent, outlet: 'dialog'},
  {path: 'proyects', component: ProjectsComponent}
  // {path: '**', component: Pagina404Component}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
