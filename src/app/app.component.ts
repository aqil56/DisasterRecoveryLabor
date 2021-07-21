import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public loginService: LoginService, private router: Router) {}

  title = 'Disaster-recovery';
  logout(){
    this.loginService.setUser('');
    this.loginService.setRole('');
    this.router.navigate(['']);
  }
  // user = this.loginService.getUser();

  // ngOnInit(): void {
  //   this.user = this.loginService.getUser();
  //   this.isAdmin = this.loginService.isAdmin();
  // }
}
