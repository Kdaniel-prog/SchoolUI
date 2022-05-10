import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {GradesComponent} from "./grades/grades.component";
import {SubjectsComponent} from "./subjects/subjects.component";
import {StudentGradeComponent} from "./student-grade/student-grade.component";
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'grades', component: GradesComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'student-grade', component: StudentGradeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
