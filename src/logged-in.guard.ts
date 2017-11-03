import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.angularFireAuth.authState.first().toPromise().then(user => {
            if (user) {
                return true;
            } else {
                this.router.navigateByUrl('/');
            }
        });
    }
}