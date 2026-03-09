import type { AccountEvent } from "./domain/account";

export function fraudDetectionObserver(event: AccountEvent) {
  if (event.type === "WithdrawalMade" && event.amountWithdrawn > 5000) {
    console.log(`🚨 FRAUD ALERT: Massive withdrawal of $${event.amountWithdrawn} from Account ${event.accountId}!`);
  }
}

export function auditLogObserver(event: AccountEvent) {
  if (event.type === "WithdrawalMade") {
    console.log(`✅ AUDIT LOG: Account ${event.accountId} withdrew $${event.amountWithdrawn}. Remaining balance: $${event.remainingBalance}.`);
  }
}