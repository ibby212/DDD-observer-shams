# Project Review

## What Was Done Well 

### Branded Types
`AccountId` and `MoneyAmount` are correctly branded and used consistently throughout the codebase.  
This is a strong implementation because it prevents accidental misuse of primitive types and improves type safety across the domain.

### Smart Constructors
The smart constructors `createMoneyAmount` and `createAccountId` correctly validate inputs at creation time and throw meaningful errors when invalid values are provided.  
This ensures domain invariants are enforced as early as possible.

### Try/Catch Blocks
The `index.ts` file wraps "impossible" data tests inside `try/catch` blocks. Errors are handled gracefully instead of crashing the program, which demonstrates good defensive programming.

### Observer Pattern
The `subscribe/notify` pattern implemented inside the `Account` class works correctly.  
The observers (`fraudDetectionObserver` and `auditLogObserver`) are cleanly separated into their own file, which improves modularity and maintainability.

### Domain Choice
The FinTech bank account domain is a good match for the assignment.  
The `docs/domain.md` file provides a basic explanation of the domain and its intent.

---
## File/Folder Structure
This is the biggest gap.

The assignment explicitly requires the **DDD folder structure**, such as:  
domain/  
infrastructure/  
application/

# What Needs Improvement 

There is also no clear separation between **entities**, **events**, and **infrastructure concerns**.

---

## Events Are Not Discriminated Unions
The assignment requires a **DomainEvent discriminated union**, for example:

```ts
type DomainEvent =
  | WithdrawalMadeEvent
  | FraudFlaggedEvent
  | DailyLimitExceededEvent;
  ```
Currently:

There is only one event type

It is defined inside account.ts

It is not structured as a discriminated union

## Events should instead live in a dedicated file:

src/domain/events/events.ts

Observer Type Is Domain-Coupled

The Observer type is currently defined inside account.ts.

This tightly couples the observer interface to the Account entity.

Instead, it should live in the infrastructure layer:

src/infrastructure/observers/observer.ts

The observer should depend on the shared DomainEvent union rather than the Account class.

## Thin docs/domain.md

The docs/domain.md file currently describes the domain only briefly.