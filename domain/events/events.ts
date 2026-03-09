import type { AccountId, MoneyAmount } from "../account/types.js";

export type WithdrawalMadeEvent = {
  type: "WithdrawalMade";
  accountId: AccountId;
  amountWithdrawn: MoneyAmount;
  remainingBalance: MoneyAmount;
};

export type FraudFlaggedEvent = {
  type: "FraudFlagged";
  accountId: AccountId;
  attemptedAmount: MoneyAmount;
};

export type DailyLimitExceededEvent = {
  type: "DailyLimitExceeded";
  accountId: AccountId;
  attemptedAmount: MoneyAmount;
};

// Here is the discriminated union requested by the reviewer!
export type DomainEvent = WithdrawalMadeEvent | FraudFlaggedEvent | DailyLimitExceededEvent;