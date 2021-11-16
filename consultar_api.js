"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let t0 = performance.now();
consultarApi();
async function consultarApi() {
    const characters = axios_1.default.get("https://rickandmortyapi.com/api/character");
    const episodes = axios_1.default.get("https://rickandmortyapi.com/api/episode");
    const locations = axios_1.default.get("https://rickandmortyapi.com/api/location");
    const resultados = [];
    let locCounter = 0;
    let epiCounter = 0;
    let charCounter = 0;
    Promise.all([characters, episodes, locations]).then((values) => {
        values.forEach((value) => {
            for (let i = 1; i <= value.data.info.pages; i++) {
                resultados.push(axios_1.default.get(`${value.config.url}?page=${i}`));
            }
        });
        Promise.all(resultados).then((values) => {
            values.forEach((value) => {
                value.data.results.forEach((item) => {
                    if (item.url.startsWith("https://rickandmortyapi.com/api/episode")) {
                        epiCounter += countChars(item.name, "e");
                    }
                    if (item.url.startsWith("https://rickandmortyapi.com/api/location")) {
                        locCounter += countChars(item.name, "l");
                    }
                    if (item.url.startsWith("https://rickandmortyapi.com/api/character")) {
                        charCounter += countChars(item.name, "c");
                    }
                });
            });
            console.log(`Episodios: ${epiCounter}`);
            console.log(`Lugares: ${locCounter}`);
            console.log(`Personajes: ${charCounter}`);
            let t1 = performance.now();
            console.log("tiempo " + ((t1 - t0) / 1000) + " milliseconds.");
        });
    });
}
function countChars(str, char) {
    let count = 0;
    str = str.toLowerCase();
    char = char.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === char) {
            count++;
        }
    }
    return count;
}
