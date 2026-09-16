declare module "accounts/AccountsApp" {
  import type { ComponentType } from "react";
  export type AccountsAppProps = { selectedAccountId?: string; onAccountSelect?: (accountId: string) => void };
  const AccountsApp: ComponentType<AccountsAppProps>;
  export default AccountsApp;
}
declare module "transactions/TransactionsApp" {
  import type { ComponentType } from "react";
  export type TransactionsAppProps = { accountId?: string };
  const TransactionsApp: ComponentType<TransactionsAppProps>;
  export default TransactionsApp;
}
