import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as groupBy from "lodash/groupBy";
import * as mapKeys from "lodash/mapKeys";
import * as uniqBy from "lodash/uniqBy";
import * as flatten from "lodash/flatten";
import { normalizeGuess, getLevelNumber } from "../../shared";

@Injectable()
export class LevelService {

    constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) { }

    get userId() {
        return this.angularFireAuth.auth.currentUser.uid.toString();
    }

    userLevelPath({ levelIndex, sublevelIndex }: LevelIndices) {
        return ['users', this.userId, levelIndex, sublevelIndex].join('/');
    }

    prevSublevelInd(indices: Observable<LevelIndices>) {
        return indices.combineLatest(this.db.list('/levels')).map(([{ levelIndex, sublevelIndex }, levels]) => {
            let prevLevelIndex = sublevelIndex == 0 ? levelIndex - 1 : levelIndex;
            if (prevLevelIndex < 0) {
                return undefined;
            } else {
                let prevSublevelIndex = sublevelIndex == 0 ? levels[prevLevelIndex].length - 1 : sublevelIndex - 1;
                return { levelIndex: prevLevelIndex, sublevelIndex: prevSublevelIndex };
            }
        });
    }

    nextSublevelInd(indices: Observable<LevelIndices>) {
        return indices.combineLatest(this.db.list('/levels')).map(([{ levelIndex, sublevelIndex }, levels]) => {
            let maxSublevel = levels[levelIndex].length - 1;
            let nextLevelIndex = sublevelIndex == maxSublevel ? levelIndex + 1 : levelIndex;
            if (nextLevelIndex > levels.length - 1) {
                return undefined;
            } else {
                let nextSublevelIndex = sublevelIndex == maxSublevel ? 0 : sublevelIndex + 1;
                return { levelIndex: nextLevelIndex, sublevelIndex: nextSublevelIndex };
            }
        });
    }

    levelGuesses(indices: Observable<LevelIndices>): Observable<Guess[]> {
        return indices.mergeMap(indices =>
            this.db.list(this.userLevelPath(indices) + '/guesses')
                .map(guesses => uniqBy(guesses, g => normalizeGuess(g.value))));
    }

    levelHints(indices: Observable<LevelIndices>) {
        return indices.combineLatest(this.levelGuesses(indices), this.db.list('/levels'))
            .map(([indices, guesses, levels]) => {
                let defaultHints = levels[indices.levelIndex][indices.sublevelIndex].hints;

                let uniqueWithHints = guesses.filter(g => g.unlocksHint);

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
            .mergeMap(indices => this.db.object(this.userLevelPath(indices) + '/answer')
                .map(answer => answer.$value));
    }

    levelSummaries() {
        return this.db.list('/levels')
            .map(levels => flatten(levels
                .map((sublevels, levelIndex) => sublevels
                    .map((sublevel, sublevelIndex) => ({
                        levelNumber: getLevelNumber(levelIndex, sublevelIndex, sublevels.length),
                        title: sublevel.title,
                        solvedTotal: 0,
                        solvedCurrentUser: false,
                        levelIndex,
                        sublevelIndex,
                    })))));
    }

    basicLevelInfo(indices: Observable<LevelIndices>): Observable<BasicLevelInfo> {
        return indices.combineLatest(this.levelSummaries()).map(([indices, summaries]) => {
            let summary = summaries.find(s =>
                s.levelIndex == indices.levelIndex && s.levelIndex == indices.levelIndex);

            return { title: summary.title, levelNumber: summary.levelNumber };
        });
    }

    submitAnswer(guess, indices: Observable<LevelIndices>): Promise<true | Object | null> {
        if (!guess) {
            return Promise.resolve(undefined);
        } else {
            return indices.first().toPromise().then((indices) => {
                let path = `level-secrets/${indices.levelIndex}-${indices.sublevelIndex}-${guess}`;
                return this.db.object(path).$ref.once('value')
                    .then(v => v.val())
                    .then(v => {
                        let isAnswer = v === true;
                        let unlocksHint = typeof v === 'object' ? v : false;

                        return Promise.all([
                            this.db.list(this.userLevelPath(indices) + '/guesses')
                                .push({ value: guess, isAnswer, unlocksHint }),
                            isAnswer && this.db.object(this.userLevelPath(indices) + '/answer').set(guess),
                        ]).then(() => v);
                    });
            });
        }
    }
}