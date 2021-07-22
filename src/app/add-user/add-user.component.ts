import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {
  ConfirmedValidator,
  UserExists,
} from '../services/confirmed.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        confirm_password: ['', Validators.required],
        role: ['', Validators.required],
      },
      {
        validator: [
          ConfirmedValidator('password', 'confirm_password'),
          UserExists('username', this.users),
        ],
      }
    );
  }
  get f() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.loginService.getUsers().subscribe((users) => (this.users = users));
  }
  onSubmit() {
    for (let user of this.users) {
      if (user['username'] === this.userForm.value['username']) {
        alert('Username taken. Please try another Username');
        this.router.navigate(['/signup']);
        return;
      }
    }
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
