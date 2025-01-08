import { IMezzo, IUtente } from "../interfaces.js";
import { attualmente, stato, tipoMezzo } from "../models.js";

export class Mezzo implements IMezzo {
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
