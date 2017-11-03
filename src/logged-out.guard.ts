import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { LevelService } from "./components/level/level.service";

@Injectable()
export class LoggedOutGuard implements CanActivate {
    constructor(private router: Router, private angularFireAuth: AngularFireAuth, private levelService: LevelService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.angularFireAuth.authState.first().toPromise().then(user => {
            if (user) {
                return this.levelService.currentLevelLink().first().toPromise().then(url => {
                    this.router.navigateByUrl(url);
                    return false;
                });
            } else {
                return true;
            }
        });
    }
}