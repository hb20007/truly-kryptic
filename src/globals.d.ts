declare const NODE_ENV;

declare module "*.html";
declare module "*.scss";
declare module "*.json";

declare interface Level {
    title: String;
    hints: Array<Hint>;
    answers: Array<string>;
}

declare type Hint = ({ image: String } | { text: String } | { audio: String }) & { triggers: string[] };