import { Utente } from "./classes/Utente.js";
import { Citta } from "./classes/Citta.js";
import { Mezzo } from "./classes/Mezzo.js";
import { mezzi } from "./models.js";
// Creazione di vari mezzi
const bici = new Mezzo(mezzi.bici);
const bici2 = new Mezzo(mezzi.bici);
const monopattino = new Mezzo(mezzi.monopattino);
const scooter = new Mezzo(mezzi.scooter);
// Creazione di utenti
const user1 = new Utente("Marco", "Verdi", "marco@yahoo.it", "postepay");
const user2 = new Utente("Alessandro", "Blu", "alessandro@yahoo.it", "Bonifico");
const user3 = new Utente("Sara", "Rosso", "sara@yahoo.it", "QR");
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
// Prenotazione mentre si ha già un mezzo
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
