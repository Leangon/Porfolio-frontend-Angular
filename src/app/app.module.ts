import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//ngx-bootstrap
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideStorage, getStorage } from "@angular/fire/storage";

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
import { ProfileEditComponent } from './componentes/profile/profile-edit.component';
import { ExperienceEditComponent } from './componentes/experience/experience-edit.component';
import { ExperienceNewComponent } from './componentes/experience/experience-new.component';
import { EducationNewComponent } from './componentes/education/education-new.component';
import { EducationEditComponent } from './componentes/education/education-edit.component';
import { ProyectsNewComponent } from './componentes/projects/proyects-new.component';
import { ProyectsEditComponent } from './componentes/projects/proyects-edit.component';

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
    EditSkillComponent,
    ProfileEditComponent,
    ExperienceEditComponent,
    ExperienceNewComponent,
    EducationNewComponent,
    EducationEditComponent,
    ProyectsNewComponent,
    ProyectsEditComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
