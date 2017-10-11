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
    unlocksHint: Hint | false,
}

declare interface LevelSummary {
    levelNumber: String,
    title: String,
    solvedTotal: Number,
    solvedCurrentUser: boolean,
    levelIndex: Number,
    sublevelIndex: Number,
}

declare interface BasicLevelInfo { title: String, levelNumber: String }

declare type LevelIndices = { levelIndex: number; sublevelIndex: number };

declare type Hint = ({ image: String } | { text: String } | { audio: String }) & { triggers?: string[] };