import { stato, tipoMezzo } from "./models.js";

//Interfacce
export interface IMezzo {
    id: number;
    tipo: tipoMezzo;
    stato: stato;
  
    //Metodo per assegnare un mezzo a un utente specifico
    assegnaUtente(utente: IUtente): void;
  }
  
  export interface IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;
  
    //Metodo per prenotare un mezzo
    prenotaMezzo(mezzo: IMezzo): void;
  }
  
  export interface ICitta {
    citta: string;
    mezziDisponibili: IMezzo[];
  
    //Aggiunge un mezzo all'elenco di mezzi disponibili
    aggiungiMezzo(mezzo: IMezzo): void;
  }
  