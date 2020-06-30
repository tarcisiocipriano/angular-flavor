import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;

  isLoading = false;

  error = null;

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe({
      next: resData => {
        console.log(resData);
        this.isLoading = false;
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }


}
