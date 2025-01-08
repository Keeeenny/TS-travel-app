import { attualmente } from "../models.js";
export class Utente {
    nome;
    cognome;
    email;
    metodoPagamento;
    mezzoInUso;
    constructor(nome, cognome, email, metodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
        this.mezzoInUso = null;
    }
    prenotaMezzo(mezzo) {
        // Ferma la prenotazione se si sta già utilizzando un altro mezzo o è occupato
        if (this.mezzoInUso) {
            console.log("Prenotazione rifiutata, terminare prima l'utilizzo dell'attuale mezzo in uso.");
            return;
        }
        else if (mezzo.stato == attualmente.occupato) {
            console.log("Il mezzo è occupato.");
            return;
        }
        //Se non è occupato lo prenota
        this.mezzoInUso = mezzo;
        mezzo.assegnaUtente(this);
        console.log("Il mezzo è stato prenotato.");
    }
    //Per terminare l'utilizzo di un mezzo
    terminaUtilizzo() {
        //Controlla se si hanno mezzi in uso
        if (!this.mezzoInUso) {
            console.log("Non hai mezzi in uso.");
            return;
        }
        //Se si ha un mezzo in uso lo libera
        this.mezzoInUso.liberaMezzo();
        this.mezzoInUso = null;
        console.log("Utilizzo terminato.");
    }
}
