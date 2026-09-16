import "./App.css";

export type Account = { id: string; name: string; maskedNumber: string; balance: number; currency: "SGD"; change: number };
export type AccountsAppProps = { selectedAccountId?: string; onAccountSelect?: (accountId: string) => void };

const accounts: Account[] = [
  { id: "savings", name: "My Savings", maskedNumber: "•• 4821", balance: 12450, currency: "SGD", change: 680 },
  { id: "current", name: "Multiplier Account", maskedNumber: "•• 7314", balance: 4280.5, currency: "SGD", change: -125.4 },
  { id: "joint", name: "Family Account", maskedNumber: "•• 2098", balance: 8970.25, currency: "SGD", change: 350 },
];
const formatMoney = (value: number) => new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" }).format(value);

function Accounts({ selectedAccountId = "savings", onAccountSelect }: AccountsAppProps) {
  const total = accounts.reduce((sum, account) => sum + account.balance, 0);
  return (
    <section className="accounts-mfe" aria-labelledby="accounts-heading">
      <div className="accounts-mfe__heading">
        <div><h2 id="accounts-heading">Your accounts</h2><p>Select an account to view its recent activity.</p></div>
        <div className="accounts-mfe__total"><span>Total balance</span><strong>{formatMoney(total)}</strong></div>
      </div>
      <div className="accounts-mfe__grid">
        {accounts.map((account) => {
          const selected = account.id === selectedAccountId;
          return (
            <button className={`account-card${selected ? " account-card--selected" : ""}`} type="button" key={account.id} onClick={() => onAccountSelect?.(account.id)} aria-pressed={selected}>
              <span className="account-card__top"><span className="account-card__icon" aria-hidden="true">$</span><span className="account-card__number">{account.maskedNumber}</span></span>
              <span className="account-card__name">{account.name}</span><strong>{formatMoney(account.balance)}</strong>
              <span className={account.change >= 0 ? "account-card__gain" : "account-card__loss"}>{account.change >= 0 ? "+" : ""}{formatMoney(account.change)} this month</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
export default Accounts;
