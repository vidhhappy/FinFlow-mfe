import { useMemo, useState } from "react";
import "./App.css";

type TransactionStatus = "Completed" | "Pending" | "Failed";
type Transaction = { id: string; accountId: string; merchant: string; category: string; date: string; amount: number; status: TransactionStatus; icon: string };
export type TransactionsAppProps = { accountId?: string };

const transactions: Transaction[] = [
  { id: "TX-1048", accountId: "savings", merchant: "Salary credit", category: "Income", date: "08 Sep 2026", amount: 5800, status: "Completed", icon: "↓" },
  { id: "TX-1047", accountId: "savings", merchant: "NTUC FairPrice", category: "Groceries", date: "07 Sep 2026", amount: -52.4, status: "Completed", icon: "N" },
  { id: "TX-1046", accountId: "current", merchant: "Grab Singapore", category: "Transport", date: "06 Sep 2026", amount: -18.5, status: "Pending", icon: "G" },
  { id: "TX-1045", accountId: "joint", merchant: "SP Services", category: "Utilities", date: "05 Sep 2026", amount: -146.2, status: "Completed", icon: "S" },
  { id: "TX-1044", accountId: "current", merchant: "Card payment", category: "Transfer", date: "04 Sep 2026", amount: -850, status: "Failed", icon: "!" },
];
const accountNames: Record<string, string> = { savings: "My Savings", current: "Multiplier Account", joint: "Family Account" };
const money = (value: number) => new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", signDisplay: "exceptZero" }).format(value);

function Transactions({ accountId = "savings" }: TransactionsAppProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | TransactionStatus>("All");
  const filtered = useMemo(() => transactions.filter((transaction) => transaction.accountId === accountId && (status === "All" || transaction.status === status) && transaction.merchant.toLowerCase().includes(query.trim().toLowerCase())), [accountId, query, status]);

  return (
    <section className="transactions-mfe" aria-labelledby="transactions-heading">
      <div className="transactions-mfe__heading">
        <div><h2 id="transactions-heading">Recent transactions</h2><p>Showing activity for <strong>{accountNames[accountId] ?? "selected account"}</strong></p></div>
      </div>
      <div className="transaction-toolbar">
        <label><span className="sr-only">Search transactions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" /></label>
        <label><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value as "All" | TransactionStatus)}><option>All</option><option>Completed</option><option>Pending</option><option>Failed</option></select></label>
      </div>
      <div className="transaction-list" aria-live="polite">
        {filtered.length === 0 ? <div className="transaction-empty"><strong>No matching transactions</strong><span>Try another account, status, or search term.</span></div> : filtered.map((transaction) => (
          <article className="transaction-row" key={transaction.id}>
            <span className="transaction-row__icon" aria-hidden="true">{transaction.icon}</span>
            <span className="transaction-row__merchant"><strong>{transaction.merchant}</strong><small>{transaction.category} · {transaction.id}</small></span>
            <span className="transaction-row__date">{transaction.date}</span>
            <span className={`status status--${transaction.status.toLowerCase()}`}>{transaction.status}</span>
            <strong className={transaction.amount >= 0 ? "transaction-row__credit" : "transaction-row__debit"}>{money(transaction.amount)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Transactions;
