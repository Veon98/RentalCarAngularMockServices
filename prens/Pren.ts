export class Pren {
  id_p!: number;
  utente!: string;
  auto!: string;
  dataI!: string;
  dataF!: string;


  constructor(utente: string, auto: string, dataI: string, dataF: string) {
    this.utente = utente;
    this.auto = auto;
    this.dataI = dataI;
    this.dataF = dataF;
  }
}
