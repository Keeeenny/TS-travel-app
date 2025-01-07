"use strict";
const log = console.log;
//Enum
var mezzi;
(function (mezzi) {
    mezzi["bici"] = "bici";
    mezzi["scooter"] = "scooter";
    mezzi["monopattino"] = "monopattino";
})(mezzi || (mezzi = {}));
var attualmente;
(function (attualmente) {
    attualmente["disponibile"] = "disponibile";
    attualmente["occupato"] = "in uso";
})(attualmente || (attualmente = {}));
//Classi
class Mezzo {
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
Mezzo.counter = 1;
class Utente {
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
            console.log("Prenotazine rifiutata, terminare prima l'utilizzo dell'attuale mezzo in uso.");
            return;
        }
        else if (mezzo.stato == attualmente.occupato) {
            console.log("Il mezzo è occupato.");
            return;
        }
        //Se non è occupato lo prenota
        this.mezzoInUso = mezzo;
        mezzo.assegnaUtente(this);
        log("Il mezzo è stato prenotato.");
    }
    //Per terminare l'utilizzo di un mezzo
    terminaUtilizzo() {
        //Controlla se si hanno mezzi in uso
        if (!this.mezzoInUso) {
            log("Non hai mezzi in uso.");
            return;
        }
        //Se si ha un mezzo in uso lo libera
        this.mezzoInUso.liberaMezzo();
        this.mezzoInUso = null;
        log("Utilizzo terminato.");
    }
}
class Citta {
    constructor(citta) {
        this.citta = citta;
        this.mezziDisponibili = [];
    }
    aggiungiMezzo(mezzo) {
        this.mezziDisponibili.push(mezzo);
        log("Il mezzo è stato aggiunto.");
    }
    mostraMezzi() {
        log(this.mezziDisponibili);
    }
    //Mostra i mezzi non occupati
    mostraMezziDisponibili() {
        const mezzi = this.mezziDisponibili.filter((mezzo) => mezzo.stato == attualmente.disponibile);
        console.log(mezzi);
    }
}
// Creazione di vari mezzi
const bici = new Mezzo(mezzi.bici);
const bici2 = new Mezzo(mezzi.bici);
const monopattino = new Mezzo(mezzi.monopattino);
const scooter = new Mezzo(mezzi.scooter);
// Creazione di utenti
const user1 = new Utente("Marco", "Verdi", "marco@yahoo.it", "postepay");
const user2 = new Utente("Alessandro", "Blu", "Sadaru@yahoo.it", "Bonifico");
const user3 = new Utente("Sara", "Rosso", "Sadaru@yahoo.it", "QR");
// Istanziamento di città 
const milano = new Citta("Milano");
const roma = new Citta("Roma");
// Aggiunta di mezzi all'elenco di mezzi disponibili
milano.aggiungiMezzo(bici);
roma.aggiungiMezzo(bici2);
milano.aggiungiMezzo(monopattino);
milano.aggiungiMezzo(scooter);
// Prenotazione di un mezzo
user1.prenotaMezzo(bici);
user1.prenotaMezzo(scooter);
// Prenotazione di un mezzo già occupato
user2.prenotaMezzo(bici);
// Termina utilizzo
user1.terminaUtilizzo();
// Altre prove di prenotazioni
user1.prenotaMezzo(scooter);
user2.prenotaMezzo(bici2);
user3.prenotaMezzo(monopattino);
// Mostra tutti i mezzi
milano.mostraMezzi();
// Mostra solo i mezzi disponibili
milano.mostraMezziDisponibili();
