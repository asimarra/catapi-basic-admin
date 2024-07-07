import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUserBasicData } from '../../interfaces/IUsers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: IUserBasicData = {
    id: 0,
    name: '',
    email: '',
    password: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message ? err.error.message : err.error;
        this.isSignUpFailed = true;
      }
    );
  }
}
