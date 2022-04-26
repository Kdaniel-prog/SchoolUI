import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "./_services/user.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./_services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showTeacherBoard = false;
  showStudentBoard = false;
  username?: string;
  modalOptions: NgbModalOptions;
  closeResult: string = "";

  constructor(private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private httpClient: HttpClient,
              private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
      this.showStudentBoard = this.roles.includes('ROLE_STUDENT')
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }




}
