import { v4 as uuidv4 } from "uuid";
import { createAccountId, createMoneyAmount } from "./domain/account/factories.js";
import { Account } from "./domain/account/account.js";
import { fraudDetectionObserver, auditLogObserver } from "./infrastructure/observers/accountObservers.js";

console.log("--- Starting Bank Vault DDD Example ---");

const myAccount = new Account(createAccountId(uuidv4()), createMoneyAmount(10000));
myAccount.subscribe(fraudDetectionObserver);
myAccount.subscribe(auditLogObserver);

try {
  console.log("\nAttempting a normal withdrawal of $500...");
  myAccount.withdraw(createMoneyAmount(500));
  
  console.log("\nAttempting a massive withdrawal of $6,000...");
  myAccount.withdraw(createMoneyAmount(6000));
} catch (error) {
  if (error instanceof Error) console.error(`❌ Error: ${error.message}`);
}

try {
  console.log("\nAttempting to overdraw the account by $10,000...");
  myAccount.withdraw(createMoneyAmount(10000)); 
} catch (error) {
  if (error instanceof Error) console.error(`🛡️ Blocked: ${error.message}`);
}

try {
  console.log("\nAttempting a negative withdrawal (-$50)...");
  myAccount.withdraw(createMoneyAmount(-50));
} catch (error) {
  if (error instanceof Error) console.error(`🛡️ Blocked: ${error.message}`);
}