import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging
  ) {
    // this.angularFireMessaging.messaging.subscribe(
    //   tslint:disable-next-line:variable-name
    //   _messaging => {
    //     _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //     _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //   }
    // );
  }

  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      if (!user) {
        console.log('no encontro al usuario logeado -> updateToken()');
        return;
      }
      const data = { [user.uid]: token };
      //const data = {};
      //data[user.uid] = token;
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
