# 🏦 DDD Observer Pattern - Bank Vault Domain

This project is a TypeScript implementation of Domain-Driven Design (DDD) principles combined with the Observer Pattern. It models a FinTech Bank Account security system, demonstrating how to decouple core business logic from external side effects (like notifications and logging).

## 🧠 Concepts Demonstrated

* **Domain-Driven Design (DDD):** Strict separation between the `domain` (business rules) and `infrastructure` (side effects/observers).
* **Branded Types:** Preventing primitive obsession by ensuring `MoneyAmount` and `AccountId` are strictly typed.
* **Smart Constructors / Factory Functions:** Validating inputs at creation time to make illegal states (like negative money) unrepresentable.
* **Discriminated Unions:** Using a strongly typed `DomainEvent` union to pass precise state changes to observers.
* **Observer Pattern:** Decoupling the `Account` entity from the external systems that react to its changes (Fraud Alerts and Audit Logs).

## 📂 Project Structure

Following a complex DDD architecture, the codebase is organized as follows:

```text
src/
├── domain/                  # Core business logic and rules
│   ├── account/             # Account Entity, Branded Types, and Smart Constructors
│   └── events/              # Domain Event discriminated unions
├── infrastructure/          # External side-effects and integrations
│   └── observers/           # Mock SMS fraud alerts and database audit logs
└── index.ts                 # Entry point: wiring and testing the application