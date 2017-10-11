import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/first";

export function getLevelNumber(levelIndex: number, sublevelIndex: number, totalSublevels: number) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return (levelIndex + 1) + (totalSublevels > 1 ? alphabet[sublevelIndex] : '');
}

export const normalizeGuess = guess => (guess || "").replace(/[^A-Za-z0-9]/g, '').toLocaleLowerCase();

export function isTouchDevice() {
    var el: any = document.createElement('div');
    el.setAttribute('ongesturestart', 'return;'); // or try "ontouchstart"
    return typeof el.ongesturestart === "function";
}