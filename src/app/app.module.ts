import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//ngx-bootstrap
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from "./componentes/login/login.component";
import { ProfileComponent } from './componentes/profile/profile.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ExperienceComponent } from './componentes/experience/experience.component';
import { EducationComponent } from './componentes/education/education.component';
import { ProjectsComponent } from './componentes/projects/projects.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { BtnGoupComponent } from './componentes/btn-goup/btn-goup.component';
import { NewSkillComponent } from './componentes/skills/new-skill.component';
import { InterceptorService } from './services/interceptor.service';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { EditSkillComponent } from './componentes/skills/edit-skill.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ProfileComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    BtnGoupComponent,
    NewSkillComponent,
    PorfolioComponent,
    EditSkillComponent
  ],
 
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    DragDropModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
