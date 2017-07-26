export class Bet {
  match: any;
  winnerCode: string;
  amount: number;
  time: number;

  constructor(_match, _winnerCode, _amount) {
    this.match = _match;
    this.winnerCode = _winnerCode;
    this.amount = _amount;
    this.time = new Date().getTime();
  }

  toJson() {
    let json = {
      match: this.match,
      winnerCode: this.winnerCode,
      amount: this.amount,
      time: this.time
    };
    return JSON.stringify(json);
  }
}
