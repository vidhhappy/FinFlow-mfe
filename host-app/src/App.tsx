import { lazy, Suspense, useState } from "react";
import { RemoteBoundary } from "./RemoteBoundary";
import "./App.css";

const Accounts = lazy(() => import("accounts/AccountsApp"));
const Transactions = lazy(() => import("transactions/TransactionsApp"));
const mockCustomer = {
  initials: "VP",
  firstName: "Vidhya",
  fullName: "Vidhya Prabha",
  lastLogin: "16 Sep, 09:30",
};

function RemoteLoading({ name }: { name: string }) {
  return <section className="remote-loading" aria-label={`Loading ${name}`}><span /><div><strong>Loading {name}</strong><p>Fetching remote module…</p></div></section>;
}

function App() {
  const [selectedAccountId, setSelectedAccountId] = useState("savings");
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main" aria-label="FinFlow home"><span>F</span> FinFlow</a>
        <nav aria-label="Primary navigation"><a className="active" href="#overview">Overview</a><a href="#accounts">Accounts</a><a href="#transactions">Transactions</a><a href="#support">Support</a></nav>
        <div className="profile"><span className="profile__avatar">{mockCustomer.initials}</span><span><strong>{mockCustomer.fullName}</strong><small>Last login: {mockCustomer.lastLogin}</small></span></div>
      </header>
      <main id="main">
        <section className="welcome" id="overview">
          <div><span className="eyebrow">PERSONAL BANKING</span><h1>Good afternoon, {mockCustomer.firstName}</h1><p>Here is an overview of your finances across FinFlow.</p></div>
        </section>
        <div id="accounts"><RemoteBoundary name="Accounts"><Suspense fallback={<RemoteLoading name="Accounts" />}><Accounts selectedAccountId={selectedAccountId} onAccountSelect={setSelectedAccountId} /></Suspense></RemoteBoundary></div>
        <div id="transactions"><RemoteBoundary name="Transactions"><Suspense fallback={<RemoteLoading name="Transactions" />}><Transactions accountId={selectedAccountId} /></Suspense></RemoteBoundary></div>
      </main>
      <footer><span>FinFlow personal banking</span><span>React · TypeScript · Vite Module Federation</span></footer>
    </div>
  );
}
export default App;
