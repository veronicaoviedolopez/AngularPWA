import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.GoogleAuth().then(resp => {
      if (resp.additionalUserInfo.isNewUser) {
        const user: User = {
          uid: resp.user.uid,
          displayName: resp.user.displayName,
          email: resp.user.email
        };
        this.userService.setUser(user).then(() => {
          this.router.navigate(['/home']);
        });
      }
      this.router.navigate(['/home']);
    });
  }

  logOut() {
    this.authService.logout().then(() => console.log('deslogueado'));
  }

}
