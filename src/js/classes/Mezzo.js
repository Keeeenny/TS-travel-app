import { attualmente } from "../models.js";
export class Mezzo {
    static counter = 1;
    id;
    tipo;
    stato;
    utilizzatoreAttuale;
    constructor(tipo) {
        this.id = Mezzo.counter++;
        this.tipo = tipo;
        this.stato = attualmente.disponibile;
        this.utilizzatoreAttuale = "";
    }
    //Associa un mezzo a un utente e mette lo stato in uso
    assegnaUtente(utente) {
        this.stato = attualmente.occupato;
        this.utilizzatoreAttuale = `${utente.nome} ${utente.cognome}`;
    }
    //Libera il mezzo alla fine dell'uso
    liberaMezzo() {
        this.stato = attualmente.disponibile;
        this.utilizzatoreAttuale = "";
    }
}
