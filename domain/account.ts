// 1. Branded Types
export type AccountId = string & { readonly __brand: "AccountId" };
export type MoneyAmount = number & { readonly __brand: "MoneyAmount" };

// 2. Factory Functions (Smart Constructors)
export function createAccountId(id: string): AccountId {
  if (!id) throw new Error("Account ID cannot be empty.");
  return id as AccountId;
}

export function createMoneyAmount(amount: number): MoneyAmount {
  if (amount < 0) throw new Error("Money amount cannot be negative.");
  return amount as MoneyAmount;
}

// 3. Events & Observers
export type AccountEvent = {
  type: "WithdrawalMade";
  accountId: AccountId;
  amountWithdrawn: MoneyAmount;
  remainingBalance: MoneyAmount;
};

export type Observer = (event: AccountEvent) => void;

// 4. The Entity Class
export class Account {
  private observers: Observer[] = [];

  constructor(public id: AccountId, public balance: MoneyAmount) {}

  subscribe(callback: Observer): void {
    this.observers.push(callback);
  }

  private notify(event: AccountEvent): void {
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