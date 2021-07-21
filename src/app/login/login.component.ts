import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.getUsers().subscribe((users) => (this.users = users));
  }
  onSubmit() {
    let userExists = false;
    let passwordMatch = false;
    let role = '';
    for (let user of this.users) {
      if (user['username'] === this.loginForm.value['username']) {
        userExists = true;
        if (user['password'] === this.loginForm.value['password']) {
          passwordMatch = true;
          role = user['role'];
          this.loginService.setUser(user['name']);
        }
      }
    }
    if (!userExists) {
      alert('user does not exist');
      // this.loginForm.value['username'] = [''];
      // this.loginForm.value['password'] = [''];
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
      this.router.navigate(['/']);
    } else {
      if (!passwordMatch) {
        alert('password does not match');
        // this.loginForm.value['username'] = [''];
        // this.loginForm.value['password'] = [''];
        this.loginForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
        });
        this.router.navigate(['/']);
      }
    }

    if (userExists && passwordMatch) {
      if (role == 'admin') {
        this.loginService.setRole('admin');
        this.router.navigate(['/admin/jobs/']);
      } else {
        this.loginService.setRole('contractor');
        this.router.navigate(['/home/timecard_submission/']);
      }
    }
  }
}
