import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../componentes/login/login.component';
import { NewSkillComponent } from '../componentes/skills/new-skill.component';
import { PorfolioComponent } from '../componentes/porfolio/porfolio.component';
import { EditSkillComponent } from '../componentes/skills/edit-skill.component';
import { ProfileEditComponent } from '../componentes/profile/profile-edit.component';

const routes: Routes = [
  {path: '', component: PorfolioComponent},
  {path: 'login', component: LoginComponent, outlet: 'dialog' },
  {path: 'newSkill', component: NewSkillComponent, outlet: 'dialog'},
  {path: 'editSkill/:id', component: EditSkillComponent, outlet: 'dialog'},
  {path: 'editPerson/:id', component: ProfileEditComponent, outlet: 'dialog'},
  // {path: '**', component: Pagina404Component}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
