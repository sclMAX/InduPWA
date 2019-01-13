import { UserInterface } from './../../models/User';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { reject } from 'q';
import { throws } from 'assert';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: Observable<UserInterface>;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.pipe(switchMap(cred => {
      if (cred) {
        return this.getUser(cred.uid);
      } else {
        return of(null);
      }
    }));
  }

  get user(): Observable<UserInterface> { return this.currentUser; }

  set user(user: Observable<UserInterface>) { this.currentUser = user; }

  login(email: string, password: string): Promise<UserInterface | void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((cred) => this.getUser(cred.user.uid).pipe(take(1),map(user=>{      
      if(!user){
        throw ('not user!');
      }
      return user;
    })).toPromise());
  }

  updateUser(user: UserInterface) {
    const ref: AngularFirestoreDocument<UserInterface> =
      this.afs.doc<UserInterface>(`users/${user.uid}`);
    return ref.set(user, { merge: true });
  }

  private getUser(uid: string): Observable<UserInterface> {
    this.user = this.afs.doc<UserInterface>(`users/${uid}`).valueChanges();
    return this.user;
  }
}
