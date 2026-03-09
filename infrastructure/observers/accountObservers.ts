import type { DomainEvent } from "../../domain/events/events.js";

export function fraudDetectionObserver(event: DomainEvent) {
  // TypeScript now uses the discriminated union to safely check the event type!
  if (event.type === "WithdrawalMade" && event.amountWithdrawn > 5000) {
    console.log(`🚨 FRAUD ALERT: Massive withdrawal of $${event.amountWithdrawn} from Account ${event.accountId}!`);
  }
}

export function auditLogObserver(event: DomainEvent) {
  if (event.type === "WithdrawalMade") {
    console.log(`✅ AUDIT LOG: Account ${event.accountId} withdrew $${event.amountWithdrawn}. Remaining balance: $${event.remainingBalance}.`);
  }
}