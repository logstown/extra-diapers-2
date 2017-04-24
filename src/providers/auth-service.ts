import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {
    private authState: FirebaseAuthState;

    constructor(public auth$: AngularFireAuth, private af: AngularFire) {
        // this.authState = auth$.getAuth();
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    signInWithFacebook(): firebase.Promise < FirebaseAuthState > {
        return this.auth$.login({
                provider: AuthProviders.Facebook,
                method: AuthMethods.Popup
            })
            .then((facebookData) => {
                this.af.database.list('users')
                    .update(facebookData.auth.uid, {
                        name: facebookData.auth.displayName,
                        email: facebookData.auth.email,
                        provider: 'facebook',
                        image: facebookData.auth.photoURL
                    });
            }).catch((error) => {
                console.info("error", error);
            });
    }

    signOut(): void {
        this.auth$.logout();
    }

    displayName(): string {
        if (this.authState != null) {
            return this.authState.facebook.displayName;
        } else {
            return '';
        }
    }

    getUid(): string {
        console.log(this.authState)
        return this.authState.uid;
    }
}
