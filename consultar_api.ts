import axios from "axios";
let t0 = performance.now();
consultarApi();

async function consultarApi() {
    const characters = axios.get("https://rickandmortyapi.com/api/character");
    const episodes = axios.get("https://rickandmortyapi.com/api/episode");
    const locations = axios.get("https://rickandmortyapi.com/api/location");

    const resultados: any[] = [];
    let locCounter = 0;
    let epiCounter = 0;
    let charCounter = 0;
    Promise.all([characters, episodes, locations]).then((values) => {
        values.forEach((value) => {
            for (let i = 1; i <= value.data.info.pages; i++) {
                resultados.push(axios.get(`${value.config.url}?page=${i}`));
            }
        });
        Promise.all(resultados).then((values) => {
            values.forEach((value) => {
                value.data.results.forEach((item: any) => {
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
            console.log("tiempo " + ((t1 - t0)/1000) + " milliseconds.");
        });
    });
}

function countChars(str: string, char: string) {
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
