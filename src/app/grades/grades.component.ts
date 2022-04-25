import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Subjects} from "../subjects/subjects.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../_services/user.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../_services/auth.service";
import {OrderPipe} from 'ngx-order-pipe';

export class Grades {
  constructor(
    public id: number,
    public user_name: string,
    public subject_name: string,
    public grade: number
  ) {
  }
}
export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string,
    public name: string
  ) {
  }
}

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  editForm = new FormGroup({
    id: new FormControl(),
    user_name: new FormControl(),
    subject_name: new FormControl(),
    grade: new FormControl()
  });

  form: any = {
    grade: null,
    user_name: null,
    subject_name: null
  };

  private deleteID: number | undefined;
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
  grades: Grades[] = [];
  users1: User[] = [];
  subjects: Subjects[] = [];
  grade_type: number[] = [1,2,3,4,5];

  order: string = 'user_name';
  reverse: boolean = false;
  caseInsensitive: boolean = false;

  sortedCollection: Grades[];
  modalOptions: NgbModalOptions;
  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private httpClient: HttpClient,
              private modalService: NgbModal,
              private authService: AuthService,
              private fb: FormBuilder,
              private orderPipe: OrderPipe) {

    this.sortedCollection = orderPipe.transform(this.grades, 'info.name');
    this.modalOptions = {
      backdrop: 'static',
    }
  }


  ngOnInit(): void {
    this.getGrades();
    this.getUsers();
    this.getSubjects();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
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
    this.editForm = this.fb.group({
      id: [''],
      user_name: [''],
      subject_name: [''],
      grade: ['']
    } );
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getGrades() {
    this.httpClient.get<any>('http://localhost:8080/api/auth/grades').subscribe(
      response => {
        console.log(response);
        this.grades = response;
      });
  }
  getSubjects() {
    this.httpClient.get<any>('http://localhost:8080/api/auth/subjects').subscribe(
      response => {
        console.log(response);
        this.subjects = response;
      });
  }
  getUsers(){
    this.httpClient.get<any>('http://localhost:8080/api/auth/student_users').subscribe(
      response => {
        console.log(response);
        this.users1 = response;
      });
  }
  onSubmit(): void {
    const {grade, user_name, subject_name} = this.form;
    this.authService.add_grade(grade, user_name, subject_name).subscribe({
      next: data => {
        console.log(grade.toString(),user_name.toString(),subject_name.toString(), data);
        this.isSuccessful = true;
      },
    });
    this.form = "";
    this.modalService.dismissAll(); //dismiss the modal
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openDelete(targetModal: any, grades: Grades) {
    this.deleteID = grades.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  openEdit(targetModal: any, grade: Grades){
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: grade.id,
      grade: grade.grade,
      user_name: grade.user_name,
      subject_name: grade.subject_name
    });
  }
  onDelete() {
    const deleteURL = 'http://localhost:8080/api/auth/grades/' + this.deleteID + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  onEdit(){
    const editURL = 'http://localhost:8080/api/auth/grades/' + this.editForm.value.id + '/edit';
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onTableDataChange(event: any){
    this.page = event;
  }
}
