import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showTeacherBoard = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
