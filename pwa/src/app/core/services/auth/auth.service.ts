import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private af: AngularFireAuth,
              private authService: AuthService) {
  }

  createUser(email: string, pass: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, pass);
  }

  login(email: string, pass: string) {
    return this.af.auth.signInWithEmailAndPassword(email, pass);
  }

  // Sign in with Google
  GoogleAuth() {
    return this.loginWithSocialNetworks(new auth.GoogleAuthProvider());
  }

  loginWithSocialNetworks(provider) {
    return this.af.auth.signInWithPopup(provider);
  }

  logout() {
    return this.af.auth.signOut();
  }

  logedUser() {
    return this.af.authState;
  }

  logedUidUser() {
    return this.authService.logedUser().pipe(map(user => {
      if (user) {
        return user.uid;
      } else {
        return null;
      }
    }));
  }
}
