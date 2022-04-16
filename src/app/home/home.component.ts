import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import { UserService } from '../_services/user.service';
import {TokenStorageService} from "../_services/token-storage.service";
import {AuthService} from "../_services/auth.service";

export class News {
  constructor(
    public id: number,
    public user_id: number,
    public text: string,
    public created: Date,
    public user_name: string
  ) {
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  content?: string;
  modalOptions: NgbModalOptions;
  closeResult: string = "";
  errorMessage = '';
  user_id: any
  user_name: any
  page: number = 0;
  form: any = {
    text: null
  };
  editForm = new FormGroup({
      id: new FormControl(),
      user_id: new FormControl(),
      text: new FormControl(),
      created: new FormControl(),
      user_name: new FormControl()
  });

  private deleteID: number | undefined;

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

  news: News[] = [];
  private roles: string[] = [];
  isLoggedIn = false;
  showTeacherBoard = false;
  username?: string;
  isSuccessful = false;

  ngOnInit(): void {
    this.getNews()
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
      user_id: [''],
      text: [''],
      created: [''],
      user_name: ['']
    } );
  }

  getNews() {
    this.httpClient.get<any>('http://localhost:8080/api/auth/news').subscribe(
      response => {
        console.log(response);
        this.news = response;
      }
    );
  }

  onSubmit(): void {
    const {text} = this.form;
    this.authService.add_news(text, this.user_id, this.user_name).subscribe({
      next: data => {
        console.log(text.toString(), data);
        this.isSuccessful = true;
      },
    });
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

  openDelete(targetModal: any, news: News) {
    this.deleteID = news.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  openEdit(targetModal: any, news: News){
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
  });
  this.editForm.patchValue( {
      id: news.id,
      user_id: news.user_id,
      text: news.text,
      created: news.created,
      user_name: news.user_name
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/api/auth/news/' + this.deleteID + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  onEdit(){
    const editURL = 'http://localhost:8080/api/auth/news/' + this.editForm.value.id + '/edit';
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  timeConverter(d: Date) {
    var EditD = d.toString().replace('T', ' ');
    return EditD.toString().slice(0,-7);
  }
}
