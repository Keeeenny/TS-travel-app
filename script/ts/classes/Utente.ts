import { IUtente } from "../interfaces";
import { Mezzo } from "./Mezzo";
import { attualmente } from "../models";

export class Utente implements IUtente {
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
      console.log(
        "Prenotazione rifiutata, terminare prima l'utilizzo dell'attuale mezzo in uso."
      );
      return;
    } else if (mezzo.stato == attualmente.occupato) {
      console.log("Il mezzo è occupato.");
      return;
    }
    //Se non è occupato lo prenota
    this.mezzoInUso = mezzo;
    mezzo.assegnaUtente(this);
    console.log("Il mezzo è stato prenotato.");
  }

  //Per terminare l'utilizzo di un mezzo
  terminaUtilizzo(): void {
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
