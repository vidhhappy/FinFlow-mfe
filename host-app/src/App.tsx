import React, { Suspense } from "react";

// const Accounts =
//   React.lazy(() => import("accounts/AccountsApp"));

  import("accounts/AccountsApp")
  .then(console.log)
  .catch(console.error);

const Transactions =
  React.lazy(() => import("transactions/TransactionsApp"));

function App() {
  return (
    <>
      <h1>FinFlow Dashboard</h1>

      <Suspense fallback={<div>Loading...</div>}>
        {/* <Accounts /> */}
        <Transactions />
      </Suspense>
    </>
  );
}

export default App;