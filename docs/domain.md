# FinTech: Bank Account Security

This is a highly secure, reactive system. The domain doesn't care how a security alert is delivered or how audit logs are stored; it only cares that a transaction has occurred and whether it triggers any security thresholds.

## The Entity: Account

The Business Rule: A bank account's balance must never drop below zero (no overdrafts allowed). If a withdrawal amount exceeds the available balance, throw an exception.

The State Change: Account.withdraw(amount)

## Observer Opportunities

- Fraud Detection Observer: If a withdrawal exceeds $5,000, trigger an SMS verification process and security alert.
- Audit Log Observer: For every successful withdrawal, record the transaction details into a read-only security database.