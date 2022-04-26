import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../_services/user.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../_services/auth.service";
import {AppComponent} from "../app.component";

export class Subjects {
  constructor(
    public id: number,
    public subject: string
  ) {
  }
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  editForm = new FormGroup({
    id: new FormControl(),
    subject: new FormControl()
  });
  form: any = {
    subject: null
  };

  private deleteID: number | undefined;

  isLoggedIn = false;
  showTeacherBoard = false;
  isSuccessful = false;

  private roles: string[] = [];
  subjects: Subjects[] = [];

  modalOptions: NgbModalOptions;
  private closeResult: string  = "";
  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private httpClient: HttpClient,
              private modalService: NgbModal,
              private authService: AuthService,
              private fb: FormBuilder) {
    this.modalOptions = {
      backdrop: 'static',
    }
  }

  ngOnInit(): void {
    this.getSubjects();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
    }
    this.editForm = this.fb.group({
      id: [''],
      subject: ['']
    } );
  }
  getSubjects() {
    this.httpClient.get<any>('http://localhost:8080/api/auth/subjects').subscribe(
      response => {
        console.log(response);
        this.subjects = response;
      });
  }
  onSubmit(): void {
    const {subject} = this.form;
    this.authService.add_subject(subject).subscribe({
      next: data => {
        console.log(subject.toString(), data);
        this.isSuccessful = true;
        window.location.reload();
      },
    });
    this.form = "";
    this.modalService.dismissAll(); //dismiss the modal
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onDelete() {
    const url = 'http://localhost:8080/api/auth/subjects/' + this.deleteID + '/delete';
    this.httpClient.delete(url)
      .subscribe(() => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  openDelete(targetModal: any, subjects: Subjects) {
    this.deleteID = subjects.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  openEdit(targetModal: any, subjects: Subjects){
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: subjects.id,
      subject: subjects.subject,
    });
  }

  onEdit(){
    const editURL = 'http://localhost:8080/api/auth/subjects/' + this.editForm.value.id + '/edit';
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
