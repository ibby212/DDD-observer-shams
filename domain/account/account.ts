import type { AccountId, MoneyAmount } from "./types.js";
import { createMoneyAmount } from "./factories.js";
import type { DomainEvent } from "../events/events.js";
import type { Observer } from "../../infrastructure/observers/observer.js";

export class Account {
  private observers: Observer[] = [];

  constructor(public id: AccountId, public balance: MoneyAmount) {}

  subscribe(callback: Observer): void {
    this.observers.push(callback);
  }

  private notify(event: DomainEvent): void {
    this.observers.forEach((cb) => cb(event));
  }

  withdraw(amount: MoneyAmount): void {
    if (amount > this.balance) {
      throw new Error(`Insufficient funds. Cannot withdraw $${amount}.`);
    }

    this.balance = createMoneyAmount(this.balance - amount);

    this.notify({
      type: "WithdrawalMade",
      accountId: this.id,
      amountWithdrawn: amount,
      remainingBalance: this.balance,
    });
  }
}