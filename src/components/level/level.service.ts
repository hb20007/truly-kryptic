import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

export type LevelIndices = { levelIndex: number; sublevelIndex: number };

@Injectable()
export class LevelService {

    constructor() {

    }

    prevSublevel(levels: Level[][], { levelIndex, sublevelIndex }: LevelIndices) {
        let prevLevelIndex = sublevelIndex == 0 ? levelIndex - 1 : levelIndex;
        if (prevLevelIndex < 0) {
            return undefined;
        } else {
            let prevSublevelIndex = sublevelIndex == 0 ? levels[prevLevelIndex].length - 1 : sublevelIndex - 1;
            return { levelIndex: prevLevelIndex, sublevelIndex: prevSublevelIndex };
        }
    }

    nextSublevel(levels: Level[][], { levelIndex, sublevelIndex }: LevelIndices) {
        let maxSublevel = levels[levelIndex].length - 1;
        let nextLevelIndex = sublevelIndex == maxSublevel ? levelIndex + 1 : levelIndex;
        if (nextLevelIndex < 0) {
            return undefined;
        } else {
            let nextSublevelIndex = sublevelIndex == maxSublevel ? 0 : sublevelIndex + 1;
            return { levelIndex: nextLevelIndex, sublevelIndex: nextSublevelIndex };
        }
    }

    levelHints(indices: Observable<LevelIndices>) {
        // return Observable.of([]);
    }

    levelGuesses(indices: Observable<LevelIndices>) {

    }
}

// export class LevelComponent implements OnInit {
//     nextLevelIndices: Observable<LevelIndices>;
//     prevLevelIndices: Observable<LevelIndices>;

//     canGotoNextLevel: boolean;

//     imgHintDir = '/img/hints/';
//     fields = { answer: '' };

//     prevLevelLink: Observable<string | undefined>;
//     nextLevelLink: Observable<string | undefined>;

//     openPrevLevel: Function;
//     openNextLevel: Function;

//     level: Observable<Level>;
//     levelNumber: Observable<String>;

//     guesses: FirebaseListObservable<string[]>;
//     uniqueGuesses: Observable<string[]>;
//     levelAnswers: string[];

//     nextLevelUnlocked: FirebaseObjectObservable<boolean>;

//     hints: Observable<Hint[]>;

//     answeredWrong: boolean;

//     levelIndices: Observable<{ levelIndex: number, sublevelIndex: number }>

//     constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
//         private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) { }

//     onKey(keyCode) {
//         if (keyCode == '37') {
//             this.openPrevLevel && this.openPrevLevel();
//         } else if (keyCode == '39') {
//             this.canGotoNextLevel && this.openNextLevel();
//         }
//     }

//     submitAnswer() {
//         this.answeredWrong = false;

//         const guess = this.fields.answer.trim();
//         if (guess) {
//             this.guesses.push(guess);
//         }

//         const correct = this.levelAnswers.find(levelAnswer => this.fmtGuessOrAnswer(guess) == this.fmtGuessOrAnswer(levelAnswer));

//         if (correct) {
//             if (this.openNextLevel) {
//                 // this.fields.answer = "";
//                 // this.openNextLevel();
//                 this.nextLevelUnlocked.set(true);

//             } else {
//                 // todo, go to hall of fame form
//             }
//         } else {
//             this.answeredWrong = true;
//         }
//     }

//     fmtGuessOrAnswer(text) {
//         return (text || "").replace(/[^A-Za-z0-9]/g, '').toLocaleLowerCase();
//     }

//     getBackgroundUrl(image) {
//         return this.sanitizer.bypassSecurityTrustStyle(`url("${this.imgHintDir + image}")`);
//     }

//     ngOnInit() {
//         this.levelIndices = this.route.paramMap.map(params => ({
//             levelIndex: Number(params.get('level_id')),
//             sublevelIndex: Number(params.get('sublevel_id')),
//         }));

//         this.level = this.levelIndices.map(({ levelIndex, sublevelIndex }) => levels[levelIndex][sublevelIndex]);

//         this.levelNumber = this.levelIndices.map(({ levelIndex, sublevelIndex }) =>
//             getLevelNumber(levelIndex, sublevelIndex, levels[levelIndex].length));

//         this.prevLevelIndices = this.levelIndices.map(({ levelIndex, sublevelIndex }) => {
//             let prevLevelIndex = sublevelIndex == 0 ? levelIndex - 1 : levelIndex;
//             if (prevLevelIndex < 0) {
//                 return undefined;
//             } else {
//                 let prevSublevelIndex = sublevelIndex == 0 ? levels[prevLevelIndex].length - 1 : sublevelIndex - 1;
//                 return { levelIndex: prevLevelIndex, sublevelIndex: prevSublevelIndex };
//             }
//         });
//         this.prevLevelLink = this.prevLevelIndices.map(indices => indices && `/level/${indices.levelIndex}/${indices.sublevelIndex}`);

//         this.nextLevelIndices = this.levelIndices.map(({ levelIndex, sublevelIndex }) => {
//             let maxSublevel = levels[levelIndex].length - 1;
//             let nextLevelIndex = sublevelIndex == maxSublevel ? levelIndex + 1 : levelIndex;
//             if (nextLevelIndex < 0) {
//                 return undefined;
//             } else {
//                 let nextSublevelIndex = sublevelIndex == maxSublevel ? 0 : sublevelIndex + 1;
//                 return { levelIndex: nextLevelIndex, sublevelIndex: nextSublevelIndex };
//             }
//         });
//         this.nextLevelIndices.subscribe(({ levelIndex, sublevelIndex }) => {
//             this.nextLevelUnlocked =
//                 this.db.object([this.angularFireAuth.auth.currentUser.uid.toString(), levelIndex, sublevelIndex, 'unlocked'].join('/'));

//             this.nextLevelUnlocked.subscribe((unlocked: any) => {
//                 this.canGotoNextLevel = unlocked.$value == true;
//             });
//         });

//         this.nextLevelLink = this.nextLevelIndices.map(indices => indices && `/level/${indices.levelIndex}/${indices.sublevelIndex}`);

//         this.nextLevelLink.subscribe(url => this.openNextLevel = url && (() => this.router.navigateByUrl(url)));
//         this.prevLevelLink.subscribe(url => this.openPrevLevel = url && (() => this.router.navigateByUrl(url)));

//         this.levelIndices.subscribe(({ levelIndex, sublevelIndex }) => {
//             const levelDbPath = [this.angularFireAuth.auth.currentUser.uid.toString(), levelIndex, sublevelIndex].join('/');
//             this.guesses = this.db.list(levelDbPath + '/guesses');

//             this.uniqueGuesses = this.guesses.map(guesses => guesses.map(g => g.$value.trim()).reduce((guesses, guess) => {
//                 if (guesses.indexOf(guess) === -1) {
//                     guesses.push(guess);
//                 }
//                 return guesses;
//             }, []));

//             this.hints = this.uniqueGuesses.combineLatest(this.level).map(([guesses, level]) => {
//                 return level.hints.map(hint => {
//                     const activeTriggers = (hint.triggers || [])
//                         .map(tr =>
//                             guesses.find(guess => this.fmtGuessOrAnswer(guess) == this.fmtGuessOrAnswer(tr)))
//                         .filter(Boolean);

//                     if (!hint.triggers || activeTriggers.length > 0) {
//                         return { ...hint, triggers: activeTriggers };
//                     }
//                 }).filter(Boolean)
//             });
//         });

//         this.level.subscribe(level => this.levelAnswers = level.answers);
//     }
// }