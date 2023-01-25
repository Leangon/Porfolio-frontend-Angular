import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from "./componentes/login/login.component";
import { ProfileComponent } from './componentes/profile/profile.component';
import { AboutMeComponent } from './componentes/about-me/about-me.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { EducationComponent } from './componentes/education/education.component';
import { ProjectsComponent } from './componentes/projects/projects.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { BtnGoupComponent } from './componentes/btn-goup/btn-goup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ProfileComponent,
    AboutMeComponent,
    SkillsComponent,
    EducationComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    BtnGoupComponent
  ],
 
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    DragDropModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
