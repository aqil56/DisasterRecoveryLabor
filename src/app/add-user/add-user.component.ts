import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ConfirmedValidator } from '../services/confirmed.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
        role: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirm_password'),
      }
    );
  }
  get f() {
    return this.userForm.controls;
  }

  ngOnInit(): void {}
  onSubmit(): void {
    const newUser = {
      name: this.userForm.value['name'],
      username: this.userForm.value['username'],
      password: this.userForm.value['password'],
      role: this.userForm.value['role'],
    };

    this.loginService
      .addUser(newUser)
      .subscribe((u) => this.router.navigate(['']));
    this.userForm.value['name'] = '';
    this.userForm.value['username'] = '';
    this.userForm.value['password'] = '';
    this.userForm.value['role'] = '';
  }
  onCancel() {
    this.router.navigate(['']);
  }
}
