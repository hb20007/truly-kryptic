declare const NODE_ENV;
declare const FIREBASE_PROJECT;

declare module "*.html";
declare module "*.scss";
declare module "*.json";

declare interface Level {
    title: String;
    hints: Array<Hint>;
    answers: Array<string>;
}

declare interface HofUser {
    nickname: String;
    datetime: Date;
    comment: String;
}

declare interface Guess {
    value: String,
    isAnswer: boolean,
    unlocksHint: Hint,
}

declare interface LevelSummary {
    levelNumber: String,
    title: String,
    solvedTotal: Number,
    solvedCurrentUser: boolean,
    levelIndex: Number,
    sublevelIndex: Number,
}

declare type Hint = ({ image: String } | { text: String } | { audio: String }) & { triggers?: string[] };