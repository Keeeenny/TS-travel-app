import { IMezzo,ICitta } from "../interfaces";
import { attualmente } from "../models";

export class Citta implements ICitta {
  citta: string;
  mezziDisponibili: IMezzo[];

  constructor(citta: string) {
    this.citta = citta;
    this.mezziDisponibili = [];
  }

  aggiungiMezzo(mezzo: IMezzo): void {
    this.mezziDisponibili.push(mezzo);
    console.log("Il mezzo è stato aggiunto.");
  }

  mostraMezzi(): void {
    console.log(this.mezziDisponibili);
  }

  //Mostra i mezzi non occupati
  mostraMezziDisponibili(): void {
    const mezzi: IMezzo[] = this.mezziDisponibili.filter(
      (mezzo) => mezzo.stato == attualmente.disponibile
    );

    console.log(mezzi);
  }
}