import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User = { uid: null, displayName: '', email: '' };
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}
  logOut() {
    this.authService.logout().then(() => this.router.navigate(['/auth/login']));
  }
  ngOnInit() {
    this.authService.logedUser().subscribe(resp => {
      console.log(resp);
      if (resp === null) {
        this.router.navigate(['auth/login']);
      } else {
        this.user = {
          uid: resp.uid,
          displayName: resp.displayName,
          email: resp.email
        };
      }
    });
  }
}
