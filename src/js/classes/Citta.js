import { attualmente } from "../models.js";
export class Citta {
    citta;
    mezziDisponibili;
    constructor(citta) {
        this.citta = citta;
        this.mezziDisponibili = [];
    }
    aggiungiMezzo(mezzo) {
        this.mezziDisponibili.push(mezzo);
        console.log("Il mezzo è stato aggiunto.");
    }
    mostraMezzi() {
        console.log(this.mezziDisponibili);
    }
    //Mostra i mezzi non occupati
    mostraMezziDisponibili() {
        const mezzi = this.mezziDisponibili.filter((mezzo) => mezzo.stato == attualmente.disponibile);
        console.log(mezzi);
    }
}
