import type { AccountId, MoneyAmount } from "./types.js";

export function createAccountId(id: string): AccountId {
  if (!id) throw new Error("Account ID cannot be empty.");
  return id as AccountId;
}

export function createMoneyAmount(amount: number): MoneyAmount {
  if (amount < 0) throw new Error("Money amount cannot be negative.");
  return amount as MoneyAmount;
}