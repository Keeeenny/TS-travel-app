const log = console.log;

//Enum
enum mezzi {
  bici = "bici",
  scooter = "scooter",
  monopattino = "monopattino",
}

enum attualmente {
  disponibile = "disponibile",
  occupato = "in uso",
}

//Tipi personalizzati
type tipoMezzo = mezzi.bici | mezzi.scooter | mezzi.monopattino;
type stato = attualmente.disponibile | attualmente.occupato;

//Interfacce
interface IMezzo {
  id: number;
  tipo: tipoMezzo;
  stato: stato;

  //Metodo per assegnare un mezzo a un utente specifico
  assegnaUtente(utente: IUtente): void;
}

interface IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;

  //Metodo per prenotare un mezzo
  prenotaMezzo(mezzo: IMezzo): void;
}

interface ICitta {
  citta: string;
  mezziDisponibili: IMezzo[];

  //Aggiunge un mezzo all'elenco di mezzi disponibili
  aggiungiMezzo(mezzo: IMezzo): void;
}

//Classi
class Mezzo implements IMezzo {
  private static counter: number = 1;
  id;
  tipo;
  stato: stato;
  utilizzatoreAttuale: string;

  constructor(tipo: tipoMezzo) {
    this.id = Mezzo.counter++;
    this.tipo = tipo;
    this.stato = attualmente.disponibile;
    this.utilizzatoreAttuale = "";
  }

  //Associa un mezzo a un utente e mette lo stato in uso
  assegnaUtente(utente: IUtente): void {
    this.stato = attualmente.occupato;
    this.utilizzatoreAttuale = `${utente.nome} ${utente.cognome}`;
  }

  //Libera il mezzo alla fine dell'uso
  liberaMezzo(): void {
    this.stato = attualmente.disponibile;
    this.utilizzatoreAttuale = "";
  }
}

class Utente implements IUtente {
  nome;
  cognome;
  email;
  metodoPagamento;
  mezzoInUso: Mezzo | null;

  constructor(
    nome: string,
    cognome: string,
    email: string,
    metodoPagamento: string
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamento = metodoPagamento;
    this.mezzoInUso = null;
  }

  prenotaMezzo(mezzo: Mezzo): void {
    // Ferma la prenotazione se si sta già utilizzando un altro mezzo o è occupato
    if (this.mezzoInUso) {
      console.log("Prenotazine rifiutata, terminare prima l'utilizzo dell'attuale mezzo in uso.");
      return;
    } else if (mezzo.stato == attualmente.occupato) {
      console.log("Il mezzo è occupato.");
      return;
    }
    //Se non è occupato lo prenota
    this.mezzoInUso = mezzo;
    mezzo.assegnaUtente(this);
    log("Il mezzo è stato prenotato.");
  }

  //Per terminare l'utilizzo di un mezzo
  terminaUtilizzo(): void {
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

class Citta implements ICitta {
  citta: string;
  mezziDisponibili: Mezzo[];

  constructor(citta: string) {
    this.citta = citta;
    this.mezziDisponibili = [];
  }

  aggiungiMezzo(mezzo: Mezzo): void {
    this.mezziDisponibili.push(mezzo);
    log("Il mezzo è stato aggiunto.");
  }

  mostraMezzi(): void {
    log(this.mezziDisponibili);
  }

  //Mostra i mezzi non occupati
  mostraMezziDisponibili(): void {
    const mezzi: IMezzo[] = this.mezziDisponibili.filter(
      (mezzo) => mezzo.stato == attualmente.disponibile
    );

    console.log(mezzi);
  }
}

// Creazione di vari mezzi
const bici: Mezzo = new Mezzo(mezzi.bici);
const bici2: Mezzo = new Mezzo(mezzi.bici);
const monopattino: Mezzo = new Mezzo(mezzi.monopattino);
const scooter: Mezzo = new Mezzo(mezzi.scooter);


// Creazione di utenti
const user1: Utente = new Utente(
  "Marco",
  "Verdi",
  "marco@yahoo.it",
  "postepay"
);
const user2: Utente = new Utente(
  "Alessandro", 
  "Blu", 
  "Sadaru@yahoo.it",
  "Bonifico"
);
const user3: Utente = new Utente(
  "Sara", 
  "Rosso", 
  "Sadaru@yahoo.it", 
  "QR"
);

// Istanziamento di città 
const milano: Citta = new Citta("Milano");
const roma: Citta = new Citta("Roma");

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
user1.prenotaMezzo(scooter)
user2.prenotaMezzo(bici2);
user3.prenotaMezzo(monopattino);

// Mostra tutti i mezzi
milano.mostraMezzi();
// Mostra solo i mezzi disponibili
milano.mostraMezziDisponibili();