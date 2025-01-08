//Enum
export enum mezzi {
  bici = "bici",
  scooter = "scooter",
  monopattino = "monopattino",
}

export enum attualmente {
  disponibile = "disponibile",
  occupato = "in uso",
}

//Tipi personalizzati
export type tipoMezzo = mezzi.bici | mezzi.scooter | mezzi.monopattino;
export type stato = attualmente.disponibile | attualmente.occupato;
