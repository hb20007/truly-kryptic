import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LevelService } from './level.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
/// Implements: #SPC-level-redirect
export class LevelGuard implements CanActivate {
    constructor(private levelService: LevelService, private router: Router, private angularFireAuth: AngularFireAuth) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let urlInd = {
            levelIndex: Number(route.paramMap.get('level_id')),
            sublevelIndex: Number(route.paramMap.get('sublevel_id')),
        };

        return this.angularFireAuth.authState.first().toPromise().then(() => {
            return this.levelService.currentLevelInd().first().toPromise().then(({ levelIndex, sublevelIndex }) => {
                if (levelIndex >= urlInd.levelIndex && sublevelIndex >= urlInd.sublevelIndex) {
                    return true;
                } else {
                    // if the user attempts to access a locked level by it's url, navigate to their current level
                    return this.levelService.currentLevelLink().first().toPromise().then(url => {
                        this.router.navigateByUrl(url);
                        return false;
                    });
                }
            });
        });
    }
}