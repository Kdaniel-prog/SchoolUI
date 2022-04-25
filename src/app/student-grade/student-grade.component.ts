import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../_services/user.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../_services/auth.service";
import {FormBuilder} from "@angular/forms";
import {OrderPipe} from "ngx-order-pipe";

export class Grades {
  constructor(
    public id: number,
    public user_name: string,
    public subject_name: string,
    public grade: number
  ) {
  }
}

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.css']
})
export class StudentGradeComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  content?: string;
  isLoggedIn = false;
  showTeacherBoard = false;
  username?: string;
  isSuccessful = false;
  closeResult: string = "";
  errorMessage = '';
  user_id: any
  user_name: any
  private roles: string[] = [];
  order: string = 'user_name';
  reverse: boolean = false;
  caseInsensitive: boolean = false;

  studentGrade: Grades[] = [];
  modalOptions: NgbModalOptions;
  currentUser: any;
  sortedCollection: Grades[];

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private httpClient: HttpClient,
              private orderPipe: OrderPipe){
    this.sortedCollection = orderPipe.transform(this.studentGrade, 'user_name');
    this.modalOptions = {
      backdrop: 'static',
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.getStudentGrade(user.id);
      this.user_id = user.id;
      this.user_name = user.name;
      this.roles = user.roles;
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
      this.username = user.username;
    }
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getStudentGrade(user_id: number) {
    console.log(this.user_id,"asd")
    const editURL = 'http://localhost:8080/api/auth/grades/' +  user_id + '/current_student_grade';
    this.httpClient.get<any>(editURL).subscribe(
      response => {
        console.log(response);
        this.studentGrade = response;
      });
  }
  onTableDataChange(event: any){
    this.page = event;
  }
}
