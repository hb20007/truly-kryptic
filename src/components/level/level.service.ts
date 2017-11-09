import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as groupBy from "lodash/groupBy";
import * as mapKeys from "lodash/mapKeys";
import * as uniqBy from "lodash/uniqBy";
import * as flatten from "lodash/flatten";
import * as getProp from "lodash/get";
import { normalizeGuess, getLevelNumber } from "../../shared";

@Injectable()
export class LevelService {

    constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) { }

    get userId() {
        return this.angularFireAuth.auth.currentUser &&
            this.angularFireAuth.auth.currentUser.uid.toString();
    }

    userLevelPath({ levelIndex, sublevelIndex }: LevelIndices) {
        return ['users', this.userId, levelIndex, sublevelIndex].join('/');
    }

    sharedLevelPath({ levelIndex, sublevelIndex }: LevelIndices) {
        return ['levels', levelIndex, sublevelIndex].join('/');
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
        return this.db.list('/levels').combineLatest(this.db.list(`users/${this.userId}`))
            .map(([levels, userLevels]) => {
                let prevSolved = true;

                return flatten(levels
                    .map((sublevels, levelIndex) => sublevels
                        .map((sublevel, sublevelIndex) => {
                            let solved = !!getProp(userLevels, [levelIndex, sublevelIndex, 'answer']);
                            let level = {
                                levelNumber: getLevelNumber(levelIndex, sublevelIndex, sublevels.length),
                                title: sublevel.title,
                                solvedTotal: sublevel.timesCompleted || 0,
                                solvedCurrentUser: solved,
                                unlocked: prevSolved,
                                levelIndex,
                                sublevelIndex,
                            };
                            prevSolved = solved;

                            return level;
                        })))
            });
    }

    // index of the highest level that the user has not compelted yet
    currentLevelInd() {
        return this.levelSummaries().map(summaries => {
            let firstLevelInd = { levelIndex: 0, sublevelIndex: 0 };

            // find the last completed level
            let revSummaryIndex = summaries.concat([]).reverse().findIndex(summary => summary.solvedCurrentUser);

            if (revSummaryIndex == -1) {
                // no levels completed
                return firstLevelInd;
            } else {
                // reverse order of levels again
                let summaryIndex = summaries.length - 1 - revSummaryIndex;

                let summary = summaries[Math.min(summaryIndex + 1, summaries.length - 1)];
                return { levelIndex: summary.levelIndex, sublevelIndex: summary.sublevelIndex };
            }
        });
    }

    currentLevelLink() {
        return this.currentLevelInd().map(({ levelIndex, sublevelIndex }) => {
            return `/level/${levelIndex}/${sublevelIndex}`;
        });
    }

    basicLevelInfo(indices: Observable<LevelIndices>): Observable<BasicLevelInfo> {
        return indices.combineLatest(this.levelSummaries()).map(([indices, summaries]) => {
            let summary = summaries.find(s =>
                s.levelIndex == indices.levelIndex && s.sublevelIndex == indices.sublevelIndex);

            return { title: summary.title, levelNumber: summary.levelNumber };
        });
    }

    incrementLevelTimesSolved(indices: LevelIndices) {
        let timesCompleted = this.db.object(this.sharedLevelPath(indices) + '/timesCompleted');
        return timesCompleted.first().subscribe(num => {
            timesCompleted.set((num.$value || 0) + 1);
        });
    }

    submitAnswer(guess, indices: Observable<LevelIndices>): Promise<true | Object | null> {
        let trimmedGuess = guess.replace(/[.,\/#!$%\^&\*\"\';:{}=\-_`~()“”‘’]/g, "");
        trimmedGuess = trimmedGuess.replace(/\s+/g, '');
        trimmedGuess = trimmedGuess.toLowerCase();
        if (!trimmedGuess) {
            return Promise.resolve(undefined);
        } else {
            return indices.first().toPromise().then((indices) => {
                let path = `level-secrets/${indices.levelIndex}-${indices.sublevelIndex}-${trimmedGuess}`;
                return this.db.object(path).$ref.once('value')
                    .then(v => v.val())
                    .then(v => {
                        let isAnswer = v === true;
                        let unlocksHint = typeof v === 'object' ? v : false;

                        return Promise.all([
                            this.db.list(this.userLevelPath(indices) + '/guesses')
                                .push({ value: guess, isAnswer, unlocksHint }),
                            isAnswer && this.db.object(this.userLevelPath(indices) + '/answer').set(trimmedGuess),
                            isAnswer && this.incrementLevelTimesSolved(indices),
                        ]).then(() => v);
                    });
            });
        }
    }

    hofEntry() {
        return this.db.object('hall-of-fame/' + this.userId);
    }

    currentDbTime() {
        return this.db.database.ref('/.info/serverTimeOffset')
            .once('value')
            .then(data => data.val() + Date.now());
    }

    submitHofInfo(nickname: String, comment: String) {
        return this.levelSummaries().first().toPromise().then((levels) => {
            let lastLevel = levels[levels.length - 1];

            return this.currentDbTime().then(time => {
                return this.hofEntry().set({
                    nickname,
                    comment,
                    datetime: time,
                    'last-level-index': lastLevel.levelIndex,
                    'last-sublevel-index': lastLevel.sublevelIndex,
                });
            });
        });
    }
}