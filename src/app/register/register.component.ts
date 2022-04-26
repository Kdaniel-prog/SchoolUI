import { AuthService } from '../_services/auth.service';
import {Component} from "@angular/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent{
  form: any = {
    username: null,
    email: null,
    password: null,
    isStudent: null,
    name: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { username, email, password, isStudent, name } = this.form;
    this.authService.register(username, email, password, isStudent, name).subscribe({
      next: data => {
        console.log(isStudent.toString(),data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
