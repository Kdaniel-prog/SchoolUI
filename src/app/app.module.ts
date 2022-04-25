import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardTeacherComponent } from './board-teacher/board-teacher.component';
import { BoardStudentComponent } from './board-student/board-student.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HighlightSearchPipe } from './highlight-search.pipe';
import { GradesComponent } from './grades/grades.component';
import { SubjectsComponent } from './subjects/subjects.component';
import {OrderModule} from "ngx-order-pipe";
import { StudentGradeComponent } from './student-grade/student-grade.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardTeacherComponent,
    BoardStudentComponent,
    HighlightSearchPipe,
    GradesComponent,
    SubjectsComponent,
    StudentGradeComponent
  ],
    imports: [
        BrowserModule,
        NgxPaginationModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        OrderModule,
    ],
  exports: [RouterModule, AppComponent],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
