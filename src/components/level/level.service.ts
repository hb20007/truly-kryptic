import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeAll";
import "rxjs/add/operator/combineLatest";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as groupBy from "lodash/groupBy";
import * as mapKeys from "lodash/mapKeys";
import * as uniqBy from "lodash/uniqBy";
import { normalizeGuess } from "../../shared";

export type LevelIndices = { levelIndex: number; sublevelIndex: number };

@Injectable()
export class LevelService {

    constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) { }

    get userId() {
        return this.angularFireAuth.auth.currentUser.uid.toString();
    }

    userLevelPath({ levelIndex, sublevelIndex }: LevelIndices) {
        return [this.userId, levelIndex, sublevelIndex].join('/');
    }

    prevSublevelInd(levels: Level[][], { levelIndex, sublevelIndex }: LevelIndices) {
        let prevLevelIndex = sublevelIndex == 0 ? levelIndex - 1 : levelIndex;
        if (prevLevelIndex < 0) {
            return undefined;
        } else {
            let prevSublevelIndex = sublevelIndex == 0 ? levels[prevLevelIndex].length - 1 : sublevelIndex - 1;
            return { levelIndex: prevLevelIndex, sublevelIndex: prevSublevelIndex };
        }
    }

    nextSublevelInd(levels: Level[][], { levelIndex, sublevelIndex }: LevelIndices) {
        let maxSublevel = levels[levelIndex].length - 1;
        let nextLevelIndex = sublevelIndex == maxSublevel ? levelIndex + 1 : levelIndex;
        if (nextLevelIndex > levels.length - 1) {
            return undefined;
        } else {
            let nextSublevelIndex = sublevelIndex == maxSublevel ? 0 : sublevelIndex + 1;
            return { levelIndex: nextLevelIndex, sublevelIndex: nextSublevelIndex };
        }
    }

    levelGuesses(indices: Observable<LevelIndices>): Observable<Guess[]> {
        return indices
            .map(indices => this.db.object(this.userLevelPath(indices) + '/guesses')
                .map(guesses => {
                    return Object.keys(guesses.$value)
                        .map(guess => {
                            let unlockedByGuess = guesses.$value[guess];
                            let isAnswer = unlockedByGuess === true;
                            let unlocksHint = typeof unlockedByGuess === 'object' ? unlockedByGuess : undefined;

                            return { value: guess, isAnswer, unlocksHint };
                        });
                })).mergeAll();
    }

    levelHints(levels: Level[][], indices: Observable<LevelIndices>) {
        return indices.combineLatest(this.levelGuesses(indices))
            .map(([indices, guesses]) => {
                let defaultHints = levels[indices.levelIndex][indices.sublevelIndex].hints;

                let uniqueWithHints = uniqBy(guesses.filter(g => g.unlocksHint !== undefined), g => normalizeGuess(g.value));

                let guessesByHintValue = groupBy(uniqueWithHints, g => JSON.stringify(g.unlocksHint));
                let unlockedHints = Object.keys(guessesByHintValue).map(hint => ({
                    ...JSON.parse(hint),
                    triggers: guessesByHintValue[hint].map(g => g.value),
                }));

                return defaultHints.concat(unlockedHints);
            });
    }

    levelAnswer(indices: Observable<LevelIndices>) {
        return indices
            .map(indices => this.db.object(this.userLevelPath(indices) + '/answer')
                .map(answer => answer.$value)).mergeAll();
    }
}