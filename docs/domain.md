# FinTech: Bank Account Security

## Overview
This domain models a highly secure, reactive banking system. The primary goal is to protect user funds by enforcing strict business rules at the core domain level, while delegating side effects (like notifications and logging) to external observers.

## The Entity: Account
The core aggregate root is the `Account`. 
* **Business Rule:** An account's balance must never drop below zero. No overdrafts are permitted. If a withdrawal exceeds the balance, a domain exception is thrown.
* **Smart Constructors:** Inputs like `MoneyAmount` and `AccountId` are strictly validated at creation to prevent impossible states (e.g., negative money).

## Domain Events & Observers
When state changes, the domain emits a `DomainEvent` (a discriminated union). 
* **WithdrawalMadeEvent:** Triggers when money is successfully removed.
* **FraudDetectionObserver:** Listens for massive withdrawals (>$5,000) and triggers security alerts.
* **AuditLogObserver:** Creates a read-only record of every successful transaction.